import { useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStorefront } from "../state/StorefrontContext";
import { EmptyState, PageIntro } from "../components/storefront/Shared";

function InformationPage({
  title,
  copy,
  children,
}: {
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <main className="wrap information-page">
      <PageIntro kicker="COUNTRY’S" title={title} copy={copy} />
      <div className="info-panel info-editorial">{children}</div>
    </main>
  );
}

function NextSteps({ rtl }: { rtl: boolean }) {
  return (
    <div className="info-actions">
      <Link href="/shop" className="btn" data-testid="link-information-shop">
        {rtl ? "استكشف المجموعة" : "Explore the collection"}
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
      <Link href="/faq" className="text-link" data-testid="link-information-faq">
        {rtl ? "اقرأ الأسئلة الشائعة" : "Read the FAQs"}
      </Link>
    </div>
  );
}

export function AboutPage() {
  const { t, rtl } = useStorefront();
  return (
    <InformationPage
      title={t.about}
      copy={rtl
        ? "نافذة للتعرّف على COUNTRY’S، مع توضيح ما نعرفه وما لا يزال بحاجة إلى تأكيد."
        : "A first look at COUNTRY’S, with a clear line between what is known and what still needs confirmation."}
    >
      <span className="eyebrow">{rtl ? "معاينة، لا متجر مباشر" : "A preview, not a live shop"}</span>
      <h2>{rtl ? "اكتشاف المجموعة يبدأ بالوضوح." : "Discovery starts with clarity."}</h2>
      <p className="info-lede">
        {rtl
          ? "COUNTRY’S علامة مصرية للأغذية الطبيعية. تعرض هذه الواجهة معاينة محدودة للأسماء المتاحة، وليست كتالوجاً معتمداً أو نظاماً للشراء."
          : "COUNTRY’S is an Egyptian natural-food brand. This storefront presents a limited preview of the names supplied for this site; it is not a verified catalog or a purchasing system."}
      </p>
      <div className="info-callout" data-testid="status-catalog-preview">
        {rtl
          ? "تفاصيل المكونات والتغذية ومسببات الحساسية والأسعار والتوفر لم يتم تأكيدها. لا تعتمد على هذه المعاينة لاتخاذ قرار شراء."
          : "Ingredients, nutrition, allergens, prices and availability have not been confirmed. Please do not rely on this preview to make a purchase decision."}
      </div>
      <div className="info-columns">
        <article className="info-note">
          <h3>{rtl ? "ما الذي يمكنك فعله هنا؟" : "What can you do here?"}</h3>
          <p>{rtl
            ? "تصفّح أسماء المنتجات المعروضة، وابحث أو صفِّ المجموعة، واحفظ المفضلات والسلة محلياً على هذا الجهاز."
            : "Browse the listed names, search or filter the collection, and keep favorites and a basket locally on this device."}</p>
        </article>
        <article className="info-note">
          <h3>{rtl ? "ما الذي لا يمكن فعله؟" : "What is not available yet?"}</h3>
          <p>{rtl
            ? "لا يوجد طلب مباشر أو دفع أو تأكيد للمخزون. السلة ليست طلباً، ولا تعني أن المنتجات متاحة."
            : "There is no live ordering, payment or stock confirmation. A basket is not an order and does not mean products are available."}</p>
        </article>
      </div>
      <NextSteps rtl={rtl} />
    </InformationPage>
  );
}

export function StoryPage() {
  const { t, rtl } = useStorefront();
  return (
    <InformationPage
      title={t.story}
      copy={rtl
        ? "نفضّل انتظار المعلومات المعتمدة بدلاً من اختلاق حكاية عن العلامة."
        : "We would rather wait for confirmed details than invent a story for the brand."}
    >
      <span className="eyebrow">{rtl ? "القصة الرسمية قيد الانتظار" : "Official story pending"}</span>
      <h2>{t.storyLead}</h2>
      <p className="info-lede">
        {rtl
          ? "لم تُقدّم بعد معلومات موثقة عن نشأة COUNTRY’S أو فريقها أو تاريخها. لذلك لن ننسب إليها حكاية أو تفاصيل غير مؤكدة."
          : "Verified information about COUNTRY’S beginnings, people or history has not been supplied yet. We will not attribute an unconfirmed story or details to the brand."}
      </p>
      <div className="info-callout" data-testid="status-story-pending">
        {rtl
          ? "ستظهر القصة هنا عندما تتوفر معلومات وصور معتمدة. وحتى ذلك الحين، يمكنك استكشاف معاينة الكتالوج أو إرسال استفسار."
          : "The story can take shape here when approved information and photography are available. Until then, browse the catalog preview or send an inquiry."}
      </div>
      <div className="info-actions">
        <Link href="/shop" className="btn" data-testid="link-story-shop">
          {rtl ? "استكشف معاينة المجموعة" : "Browse the catalog preview"}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <Link href="/contact" className="text-link" data-testid="link-story-contact">
          {rtl ? "تواصل معنا" : "Contact us"}
        </Link>
      </div>
    </InformationPage>
  );
}

const contactSchema = (rtl: boolean) =>
  z.object({
    name: z.string().trim()
      .min(2, rtl ? "يرجى إدخال الاسم." : "Please enter your name.")
      .max(100, rtl ? "يرجى تقصير الاسم." : "Please keep your name under 100 characters."),
    email: z.union([
      z.literal(""),
      z.string().trim()
        .email(rtl ? "يرجى إدخال بريد إلكتروني صحيح." : "Enter a valid email address.")
        .max(254, rtl ? "يرجى تقصير البريد الإلكتروني." : "Please keep the email under 254 characters."),
    ]),
    topic: z.string().min(1, rtl ? "اختر موضوعاً." : "Choose a topic."),
    message: z.string().trim()
      .min(10, rtl ? "اكتب رسالة من 10 أحرف على الأقل." : "Write a message of at least 10 characters.")
      .max(1500, rtl ? "يرجى اختصار الرسالة إلى 1500 حرف." : "Please keep your message under 1,500 characters."),
  });

type ContactFields = z.infer<ReturnType<typeof contactSchema>>;

export function ContactPage() {
  const { t, rtl } = useStorefront();
  const [status, setStatus] = useState<"idle" | "ready">("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const form = useForm<ContactFields>({
    resolver: zodResolver(contactSchema(rtl)),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });
  const topics = rtl
    ? [
        ["catalog", "تفاصيل الكتالوج أو المنتج"],
        ["order", "استفسار عن الطلب"],
        ["delivery", "معلومات التوصيل"],
        ["other", "موضوع آخر"],
      ]
    : [
        ["catalog", "Catalog or product details"],
        ["order", "Order inquiry"],
        ["delivery", "Delivery information"],
        ["other", "Something else"],
      ];
  const topicLabel = (value: string) =>
    topics.find(([key]) => key === value)?.[1] ?? value;

  const submitInquiry = (values: ContactFields) => {
    const message = rtl
      ? [
          "استفسار إلى COUNTRY’S",
          `الاسم: ${values.name}`,
          values.email ? `البريد الإلكتروني: ${values.email}` : "",
          `الموضوع: ${topicLabel(values.topic)}`,
          `الرسالة: ${values.message}`,
        ].filter(Boolean).join("\n")
      : [
          "Inquiry for COUNTRY’S",
          `Name: ${values.name}`,
          values.email ? `Email: ${values.email}` : "",
          `Topic: ${topicLabel(values.topic)}`,
          `Message: ${values.message}`,
        ].filter(Boolean).join("\n");
    const url = `https://wa.me/201067358073?text=${encodeURIComponent(message)}`;
    setFallbackUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("ready");
  };

  const copy = rtl
    ? {
        intro: "أرسل استفسارك عبر واتساب. ستراجع الرسالة وتضغط إرسال بنفسك هناك.",
        heading: "ما الذي يمكننا مساعدتك به؟",
        disclosure: "عند المتابعة، تُفتح محادثة واتساب برسالة مُعبأة مسبقاً. لن يرسل هذا الموقع الرسالة ولن يحفظ قيم النموذج أو يرسلها إلى خادم.",
        name: "الاسم",
        email: "البريد الإلكتروني (اختياري)",
        topic: "الموضوع",
        choose: "اختر موضوعاً",
        message: "رسالتك",
        nameHint: "كيف يمكننا مناداتك؟",
        emailHint: "name@example.com",
        messageHint: "اكتب استفسارك هنا",
        send: "المتابعة إلى واتساب",
        ready: "راجع الرسالة في واتساب واضغط إرسال عندما تكون مستعداً. إذا لم تُفتح نافذة جديدة، استخدم الرابط أدناه.",
        fallback: "فتح الرسالة المعبأة في واتساب",
        details: "الأسعار والتوفر وتفاصيل المنتجات ومناطق ورسوم ومواعيد التوصيل لم يتم تأكيدها. اسألنا عنها قبل الاعتماد عليها.",
        faq: "لإجابات سريعة، اطلع على الأسئلة الشائعة.",
      }
    : {
        intro: "Send an inquiry through WhatsApp. You review the message and press Send there yourself.",
        heading: "What can we help you with?",
        disclosure: "Continuing opens a WhatsApp chat with a prefilled message. This site does not send the message, save form values, or submit them to a server.",
        name: "Name",
        email: "Email (optional)",
        topic: "Topic",
        choose: "Choose a topic",
        message: "Your message",
        nameHint: "What should we call you?",
        emailHint: "name@example.com",
        messageHint: "Write your inquiry here",
        send: "Continue to WhatsApp",
        ready: "Review the message in WhatsApp and press Send when you are ready. If a new tab did not open, use the link below.",
        fallback: "Open prefilled message in WhatsApp",
        details: "Prices, availability, product details, and delivery areas, fees and timing are not confirmed. Please ask before relying on them.",
        faq: "For quick answers, visit the FAQs.",
      };

  return (
    <InformationPage title={t.contact} copy={copy.intro}>
      <div className="contact-layout">
        <aside className="contact-aside">
          <span className="eyebrow">{rtl ? "استفسار مباشر" : "A direct inquiry"}</span>
          <h2>{rtl ? "نحن هنا لنوضح ما هو معروف." : "Here to help clarify what’s known."}</h2>
          <p>{copy.details}</p>
          <p><Link href="/faq" className="text-link" data-testid="link-contact-faq">{copy.faq}</Link></p>
          <div className="contact-disclosure" data-testid="status-contact-disclosure">
            {copy.disclosure}
          </div>
        </aside>
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading">{copy.heading}</h2>
          <Form {...form}>
            <form className="contact-form" onSubmit={form.handleSubmit(submitInquiry)} noValidate>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="contact-field">
                    <FormLabel>{copy.name}</FormLabel>
                    <FormControl>
                      <Input {...field} required maxLength={100} autoComplete="name" placeholder={copy.nameHint} data-testid="input-contact-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="contact-field">
                    <FormLabel>{copy.email}</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" maxLength={254} autoComplete="email" placeholder={copy.emailHint} data-testid="input-contact-email" />
                    </FormControl>
                    <FormDescription>{rtl ? "اختياري؛ لن يُطلب منك إدخاله." : "Optional; you can leave this blank."}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="contact-field">
                    <FormLabel>{copy.topic}</FormLabel>
                    <FormControl>
                      <select {...field} required className="select" data-testid="select-contact-topic">
                        <option value="">{copy.choose}</option>
                        {topics.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="contact-field">
                    <FormLabel>{copy.message}</FormLabel>
                    <FormControl>
                      <textarea {...field} required maxLength={1500} className="contact-field-textarea" rows={5} placeholder={copy.messageHint} data-testid="textarea-contact-message" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button className="btn" type="submit" data-testid="button-contact-submit">
                <MessageCircle size={16} aria-hidden="true" />
                {copy.send}
              </button>
              {status !== "idle" && (
                <div className="contact-status" role="status" aria-live="polite" data-testid="status-contact-handoff">
                  <p>{copy.ready}</p>
                  <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" data-testid="link-contact-whatsapp-fallback">
                    {copy.fallback}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              )}
            </form>
          </Form>
        </section>
      </div>
    </InformationPage>
  );
}

export function FaqPage() {
  const { t, rtl } = useStorefront();
  const entries = rtl
    ? [
        ["ما الذي تعرضه هذه الواجهة؟", "هذه معاينة محدودة لأسماء المنتجات. تفاصيل المنتجات والأسعار والتوفر غير مؤكدة."],
        ["هل يمكنني إتمام طلب أو دفع؟", "لا. لا يوجد طلب مباشر أو دفع. السلة والمفضلات محفوظة محلياً ولا تمثل طلباً."],
        ["هل أستطيع معرفة حالة طلبي؟", "لا تعرض الواجهة حالة طلب، ولا يتم إنشاء طلب من خلالها. للاستفسار عن طلب سابق، تواصل مع المتجر عبر واتساب."],
        ["هل المكونات أو مسببات الحساسية معروفة؟", "لم يتم تقديم معلومات معتمدة عن المكونات أو التغذية أو مسببات الحساسية. اسأل المتجر مباشرة قبل اتخاذ قرار."],
        ["ما معلومات التوصيل المتاحة؟", "مناطق التوصيل والرسوم والمواعيد غير مؤكدة. يرجى الاستفسار مباشرة."],
        ["كيف أتواصل؟", "استخدم نموذج التواصل لإعداد رسالة واتساب؛ راجعها وأرسلها بنفسك من واتساب."],
      ]
    : [
        ["What does this storefront show?", "A limited preview of product names. Product details, prices and availability are unconfirmed."],
        ["Can I place or pay for an order?", "No. Live ordering and payment are not configured. The basket and favorites stay local and are not an order."],
        ["Can I check an order status?", "This storefront does not display order status, and it does not create orders. For an existing order inquiry, contact the store on WhatsApp."],
        ["Are ingredients or allergens known?", "Approved ingredient, nutrition and allergen information has not been supplied. Ask the store directly before making a decision."],
        ["What delivery information is available?", "Delivery areas, fees and timing are unconfirmed. Please ask directly."],
        ["How do I get in touch?", "Use the contact form to prepare a WhatsApp message; review and send it yourself in WhatsApp."],
      ];
  return (
    <InformationPage title={t.faq} copy={rtl
      ? "إجابات واضحة عن معاينة الكتالوج والطلب والتواصل."
      : "Clear answers about the catalog preview, ordering and getting in touch."}>
      <span className="eyebrow">{rtl ? "معلومات عملية" : "Useful to know"}</span>
      <h2>{rtl ? "قبل أن تتخذ الخطوة التالية." : "Before you take the next step."}</h2>
      <ul className="faq-list">
        {entries.map(([question, answer], index) => (
          <li key={question} data-testid={`faq-entry-${index + 1}`}>
            <strong>{question}</strong>
            <p>{answer}</p>
          </li>
        ))}
      </ul>
      <NextSteps rtl={rtl} />
    </InformationPage>
  );
}

export function DeliveryPage() {
  const { t, rtl } = useStorefront();
  return (
    <InformationPage
      title={t.deliveryLink}
      copy={rtl
        ? "لم تُؤكّد تفاصيل التوصيل بعد؛ نوضح ذلك بدلاً من تقديم وعد غير موثق."
        : "Delivery details are not confirmed yet. We would rather say so than make an unsupported promise."}
    >
      <span className="eyebrow">{rtl ? "التفاصيل قيد التأكيد" : "Details still to confirm"}</span>
      <h2>{rtl ? "اسأل قبل الاعتماد على أي موعد أو تكلفة." : "Check before relying on a time or cost."}</h2>
      <p className="info-lede">{rtl
        ? "لم يتم تأكيد مناطق التوصيل أو الرسوم أو المواعيد. لا توجد معلومات كافية هنا لتحديد ما إذا كان التوصيل متاحاً لعنوان معين."
        : "Delivery areas, fees and timing have not been confirmed. There is not enough verified information here to say whether delivery is available to a particular address."}</p>
      <div className="info-columns">
        <article className="info-note">
          <h3>{rtl ? "ما الذي ينبغي تأكيده؟" : "What should you confirm?"}</h3>
          <p>{rtl ? "اسأل عن نطاق الخدمة إلى عنوانك، وأي رسوم، والوقت المتوقع قبل اتخاذ قرار." : "Ask whether your address is covered, whether any fees apply, and what timing to expect before deciding."}</p>
        </article>
        <article className="info-note">
          <h3>{rtl ? "لا يوجد طلب مباشر" : "No live order flow"}</h3>
          <p>{rtl ? "إضافة عناصر إلى السلة لا تحجزها ولا تنشئ طلباً أو تؤكد التوصيل." : "Adding items to the basket does not reserve them, create an order or confirm delivery."}</p>
        </article>
      </div>
      <div className="info-actions">
        <Link href="/contact" className="btn" data-testid="link-delivery-contact">
          {rtl ? "اسأل عبر واتساب" : "Ask via WhatsApp"}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <Link href="/faq" className="text-link" data-testid="link-delivery-faq">{t.faq}</Link>
      </div>
    </InformationPage>
  );
}

export function PrivacyPage() {
  const { t, rtl } = useStorefront();
  return (
    <InformationPage title={t.privacy} copy={rtl
      ? "ملخص لسلوك الواجهة الحالية، وليس سياسة خصوصية رسمية أو نصيحة قانونية."
      : "A summary of how the current storefront behaves—not an official privacy policy or legal advice."}>
      <span className="eyebrow">{rtl ? "ملخص السلوك الحالي" : "Current behavior summary"}</span>
      <h2>{rtl ? "ما الذي يبقى في المتصفح، وما الذي ينتقل إلى واتساب؟" : "What stays in your browser, and what goes to WhatsApp?"}</h2>
      <div className="info-columns">
        <article className="info-note">
          <h3>{rtl ? "حالة محلية في المتصفح" : "Local browser state"}</h3>
          <p>{rtl
            ? "تحفظ الواجهة اللغة والمظهر والبحث والتصفية والترتيب والمفضلات والسلة في تخزين المتصفح المحلي. ويمكن أن تحفظ مسودة الاستفسار التي تنشئها من صفحة السلة على هذا الجهاز."
            : "The storefront keeps language, theme, search, filter, sort, favorites and basket state in local browser storage. An inquiry draft you create from the basket page can also be saved on this device."}</p>
        </article>
        <article className="info-note">
          <h3>{rtl ? "نموذج التواصل" : "Contact form"}</h3>
          <p>{rtl
            ? "قيم نموذج التواصل لا تُحفظ في هذا الموقع ولا تُرسل إلى خادم. عند المتابعة، تُمرر الرسالة المُعبأة إلى رابط واتساب لفتح محادثة."
            : "Contact form values are not saved by this site or submitted to a server. Continuing passes the prefilled message in a WhatsApp link to open a chat."}</p>
        </article>
      </div>
      <div className="info-callout" data-testid="status-privacy-summary">
        {rtl
          ? "فتح المحادثة لا يرسل الرسالة تلقائياً. راجعها واضغط إرسال في واتساب إذا رغبت. ما يحدث بعد فتح واتساب خارج سلوك هذه الواجهة، وهذه الصفحة لا تصف معالجته للبيانات."
          : "Opening the chat does not send the message automatically. Review it and press Send in WhatsApp if you choose. What happens after opening WhatsApp is outside this interface; this page does not describe its data handling."}
      </div>
      <p>{rtl
        ? "هذا وصف للسلوك الذي توفره الواجهة حالياً، وليس بياناً شاملاً عن كل معالجة بيانات أو سياسة قانونية نهائية."
        : "This describes the behavior currently provided by the interface; it is not a complete account of all data processing or a final legal policy."}</p>
      <Link href="/contact" className="text-link" data-testid="link-privacy-contact">{rtl ? "انتقل إلى التواصل" : "Go to contact"}</Link>
    </InformationPage>
  );
}

export function TermsPage() {
  const { t, rtl } = useStorefront();
  return (
    <InformationPage title={t.terms} copy={rtl
      ? "ملخص للاستخدام الحالي للواجهة، وليس شروطاً رسمية أو نصيحة قانونية."
      : "A summary of the storefront’s current behavior—not official terms or legal advice."}>
      <span className="eyebrow">{rtl ? "حدود المعاينة الحالية" : "Current preview limits"}</span>
      <h2>{rtl ? "المعلومات المتاحة لا تشكل عرضاً للشراء." : "The information here is not a purchase offer."}</h2>
      <ul className="info-list">
        <li><strong>{rtl ? "كتالوج للمعاينة" : "Catalog preview"}</strong>
          {rtl ? "الأسماء والتصنيفات المعروضة محدودة وغير مؤكدة؛ تفاصيل المنتجات والأسعار والتوفر لم يتم اعتمادها." : "Names and categories shown are limited and unconfirmed; product details, prices and availability are not verified."}</li>
        <li><strong>{rtl ? "لا يوجد طلب أو دفع" : "No ordering or payment"}</strong>
          {rtl ? "المفضلات والسلة حالات محلية على هذا الجهاز. لا تُرسل طلباً ولا تحجز منتجاً ولا تنشئ عملية دفع." : "Favorites and the basket are local state on this device. They do not submit an order, reserve a product or initiate payment."}</li>
        <li><strong>{rtl ? "تأكيد المعلومات" : "Confirm details directly"}</strong>
          {rtl ? "تحقق مباشرة من معلومات المنتج والتوفر والتوصيل قبل الاعتماد عليها." : "Confirm product, availability and delivery information directly before relying on it."}</li>
      </ul>
      <div className="info-callout" data-testid="status-terms-summary">
        {rtl
          ? "هذه الصفحة تصف سلوك الواجهة الحالية فقط. الشروط الرسمية والسياسات المعتمدة لم تُقدّم بعد، وهذا ليس بديلاً عنها أو عن المشورة القانونية."
          : "This page describes only the current interface behavior. Official terms and approved policies have not been supplied; this is not a substitute for them or for legal advice."}
      </div>
      <div className="info-actions">
        <Link href="/faq" className="btn" data-testid="link-terms-faq">{t.faq}</Link>
        <Link href="/contact" className="text-link" data-testid="link-terms-contact">{t.contact}</Link>
      </div>
    </InformationPage>
  );
}

export function JournalPage({ slug }: { slug?: string }) {
  const { t, rtl } = useStorefront();
  if (slug) {
    return (
      <InformationPage
        title={t.journal}
        copy={rtl ? "لم تُنشر مقالات بعد." : "No journal articles have been published yet."}
      >
        <span className="eyebrow">{rtl ? "لا توجد مقالات منشورة" : "Nothing published yet"}</span>
        <h2>{t.emptyTitle}</h2>
        <p>{rtl
          ? "لا يوجد مقال بهذا العنوان. لم نكتب محتوى افتراضياً؛ ستظهر المقالات هنا بعد اعتمادها ونشرها."
          : "There is no article at this address. We have not made up placeholder stories; articles will appear here when approved and published."}</p>
        <div className="info-actions">
          <Link href="/journal" className="text-link" data-testid="link-journal-index">{rtl ? "العودة إلى المجلة" : "Back to the journal"}</Link>
          <Link href="/faq" className="text-link" data-testid="link-journal-faq">{t.faq}</Link>
        </div>
      </InformationPage>
    );
  }

  return (
    <main className="wrap information-page">
      <PageIntro
        kicker={t.journal}
        title={t.journalTitle}
        copy={rtl
          ? "لا توجد مقالات منشورة حتى الآن. لن نملأ هذه المساحة بمحتوى غير معتمد."
          : "No articles have been published yet. We will not fill this space with unapproved content."}
      />
      <div className="journal-empty" data-testid="status-journal-empty">
        <EmptyState
          title={rtl ? "المجلة تنتظر قصتها الأولى" : "The journal is waiting for its first story"}
          copy={rtl
            ? "لا توجد مقالات منشورة بعد. للحصول على معلومات متاحة الآن، يمكنك مراجعة الأسئلة الشائعة أو معلومات التوصيل."
            : "There are no published articles yet. For information available now, visit the FAQs or delivery information page."}
          action={rtl ? "الأسئلة الشائعة" : "Read the FAQs"}
          href="/faq"
        />
        <div className="info-actions">
          <Link href="/delivery" className="text-link" data-testid="link-journal-delivery">{t.deliveryLink}</Link>
          <Link href="/about" className="text-link" data-testid="link-journal-about">{t.about}</Link>
        </div>
      </div>
    </main>
  );
}
