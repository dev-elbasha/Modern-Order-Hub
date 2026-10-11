import { Route, Switch } from "wouter";
import { NotFound } from "../components/storefront/Shared";
import { SiteShell } from "../components/storefront/SiteShell";
import HomePage from "../pages/HomePage";
import { FavoritesPage, SearchPage, ShopPage } from "../pages/CatalogPages";
import { CartPage, CheckoutPage, OrderConfirmationPage, ProductPage } from "../pages/CommercePages";
import {
  AboutPage,
  ContactPage,
  DeliveryPage,
  FaqPage,
  JournalPage,
  PrivacyPage,
  StoryPage,
  TermsPage,
} from "../pages/InformationalPages";
import { useStorefront } from "../state/StorefrontContext";

function NotFoundRoute() {
  const { t } = useStorefront();
  return <NotFound t={t} />;
}

export default function StorefrontRoutes() {
  return (
    <SiteShell>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/shop" component={() => <ShopPage />} />
        <Route path="/shop/:category">
          {(params) => <ShopPage categorySlug={params.category} />}
        </Route>
        <Route path="/product/:slug">
          {(params) => <ProductPage slug={params.slug} />}
        </Route>
        <Route path="/search" component={SearchPage} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/story" component={StoryPage} />
        <Route path="/journal" component={() => <JournalPage />} />
        <Route path="/journal/:slug">
          {(params) => <JournalPage slug={params.slug} />}
        </Route>
        <Route path="/contact" component={ContactPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/delivery" component={DeliveryPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/order-confirmation" component={OrderConfirmationPage} />
        <Route component={NotFoundRoute} />
      </Switch>
    </SiteShell>
  );
}
