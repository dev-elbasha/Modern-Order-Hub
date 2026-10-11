import { ArrowLeft, ArrowRight, Heart, ImagePlus } from "lucide-react";
import { Link } from "wouter";
import { categoryLabels, type Product } from "../../data/catalog";
import type { Translation } from "../../data/translations";

export function UploadSlot({
  label,
  help,
  className = "",
}: {
  label: string;
  help: string;
  className?: string;
}) {
  return (
    <div
      className={`upload-slot ${className}`}
      role="img"
      aria-label={`${label}. ${help}`}
      data-testid="image-upload-slot"
    >
      <span className="slot-icon">
        <ImagePlus size={20} />
      </span>
      <span className="slot-label">{label}</span>
      {help && <span className="slot-help">{help}</span>}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  link,
  href,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-kicker">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div>
        {copy && <p>{copy}</p>}
        {link && href && (
          <Link
            className="text-link"
            href={href}
            style={{ display: "inline-block", marginTop: 12 }}
          >
            {link}
            <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}

export function ProductCard({
  product,
  favorite,
  onFavorite,
  onAdd,
  t,
  rtl,
}: {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
  onAdd: () => void;
  t: Translation;
  rtl: boolean;
}) {
  return (
    <article
      className="product-card"
      data-testid={`card-product-${product.id}`}
    >
      <div className="product-image-link">
        <Link href={`/product/${product.slug}`}>
          <img
            className="product-art"
            src={`/images/${product.slug}.jpg`}
            alt={product.name}
            loading="lazy"
            data-testid={`image-product-${product.id}`}
          />
        </Link>
        <button
          className={`icon-btn heart-button ${favorite ? "is-favorite" : ""}`}
          aria-label={`${favorite ? t.saved : t.favorites}: ${product.name}`}
          onClick={onFavorite}
          data-testid={`button-favorite-${product.id}`}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">
          {rtl ? categoryLabels[product.category] : product.category}
        </span>
        <Link
          className="product-name"
          href={`/product/${product.slug}`}
          data-testid={`link-product-${product.id}`}
        >
          {product.name}
        </Link>
        <div className="product-note">{t.unknown}</div>
        <span className="unconfirmed">{t.unconfirmed}</span>
        <div className="card-bottom">
          <Link href={`/product/${product.slug}`} className="text-link">
            {t.details}
          </Link>
          <button className="card-action" data-testid={`button-add-${product.id}`} onClick={onAdd}>
            {t.add}
          </button>
        </div>
      </div>
    </article>
  );
}

export function PageIntro({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="page-intro">
      <span className="section-kicker">{kicker}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
    </div>
  );
}

export function EmptyState({
  title,
  copy,
  action,
  href,
}: {
  title: string;
  copy: string;
  action: string;
  href: string;
}) {
  return (
    <div className="empty-state">
      <span className="slot-icon" style={{ margin: "auto" }}>
        <ImagePlus size={20} />
      </span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <Link className="btn" href={href}>
        {action}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export function Footer({ t }: { t: Translation }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="wordmark" style={{ color: "#f4eddd" }}>
              COUNTRY&apos;S
            </Link>
            <p>{t.aboutCopy}</p>
          </div>
          <div>
            <h3>{t.browse}</h3>
            <div className="footer-links">
              <Link href="/shop">{t.shop}</Link>
              <Link href="/favorites">{t.favorites}</Link>
              <Link href="/cart">{t.cart}</Link>
            </div>
          </div>
          <div>
            <h3>{t.story}</h3>
            <div className="footer-links">
              <Link href="/about">{t.about}</Link>
              <Link href="/story">{t.story}</Link>
              <Link href="/journal">{t.journal}</Link>
              <Link href="/contact">{t.contact}</Link>
            </div>
          </div>
          <div>
            <h3>{t.help}</h3>
            <div className="footer-links">
              <Link href="/faq">{t.faq}</Link>
              <Link href="/delivery">{t.deliveryLink}</Link>
              <Link href="/privacy">{t.privacy}</Link>
              <Link href="/terms">{t.terms}</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© COUNTRY&apos;S · {t.catalogNotice}</span>
          <span>{t.safeOrder}</span>
        </div>
      </div>
    </footer>
  );
}

export function NotFound({ t }: { t: Translation }) {
  return (
    <main className="wrap">
      <PageIntro kicker="404" title={t.emptyTitle} copy={t.emptyCopy} />
      <Link className="btn" href="/">
        {t.continue}
        <ArrowLeft size={15} />
      </Link>
      <div style={{ height: 100 }} />
    </main>
  );
}
