import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { categoryLabels, categoryNames, products } from "../data/catalog";
import { useStorefront } from "../state/StorefrontContext";
import {
  ProductCard,
  SectionHeading,
} from "../components/storefront/Shared";

export default function HomePage() {
  const { t, rtl, favorites, toggleFavorite, add } = useStorefront();
  const cards = (items: typeof products) =>
    items.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        favorite={favorites.includes(product.id)}
        onFavorite={() => toggleFavorite(product.id)}
        onAdd={() => add(product.id)}
        t={t}
        rtl={rtl}
      />
    ));

  return (
    <main>
      <section className="hero">
        <div className="hero-copy reveal">
          <span className="eyebrow">COUNTRY’S · EGYPT</span>
          <h1>
            {t.heroTitle.split("\n").map((line, index) => (
              <span key={line}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </h1>
          <p>{t.heroCopy}</p>
          <div className="hero-actions">
            <Link className="btn" href="/shop">
              {t.shopNow}
              <ArrowRight size={16} />
            </Link>
            <Link className="text-link" href="/story">
              {t.ourStory}
            </Link>
          </div>
        </div>
        <img className="hero-image" src="/images/cairo-breakfast.jpg" alt={rtl ? "مائدة إفطار في القاهرة" : "Breakfast table in Cairo"} />
      </section>

      <section className="section wrap">
        <SectionHeading
          eyebrow={t.featured}
          title={t.discover}
          copy={t.featuredCopy}
          link={t.seeAll}
          href="/shop"
        />
        <div className="notice">{t.catalogNotice}</div>
        <div className="product-grid" style={{ marginTop: 22 }}>
          {cards(products.filter((product) => product.featured))}
        </div>
      </section>

      <section className="section category-section">
        <div className="wrap">
          <SectionHeading
            eyebrow={t.category}
            title={t.browse}
            copy={t.categoryCopy}
          />
          <div className="category-grid">
            {categoryNames.map((category, index) => (
              <Link
                className="category-tile"
                href={`/shop/${encodeURIComponent(
                  category.toLowerCase().replaceAll(" ", "-"),
                )}`}
                key={category}
                data-testid={`link-category-${index}`}
              >
                <div>
                  <span className="section-kicker">
                    {String(index + 1).padStart(2, "0")} / COUNTRY’S
                  </span>
                  <h3>{rtl ? categoryLabels[category] : category}</h3>
                  <p>
                    {
                      products.filter(
                        (product) => product.category === category,
                      ).length
                    }{" "}
                    {t.count}
                  </p>
                </div>
                <ArrowUpRight className="tile-arrow" size={21} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story-band">
        <img className="story-photo" src="/images/egyptian-table.jpg" alt={rtl ? "مائدة طعام مصرية" : "A warmly set Egyptian table"} />
        <div className="story-copy">
          <span className="eyebrow" style={{ color: "#d8a68e" }}>
            {t.story}
          </span>
          <h2>{t.storyTitle}</h2>
          <p>{t.storyCopy}</p>
          <Link className="text-link" href="/story">
            {t.readStory}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="editorial-strip">
        <span className="section-kicker">A NOTE ON THIS STOREFRONT</span>
        <h2>{t.catalogNotice}</h2>
        <p>{t.safeOrder}</p>
        <Link className="btn" href="/shop">
          {t.browse}
          <ArrowRight size={15} />
        </Link>
      </section>
    </main>
  );
}
