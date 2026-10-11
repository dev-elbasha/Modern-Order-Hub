import {
  createContext,
  useCallback,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { flushSync } from "react-dom";
import {
  readStore,
  type CartLine,
  type Locale,
  type Product,
} from "../data/catalog";
import { words } from "../data/translations";

type StorefrontContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  rtl: boolean;
  t: (typeof words)[Locale];
  favorites: string[];
  cart: CartLine[];
  query: string;
  setQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  theme: "light" | "dark";
  toggleTheme: (origin?: { x: number; y: number }) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  add: (id: string, quantity?: number) => void;
  changeQty: (id: string, amount: number, saved?: boolean) => void;
  remove: (id: string, saved?: boolean) => void;
  toggleFavorite: (id: string) => void;
  toggleSaved: (id: string, saved?: boolean) => void;
  totalItems: number;
  filteredProducts: (
    items: Product[],
    query?: string,
    category?: string,
  ) => Product[];
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() =>
    readStore("countrys-locale", "en"),
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    readStore("countrys-favorites", []),
  );
  const [cart, setCart] = useState<CartLine[]>(() =>
    readStore("countrys-cart", []),
  );
  const [query, setQuery] = useState(() => readStore("countrys-query", ""));
  const [filter, setFilter] = useState(() => readStore("countrys-filter", "all"));
  const [sort, setSort] = useState(() => readStore("countrys-sort", "name"));
  const [theme, setTheme] = useState<"light" | "dark">(() => readStore("countrys-theme", "light"));
  const [menuOpen, setMenuOpen] = useState(false);

  const rtl = locale === "ar";
  const t = words[locale];

  useEffect(() => {
    try { localStorage.setItem("countrys-locale", JSON.stringify(locale)); } catch { /* storage can be unavailable */ }
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", rtl);
  }, [locale, rtl]);

  useEffect(() => {
    try { localStorage.setItem("countrys-favorites", JSON.stringify(favorites)); } catch { /* storage can be unavailable */ }
  }, [favorites]);

  useEffect(() => {
    try { localStorage.setItem("countrys-cart", JSON.stringify(cart)); } catch { /* storage can be unavailable */ }
  }, [cart]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem("countrys-theme", JSON.stringify(theme)); } catch { /* storage can be unavailable */ }
  }, [theme]);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;
      const transitionDocument = document as ViewTransitionDocument;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (
        !origin ||
        reducedMotion ||
        typeof transitionDocument.startViewTransition !== "function"
      ) {
        setTheme(nextTheme);
        return;
      }

      root.classList.add("theme-transitioning");

      try {
        const transition = transitionDocument.startViewTransition(() => {
          flushSync(() => setTheme(nextTheme));
        });

        void transition.ready
          .then(() => {
            const { x, y } = origin;
            const radius = Math.hypot(
              Math.max(x, window.innerWidth - x),
              Math.max(y, window.innerHeight - y),
            );
            const duration = Math.round(
              Math.min(420, Math.max(260, radius * 0.28)),
            );
            const animationOptions: KeyframeAnimationOptions & {
              pseudoElement: string;
            } = {
              duration,
              easing: "cubic-bezier(0.32, 0.72, 0, 1)",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            };

            root.animate(
              [
                { clipPath: `circle(0px at ${x}px ${y}px)` },
                { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
              ],
              animationOptions,
            );
          })
          .catch(() => {
            root.classList.remove("theme-transitioning");
            setTheme(nextTheme);
          });

        void transition.finished
          .catch(() => undefined)
          .finally(() => root.classList.remove("theme-transitioning"));
      } catch {
        root.classList.remove("theme-transitioning");
        setTheme(nextTheme);
      }
    },
    [theme],
  );

  useEffect(() => {
    try {
      localStorage.setItem("countrys-query", JSON.stringify(query));
      localStorage.setItem("countrys-filter", JSON.stringify(filter));
      localStorage.setItem("countrys-sort", JSON.stringify(sort));
    } catch { /* storage can be unavailable */ }
  }, [query, filter, sort]);

  useEffect(() => {
    document.title = "COUNTRY'S Egypt | Storefront";
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute(
      "content",
      "Explore COUNTRY'S Egyptian food and pantry collection. Product details, prices and availability are being confirmed.",
    );

    let openGraphTitle = document.querySelector('meta[property="og:title"]');
    if (!openGraphTitle) {
      openGraphTitle = document.createElement("meta");
      openGraphTitle.setAttribute("property", "og:title");
      document.head.appendChild(openGraphTitle);
    }
    openGraphTitle.setAttribute("content", "COUNTRY'S Egypt | Storefront");
  }, []);

  const add = (id: string, quantity = 1) => {
    setCart((previous) => {
      const existing = previous.find((line) => line.id === id && !line.saved);
      return existing
        ? previous.map((line) =>
            line.id === id && !line.saved
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          )
        : [...previous, { id, quantity }];
    });
  };

  const changeQty = (id: string, amount: number, saved?: boolean) => {
    setCart((previous) => {
      const index = previous.findIndex((line) => line.id === id && (saved === undefined || Boolean(line.saved) === saved));
      return index === -1 ? previous : previous.map((line, lineIndex) =>
        lineIndex === index ? { ...line, quantity: Math.max(1, line.quantity + amount) } : line,
      );
    });
  };

  const remove = (id: string, saved?: boolean) => {
    setCart((previous) => {
      const index = previous.findIndex((line) => line.id === id && (saved === undefined || Boolean(line.saved) === saved));
      return index === -1 ? previous : previous.filter((_, lineIndex) => lineIndex !== index);
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((favoriteId) => favoriteId !== id)
        : [...previous, id],
    );
  };

  const toggleSaved = (id: string, saved?: boolean) => {
    setCart((previous) => {
      const index = previous.findIndex((line) => line.id === id && (saved === undefined || Boolean(line.saved) === saved));
      return index === -1 ? previous : previous.map((line, lineIndex) =>
        lineIndex === index ? { ...line, saved: !line.saved } : line,
      );
    });
  };

  const totalItems = cart
    .filter((line) => !line.saved)
    .reduce((total, line) => total + line.quantity, 0);

  const filteredProducts = (
    items: Product[],
    search = query,
    category = filter,
  ) =>
    items
      .filter(
        (product) =>
          (category === "all" || product.category === category) &&
          product.name.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((first, second) =>
        sort === "category"
          ? first.category.localeCompare(second.category) ||
            first.name.localeCompare(second.name)
          : first.name.localeCompare(second.name),
      );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      rtl,
      t,
      favorites,
      cart,
      query,
      setQuery,
      filter,
      setFilter,
      sort,
      setSort,
      theme,
      toggleTheme,
      menuOpen,
      setMenuOpen,
      add,
      changeQty,
      remove,
      toggleFavorite,
      toggleSaved,
      totalItems,
      filteredProducts,
    }),
    [
      locale,
      rtl,
      t,
      favorites,
      cart,
      query,
      filter,
      sort,
      theme,
      menuOpen,
      totalItems,
      toggleTheme,
    ],
  );

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error("useStorefront must be used within StorefrontProvider");
  }
  return context;
}
