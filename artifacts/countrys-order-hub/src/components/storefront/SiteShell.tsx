import type { ReactNode } from "react";
import { useEffect } from "react";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Footer } from "./Shared";
import { useStorefront } from "../../state/StorefrontContext";

function NavigationLinks() {
  const { t } = useStorefront();
  return (
    <>
      <Link href="/shop">{t.shop}</Link>
      <Link href="/about">{t.about}</Link>
      <Link href="/story">{t.story}</Link>
      <Link href="/journal">{t.journal}</Link>
      <Link href="/contact">{t.contact}</Link>
    </>
  );
}

export function SiteHeader() {
  const {
    t,
    rtl,
    locale,
    setLocale,
    theme,
    toggleTheme,
    favorites,
    totalItems,
    menuOpen,
    setMenuOpen,
  } = useStorefront();

  return (
    <>
      <div className="announcement">
        {rtl
          ? "علامة مصرية للأغذية الطبيعية · تفاصيل المتجر قيد التأكيد"
          : "Egyptian natural-food brand · storefront details being confirmed"}
      </div>
      <header className="header">
        <div className="wrap nav-row">
          <button
            className="icon-btn mobile-menu"
            aria-label={menuOpen ? t.close : t.mobileMenu}
            data-testid="button-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="wordmark" data-testid="link-wordmark">
            COUNTRY&apos;S
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>
          <div className="header-actions">
            <Link
              href="/search"
              className="icon-link"
              aria-label={t.search}
              data-testid="link-search"
            >
              <Search size={19} />
            </Link>
            <Link
              href="/favorites"
              className="icon-link"
              aria-label={t.favorites}
              data-testid="link-favorites"
            >
              <Heart size={19} />
              {favorites.length > 0 && (
                <span className="count">{favorites.length}</span>
              )}
            </Link>
            <Link
              href="/cart"
              className="icon-link"
              aria-label={t.cart}
              data-testid="link-cart"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && <span className="count">{totalItems}</span>}
            </Link>
            <button
              className="icon-btn theme-toggle"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const origin =
                  event.detail === 0
                    ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
                    : { x: event.clientX, y: event.clientY };
                toggleTheme(origin);
              }}
              aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
              title={theme === "dark" ? "Light theme" : "Dark theme"}
              data-testid="button-theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="icon-btn"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              aria-label={t.language}
              data-testid="button-language"
            >
              {rtl ? "EN" : "ع"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav wrap" aria-label="Mobile navigation">
            <NavigationLinks />
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { rtl, t, locale } = useStorefront();
  const [location] = useLocation();

  useEffect(() => {
    const routeTitles: Record<string, { en: string; ar: string; description: string }> = {
      "/": { en: "COUNTRY’S Egypt | Storefront", ar: "COUNTRY’S مصر | المتجر", description: "Explore the COUNTRY’S Egypt natural-food storefront. Product details, prices and availability are not confirmed." },
      "/shop": { en: "Shop the collection | COUNTRY’S Egypt", ar: "تصفّح المجموعة | COUNTRY’S مصر", description: "Browse the COUNTRY’S Egypt product collection. Product details, prices and availability are not confirmed." },
      "/search": { en: "Search products | COUNTRY’S Egypt", ar: "البحث عن المنتجات | COUNTRY’S مصر", description: "Search the COUNTRY’S Egypt product collection." },
      "/favorites": { en: "Saved products | COUNTRY’S Egypt", ar: "المنتجات المحفوظة | COUNTRY’S مصر", description: "Your locally saved COUNTRY’S Egypt product listings." },
      "/cart": { en: "Basket | COUNTRY’S Egypt", ar: "السلة | COUNTRY’S مصر", description: "Review your locally saved COUNTRY’S Egypt basket. This storefront does not place orders." },
      "/checkout": { en: "Inquiry draft | COUNTRY’S Egypt", ar: "مسودة استفسار | COUNTRY’S مصر", description: "Create a local inquiry draft. No order or payment is submitted." },
      "/order-confirmation": { en: "No order placed | COUNTRY’S Egypt", ar: "لم يتم إنشاء طلب | COUNTRY’S مصر", description: "This storefront does not submit orders or payments." },
      "/about": { en: "About | COUNTRY’S Egypt", ar: "عنّا | COUNTRY’S مصر", description: "About the COUNTRY’S Egypt natural-food brand. Further business details await confirmation." },
      "/story": { en: "Our story | COUNTRY’S Egypt", ar: "قصتنا | COUNTRY’S مصر", description: "Discover the COUNTRY’S Egypt brand story." },
      "/journal": { en: "Journal | COUNTRY’S Egypt", ar: "المجلة | COUNTRY’S مصر", description: "Notes and stories from COUNTRY’S Egypt." },
      "/contact": { en: "Contact | COUNTRY’S Egypt", ar: "تواصل | COUNTRY’S مصر", description: "Contact information is not confirmed on this storefront." },
      "/faq": { en: "Frequently asked questions | COUNTRY’S Egypt", ar: "الأسئلة الشائعة | COUNTRY’S مصر", description: "Answers about this COUNTRY’S Egypt storefront and its unconfirmed catalog." },
      "/delivery": { en: "Delivery information | COUNTRY’S Egypt", ar: "معلومات التوصيل | COUNTRY’S مصر", description: "Delivery details have not been verified." },
      "/privacy": { en: "Privacy | COUNTRY’S Egypt", ar: "الخصوصية | COUNTRY’S مصر", description: "Privacy information for the COUNTRY’S Egypt storefront." },
      "/terms": { en: "Terms | COUNTRY’S Egypt", ar: "الشروط | COUNTRY’S مصر", description: "Terms information for the COUNTRY’S Egypt storefront." },
    };
    const productMatch = location.match(/^\/product\/([^/]+)/);
    const journalMatch = location.match(/^\/journal\/([^/]+)/);
    const route = routeTitles[location];
    const title = productMatch
      ? `${decodeURIComponent(productMatch[1]).replaceAll("-", " ")} | COUNTRY’S Egypt`
      : journalMatch
        ? `Journal | COUNTRY’S Egypt`
        : route?.[locale] ?? (location.startsWith("/shop/") ? `${t.shop} | COUNTRY’S Egypt` : "COUNTRY’S Egypt");
    document.title = title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", route?.description ?? (productMatch
      ? "Product listing for the COUNTRY’S Egypt collection. Product details, prices and availability are not confirmed."
      : "COUNTRY’S Egypt natural-food storefront. Business and catalog details await confirmation."));
  }, [location, locale, t.shop]);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <SiteHeader />
      <div className="route-transition" key={location}>
        {children}
      </div>
      <Footer t={t} />
    </div>
  );
}
