import { useState } from "react";
import { ArrowRight, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { categoryLabels, products } from "../data/catalog";
import { useStorefront } from "../state/StorefrontContext";
import {
  EmptyState,
  NotFound,
  PageIntro,
  ProductCard,
} from "../components/storefront/Shared";

export function CartPage() {
  const { t, cart, changeQty, remove, toggleSaved } = useStorefront();
  return (
    <main className="wrap">
      <PageIntro kicker={t.cart} title={t.cartTitle} copy={t.catalogNotice} />
      {cart.length ? (
        <div
          className="cart-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr .7fr",
            gap: 32,
            marginBottom: 80,
          }}
        >
          <div>
            {cart.map((line) => {
              const product = products.find((item) => item.id === line.id);
              if (!product) return null;

              return (
                <article
                  className="cart-row"
                  key={`${product.id}-${Boolean(line.saved)}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    gap: 18,
                    padding: "18px 0",
                    borderBottom: "1px solid #d7d2c4",
                    alignItems: "center",
                  }}
                >
                  <img className="cart-image" src={`/images/${product.slug}.jpg`} alt={product.name} />
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="product-name"
                    >
                      {product.name}
                    </Link>
                    <span className="unconfirmed">{t.unconfirmed}</span>
                    <div className="quantity">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() =>
                          line.quantity <= 1
                            ? remove(product.id, Boolean(line.saved))
                            : changeQty(product.id, -1, Boolean(line.saved))
                        }
                      >
                        <Minus size={15} />
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => changeQty(product.id, 1, Boolean(line.saved))}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <div style={{ display: "flex", gap: 14 }}>
                      <button
                        className="text-link"
                        onClick={() => toggleSaved(product.id, Boolean(line.saved))}
                      >
                        {line.saved ? t.moveBack : t.saveLater}
                      </button>
                      <button
                        className="text-link"
                        onClick={() => remove(product.id, Boolean(line.saved))}
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <aside
            className="info-panel"
            style={{ alignSelf: "start", margin: 0 }}
          >
            <h2>{t.subtotal}</h2>
            <p>{t.notProvided}</p>
            <div className="notice">{t.safeOrder}</div>
            <Link
              className="btn"
              href="/checkout"
              style={{ display: "flex", marginTop: 18 }}
            >
              {t.checkout}
              <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      ) : (
        <EmptyState
          title={t.emptyTitle}
          copy={t.cartEmpty}
          action={t.continueShop}
          href="/shop"
        />
      )}
    </main>
  );
}

export function ProductPage({ slug }: { slug?: string }) {
  const { t, rtl, favorites, toggleFavorite, add } = useStorefront();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <NotFound t={t} />;
  }

  return (
    <main className="wrap">
      <div className="product-layout">
        <img className="product-detail-art" src={`/images/${product.slug}.jpg`} alt={product.name} />
        <section className="product-detail">
          <span className="eyebrow">
            {t.product} ·{" "}
            {rtl ? categoryLabels[product.category] : product.category}
          </span>
          <h1>{product.name}</h1>
          <span className="unconfirmed">{t.unconfirmed}</span>
          <p>{t.infoUnavailable}</p>
          <div className="availability-note">
            <strong>
              {t.availability}: {t.unknown}
            </strong>
            <br />
            {t.delivery}
          </div>
          <div className="quantity">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              <Minus size={15} />
            </button>
            <span>{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity((current) => current + 1)}
            >
              <Plus size={15} />
            </button>
          </div>
          <div className="detail-actions">
            <button
              className="btn"
              onClick={() => add(product.id, quantity)}
              data-testid="button-add-product"
            >
              {t.add}
              <ShoppingBag size={16} />
            </button>
            <button
              className="btn btn-outline"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart
                size={16}
                fill={favorites.includes(product.id) ? "currentColor" : "none"}
              />
              {favorites.includes(product.id) ? t.saved : t.favorites}
            </button>
          </div>
          <div className="prose-card">
            <strong>{t.details}</strong>
            <p>{t.infoUnavailable}</p>
          </div>
        </section>
      </div>
      <section className="mobile-dock">
        <div>
          <small>{t.availability}</small>
          <strong>{t.unknown}</strong>
        </div>
        <button className="btn" onClick={() => add(product.id)}>
          {t.add}
        </button>
      </section>
      <div className="section-heading">
        <h2>{t.discover}</h2>
      </div>
      <div className="product-grid" style={{ marginBottom: 75 }}>
        {products
          .filter(
            (item) =>
              item.category === product.category && item.id !== product.id,
          )
          .slice(0, 4)
          .map((related) => (
            <ProductCard
              key={related.id}
              product={related}
              favorite={favorites.includes(related.id)}
              onFavorite={() => toggleFavorite(related.id)}
              onAdd={() => add(related.id)}
              t={t}
              rtl={rtl}
            />
          ))}
      </div>
    </main>
  );
}

export function CheckoutPage() {
  const { t, rtl, cart } = useStorefront();
  const [draft, setDraft] = useState(() => {
    try { return localStorage.getItem("countrys-inquiry-draft") || ""; } catch { return ""; }
  });
  const [notice, setNotice] = useState("");
  const createDraft = async () => {
    const lines = cart.filter((line) => !line.saved).map((line) => {
      const product = products.find((item) => item.id === line.id);
      return product ? `${product.name} — quantity ${line.quantity}` : "";
    }).filter(Boolean);
    const value = [
      "COUNTRY'S — INQUIRY DRAFT (NOT AN ORDER)",
      "",
      ...lines,
      "",
      "Please confirm current prices and availability directly with the store.",
      "This draft has not been sent. No order has been placed.",
    ].join("\n");
    setDraft(value);
    try { localStorage.setItem("countrys-inquiry-draft", value); } catch { /* local persistence may be unavailable */ }
    try {
      await navigator.clipboard.writeText(value);
      setNotice(rtl ? "تم إنشاء المسودة ونسخها. لم يتم إرسال أي طلب." : "Draft created and copied. Nothing has been sent.");
    } catch {
      setNotice(rtl ? "تم إنشاء المسودة على هذا الجهاز. انسخها يدوياً." : "Draft saved on this device. Copy it manually below.");
    }
  };
  return (
    <main className="wrap">
      <PageIntro
        kicker={t.checkout}
        title={rtl ? "مسودة استفسار فقط" : "An inquiry, not an order"}
        copy={rtl ? "أنشئ نصاً يمكنك نسخه للاستفسار عن السلة. لن يتم إرسال أي شيء إلى المتجر." : "Create a message you can copy to ask about your basket. Nothing is sent to the store."}
      />
      <div className="info-panel">
        <h2>{rtl ? "الأسعار والتوفر يحتاجان إلى تأكيد" : "Prices and availability need confirmation"}</h2>
        <p>{rtl ? "لا يوجد اتصال مباشر بالطلب أو الدفع. هذه الواجهة لا ترسل الطلبات ولا تؤكد استلامها." : "There is no live ordering or payment connection. This storefront does not send orders or claim they were received."}</p>
        {cart.filter((line) => !line.saved).length > 0 && (
          <ul className="info-list">
            {cart.filter((line) => !line.saved).map((line) => {
              const product = products.find((item) => item.id === line.id);
              return product ? <li key={line.id}><strong>{product.name}</strong>{rtl ? "الكمية" : "Quantity"}: {line.quantity}</li> : null;
            })}
          </ul>
        )}
        <button className="btn" type="button" onClick={createDraft} disabled={!cart.some((line) => !line.saved)}>
          {rtl ? "إنشاء ونسخ مسودة الاستفسار" : "Create & copy inquiry draft"}
        </button>
        {notice && <p aria-live="polite" className="notice" style={{ marginTop: 14 }}>{notice}</p>}
        {draft && <div className="draft-preview"><strong>{rtl ? "مسودة محفوظة على هذا الجهاز" : "Draft saved on this device"}</strong><pre>{draft}</pre></div>}
        <Link href="/cart" className="btn">
          {t.cartTitle}
          <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}

export function OrderConfirmationPage() {
  const { t } = useStorefront();
  return (
    <main className="wrap">
      <PageIntro kicker={t.checkout} title={t.confirmationTitle} copy={t.confirmationCopy} />
      <div className="info-panel">
        <h2>{t.confirmationTitle}</h2>
        <p>{t.confirmationCopy}</p>
        <p>{t.safeOrder}</p>
        <Link className="btn" href="/shop">
          {t.continueShop}
          <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}
