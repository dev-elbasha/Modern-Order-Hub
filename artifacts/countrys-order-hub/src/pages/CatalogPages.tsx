import { Search, SlidersHorizontal } from "lucide-react";
import { categoryLabels, categoryNames, products } from "../data/catalog";
import { useStorefront } from "../state/StorefrontContext";
import {
  EmptyState,
  PageIntro,
  ProductCard,
} from "../components/storefront/Shared";

function useProductCards() {
  const { favorites, toggleFavorite, add, t, rtl } = useStorefront();
  return (items: typeof products) =>
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
}

export function ShopPage({ categorySlug }: { categorySlug?: string }) {
  const {
    t,
    rtl,
    query,
    setQuery,
    filter,
    setFilter,
    sort,
    setSort,
    filteredProducts,
  } = useStorefront();
  const cards = useProductCards();
  const category = categorySlug
    ? categoryNames.find(
        (name) =>
          name.toLowerCase().replaceAll(" ", "-") ===
          decodeURIComponent(categorySlug),
      )
    : undefined;
  const results = filteredProducts(products, "", category || "all");

  return (
    <main className="wrap">
      <PageIntro
        kicker={t.shop}
        title={
          category ? (rtl ? categoryLabels[category] : category) : t.browse
        }
        copy={t.catalogNotice}
      />
      <div className="shop-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            aria-label={t.search}
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            data-testid="input-shop-search"
          />
        </div>
        <div className="shop-toolbar-controls">
          <select
            className="select"
            aria-label={t.filter}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            data-testid="select-category"
          >
            <option value="all">{t.all}</option>
            {categoryNames.map((name) => (
              <option key={name} value={name}>
                {rtl ? categoryLabels[name] : name}
              </option>
            ))}
          </select>
          <select
            className="select"
            aria-label={t.sort}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            data-testid="select-sort"
          >
            <option value="name">{t.sortName}</option>
            <option value="category">{t.sortCategory}</option>
          </select>
        </div>
      </div>
      <div className="filters">
        <SlidersHorizontal size={17} aria-hidden="true" />
        {[
          ["all", t.all] as [string, string],
          ...categoryNames.map(
            (name) =>
              [name, rtl ? categoryLabels[name] : name] as [string, string],
          ),
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`filter-chip ${filter === key ? "active" : ""}`}
            data-testid={`filter-${key}`}
          >
            {label}
          </button>
        ))}
      </div>
      <p
        className="product-note"
        aria-live="polite"
        data-testid="text-product-count"
      >
        {results.length} {t.count}
      </p>
      <div className="product-grid" style={{ marginBottom: 80 }}>
        {results.length ? (
          cards(results)
        ) : (
          <EmptyState
            title={t.noResults}
            copy={t.emptyCopy}
            action={t.continue}
            href="/shop"
          />
        )}
      </div>
    </main>
  );
}

export function SearchPage() {
  const { t, query, setQuery, filteredProducts } = useStorefront();
  const cards = useProductCards();
  return (
    <main className="wrap">
      <PageIntro kicker={t.search} title={t.discover} copy={t.catalogNotice} />
      <div className="shop-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            autoFocus
            aria-label={t.search}
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            data-testid="input-search"
          />
        </div>
      </div>
      <div className="product-grid" style={{ marginBottom: 80 }}>
        {filteredProducts(products).length ? cards(filteredProducts(products)) : (
          <EmptyState title={t.noResults} copy={t.emptyCopy} action={t.continue} href="/shop" />
        )}
      </div>
    </main>
  );
}

export function FavoritesPage() {
  const { t, favorites } = useStorefront();
  const cards = useProductCards();
  return (
    <main className="wrap">
      <PageIntro kicker={t.favorites} title={t.saved} copy={t.catalogNotice} />
      {favorites.length ? (
        <div className="product-grid" style={{ marginBottom: 80 }}>
          {cards(products.filter((product) => favorites.includes(product.id)))}
        </div>
      ) : (
        <EmptyState
          title={t.emptyTitle}
          copy={t.savedEmpty}
          action={t.continueShop}
          href="/shop"
        />
      )}
    </main>
  );
}
