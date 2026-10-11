import type { ReactNode } from "react";
import { Link } from "wouter";
import { useStorefront } from "../state/StorefrontContext";
import {
  EmptyState,
  PageIntro,
} from "../components/storefront/Shared";

function InformationPage({
  title,
  content,
}: {
  title: string;
  content: ReactNode;
}) {
  const { t } = useStorefront();
  return (
    <main className="wrap">
      <PageIntro kicker="COUNTRY’S" title={title} copy={t.safePage} />
      <div className="info-panel">{content}</div>
    </main>
  );
}

export function AboutPage() {
  const { t } = useStorefront();
  return (
    <InformationPage
      title={t.about}
      content={
        <>
          <h2>{t.about}</h2>
          <p>{t.aboutCopy}</p>
          <p>{t.safePage}</p>
        </>
      }
    />
  );
}

export function StoryPage() {
  const { t } = useStorefront();
  return (
    <InformationPage
      title={t.story}
      content={
        <>
          <h2>{t.storyLead}</h2>
          <p>{t.storyCopy}</p>
          <img
            className="story-page-photo"
            src="/images/countrys-editorial-story.jpg"
            alt={t.story}
            loading="lazy"
          />
        </>
      }
    />
  );
}

export function ContactPage() {
  const { t } = useStorefront();
  return (
    <InformationPage
      title={t.contact}
      content={
        <>
          <h2>{t.contact}</h2>
          <p>{t.contactCopy}</p>
          <p>{t.safePage}</p>
        </>
      }
    />
  );
}

export function FaqPage() {
  const { t } = useStorefront();
  return (
    <InformationPage
      title={t.faq}
      content={
        <ul className="info-list">
          <li>
            <strong>{t.faqQuestion}</strong>
            {t.faqAnswer}
          </li>
          <li>
            <strong>{t.faqQuestion2}</strong>
            {t.faqAnswer2}
          </li>
          <li>
            <strong>{t.faqQuestion3}</strong>
            {t.faqAnswer3}
          </li>
        </ul>
      }
    />
  );
}

export function DeliveryPage() {
  const { t } = useStorefront();
  return (
    <InformationPage
      title={t.deliveryLink}
      content={
        <>
          <h2>{t.deliveryLink}</h2>
          <p>{t.delivery}</p>
        </>
      }
    />
  );
}

export function PrivacyPage() {
  const { t } = useStorefront();
  return (
    <InformationPage
      title={t.privacy}
      content={
        <>
          <h2>{t.privacy}</h2>
          <p>{t.safePage}</p>
        </>
      }
    />
  );
}

export function TermsPage() {
  const { t } = useStorefront();
  return (
    <InformationPage
      title={t.terms}
      content={
        <>
          <h2>{t.terms}</h2>
          <p>{t.safePage}</p>
        </>
      }
    />
  );
}

export function JournalPage({ slug }: { slug?: string }) {
  const { t } = useStorefront();
  if (slug) {
    return (
      <InformationPage
        title="Journal"
        content={
          <>
            <h2>{t.emptyTitle}</h2>
            <p>{t.emptyCopy}</p>
            <Link href="/journal" className="text-link">
              {t.backShop}
            </Link>
          </>
        }
      />
    );
  }

  return (
    <main className="wrap">
      <PageIntro
        kicker={t.journal}
        title={t.journalTitle}
        copy={t.journalCopy}
      />
      <EmptyState
        title={t.emptyTitle}
        copy={t.emptyCopy}
        action={t.continueShop}
        href="/shop"
      />
    </main>
  );
}
