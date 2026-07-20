import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { createClient, groq } from "next-sanity";
import { Mail, Play } from "lucide-react";

export const revalidate = 60;

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type Stat = {
  value?: string;
  label?: string;
};

type VideoSlot = {
  slotNumber: number;
  title?: string;
  brand?: string;
  category?: string;
  cloudinaryUrl?: string;
  videoFileUrl?: string;
};

type TextBlock = {
  title?: string;
  body?: string;
};

type BrandLogo = {
  name?: string;
  logoUrl?: string;
};

type SectionTitles = {
  medicalWellness?: string;
  skincareHairCare?: string;
  lifestyleHome?: string;
  founderLedScripts?: string;
  appSaasUgc?: string;
  paidAdHooks?: string;
  homeDailyFinds?: string;
};

type SiteContent = {
  brandName?: string;
  eyebrow?: string;
  navAboutLabel?: string;
  navPortfolioLabel?: string;
  navContactLabel?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  aboutHeading?: string;
  creatorName?: string;
  creatorBio?: string;
  brandTrustEyebrow?: string;
  brandTrustHeadline?: string;
  samplesHeading?: string;
  variationsSectionTitle?: string;
  variationsHeadline?: string;
  location?: string;
  contactEmail?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  xUrl?: string;
  stats?: Stat[];
  aboutBullets?: string[];
  brandLogos?: BrandLogo[];
  videoSlots?: VideoSlot[];
  variations?: TextBlock[];
  sectionTitles?: SectionTitles;
  finalHeadline?: string;
  finalText?: string;
};

const videoLabels = [
  ["Hero Feature", "Portrait Clip", "Hero"],
  ["Intro Sample", "Creator Intro", "About"],
  ["AI Persona", "Ad Read Test", "AI UGC Demo"],
  ["Product Demo", "Wide Sample", "AI UGC Demo"],
  ["Brand Story", "Wide Sample", "AI UGC Demo"],
  ["ForceFactor", "Supplements", "Medical Wellness"],
  ["UmiGlow", "Greens Powder", "Medical Wellness"],
  ["Nugenix Total T2", "Men's Health", "Medical Wellness"],
  ["Sky Nutrition", "Memory Gummies", "Medical Wellness"],
  ["Glow Serum", "Skincare Demo", "Skincare and Hair Care"],
  ["Hair Repair", "Routine Video", "Skincare and Hair Care"],
  ["SPF Daily", "Face Care", "Skincare and Hair Care"],
  ["Volume Spray", "Hair Tutorial", "Skincare and Hair Care"],
  ["Sampeel Lounge Wear", "Amazon Video", "Lifestyle and Home"],
  ["Fresh Produce", "T-Shirt Everywhere Dress", "Lifestyle and Home"],
  ["BeyondDiamond", "Sponsored Content", "Lifestyle and Home"],
  ["Velantra Boat Tote", "Everyday Summer Bag", "Lifestyle and Home"],
  ["Founder Script", "Brand Voice", "Founder-Led Scripts"],
  ["Service Brand", "Explainer Ad", "Founder-Led Scripts"],
  ["Coaching Offer", "Authority Clip", "Founder-Led Scripts"],
  ["Local Business", "Trust Builder", "Founder-Led Scripts"],
  ["Beauty App", "Screen Walkthrough", "App and SaaS UGC"],
  ["Wellness Tracker", "Feature Demo", "App and SaaS UGC"],
  ["Finance Tool", "Problem/Solution", "App and SaaS UGC"],
  ["Learning App", "User Journey", "App and SaaS UGC"],
  ["Retargeting", "Objection Handler", "Paid Ad Hooks"],
  ["Launch Offer", "Direct CTA", "Paid Ad Hooks"],
  ["Problem Hook", "Before/After", "Paid Ad Hooks"],
  ["Social Proof", "Review Style", "Paid Ad Hooks"],
  ["Kitchen Find", "Home Demo", "Home and Daily Finds"],
  ["Desk Setup", "Lifestyle Demo", "Home and Daily Finds"],
  ["Travel Bag", "Packing Demo", "Home and Daily Finds"],
  ["Pet Care", "Routine Demo", "Home and Daily Finds"],
  ["Full Story", "Complete Ad", "Video Variations"],
  ["Hook 1", "Problem/Solution", "Video Variations"],
  ["Hook 2", "Text Overlay", "Video Variations"],
  ["Hook 3", "Direct CTA", "Video Variations"],
  ["Contact Sample", "Final Clip", "Contact"],
  ["Reserved", "Campaign Add-On", "Reserved"],
  ["Reserved", "Campaign Add-On", "Reserved"],
] as const;

const fallbackContent: Required<SiteContent> = {
  brandName: "MediaCrux",
  eyebrow: "AI UGC Creator",
  navAboutLabel: "About",
  navPortfolioLabel: "Portfolio",
  navContactLabel: "Contact",
  heroHeadline: "AI UGC ads made for brands that need speed, polish, and conversion.",
  heroSubheadline: "Creator-style product videos, hooks, demos, and paid ad variations.",
  aboutHeading: "Hi, we're MediaCrux",
  creatorName: "MediaCrux",
  creatorBio:
    "AI UGC studio producing human-feeling brand videos for paid media, organic social, product pages, and creator-style campaigns.",
  brandTrustEyebrow: "Brands That Trust MediaCrux",
  brandTrustHeadline: "UGC ads for brands ready to move faster",
  samplesHeading: "AI UGC ad samples in motion",
  variationsSectionTitle: "Video Variations",
  variationsHeadline: "Two or More?",
  location: "Available worldwide",
  contactEmail: "contact@mediacrux.space",
  instagramUrl: "#",
  tiktokUrl: "#",
  xUrl: "#",
  stats: [
    { value: "8.5K", label: "TikTok" },
    { value: "23K", label: "Instagram" },
    { value: "4.5K", label: "X" },
  ],
  aboutBullets: [
    "AI-led UGC production for brands that need fresh creative quickly",
    "Product demos, testimonials, story-based ads, hooks, and CTA variations",
    "Script writing, avatar direction, editing, captions, and usage-ready exports",
    "Built for health, wellness, beauty, lifestyle, tech, and service brands",
  ],
  brandLogos: [
    { name: "Wellness Brand" },
    { name: "Beauty Brand" },
    { name: "Lifestyle Brand" },
    { name: "Tech Brand" },
    { name: "Home Brand" },
    { name: "Retail Brand" },
    { name: "Fitness Brand" },
    { name: "SaaS Brand" },
    { name: "Fashion Brand" },
    { name: "DTC Brand" },
  ],
  videoSlots: Array.from({ length: 40 }, (_, index) => ({
    slotNumber: index + 1,
    brand: videoLabels[index][0],
    title: videoLabels[index][1],
    category: videoLabels[index][2],
  })),
  variations: [
    {
      title: "Tell a Full Story",
      body: "One video introduces your product, chosen AI face or spokesperson, pain point, benefit, and next step.",
    },
    {
      title: "Test More Hooks",
      body: "Create multiple versions from the same campaign angle so the brand can test what converts.",
    },
    {
      title: "Match the Platform",
      body: "Use different pacing, captions, and CTA styles for TikTok, Instagram, Shorts, and paid ads.",
    },
  ],
  sectionTitles: {
    medicalWellness: "Medical Wellness",
    skincareHairCare: "Skincare and Hair Care",
    lifestyleHome: "Lifestyle and Home",
    founderLedScripts: "Founder-Led Scripts",
    appSaasUgc: "App and SaaS UGC",
    paidAdHooks: "Paid Ad Hooks",
    homeDailyFinds: "Home and Daily Finds",
  },
  finalHeadline: "Want to work together?",
  finalText: "Send the campaign brief, product details, or rough idea and MediaCrux can turn it into UGC-ready content.",
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "l1b0svir",
  dataset: "production",
  apiVersion: "2026-07-17",
  useCdn: true,
});

const siteQuery = groq`*[_type == "siteSettings"][0]{
  brandName,
  eyebrow,
  navAboutLabel,
  navPortfolioLabel,
  navContactLabel,
  heroHeadline,
  heroSubheadline,
  aboutHeading,
  creatorName,
  creatorBio,
  brandTrustEyebrow,
  brandTrustHeadline,
  samplesHeading,
  variationsSectionTitle,
  variationsHeadline,
  location,
  contactEmail,
  instagramUrl,
  tiktokUrl,
  xUrl,
  stats,
  aboutBullets,
  brandLogos[]{
    name,
    "logoUrl": logo.asset->url
  },
  variations,
  sectionTitles,
  finalHeadline,
  finalText,
  videoSlots[]{
    slotNumber,
    title,
    brand,
    category,
    cloudinaryUrl,
    "videoFileUrl": videoFile.asset->url
  }
}`;

function mergeContent(site: SiteContent | null): Required<SiteContent> {
  return {
    ...fallbackContent,
    ...site,
    stats: site?.stats?.length ? site.stats : fallbackContent.stats,
    aboutBullets: site?.aboutBullets?.length ? site.aboutBullets : fallbackContent.aboutBullets,
    brandLogos: site?.brandLogos?.length ? site.brandLogos : fallbackContent.brandLogos,
    variations: site?.variations?.length ? site.variations : fallbackContent.variations,
    sectionTitles: { ...fallbackContent.sectionTitles, ...site?.sectionTitles },
    videoSlots: mergeVideoSlots(site?.videoSlots),
  };
}

function mergeVideoSlots(slots?: VideoSlot[]) {
  return fallbackContent.videoSlots.map((fallbackSlot) => {
    const editableSlot = slots?.find((slot) => slot.slotNumber === fallbackSlot.slotNumber);
    return { ...fallbackSlot, ...editableSlot };
  });
}

function getVideoSrc(slot: VideoSlot) {
  return slot.cloudinaryUrl || slot.videoFileUrl;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-295 items-center gap-4 px-5 py-12 md:gap-8 md:px-8 md:py-16">
      <div className="h-px flex-1 bg-black/25" />
      <h2 className={`${playfair.className} text-center text-3xl font-semibold uppercase tracking-[0.08em] text-black sm:text-4xl md:text-5xl`}>
        {children}
      </h2>
      <div className="h-px flex-1 bg-black/25" />
    </div>
  );
}

function PhoneVideo({ slot, tall = false, showCaption = true }: { slot: VideoSlot; tall?: boolean; showCaption?: boolean }) {
  const src = getVideoSrc(slot);

  return (
    <article className="reveal min-w-0 text-center">
      <div
        className={`video-card relative mx-auto overflow-hidden rounded-[34px] border-8 border-[#f2f2ef] bg-[#ecebe5] shadow-[0_12px_22px_rgba(0,0,0,0.16)] sm:border-10 ${
          tall ? "h-138.75 w-63.75 sm:h-152.5 sm:w-71.25" : "h-75 w-42 sm:h-105 sm:w-59"
        }`}
      >
        {src ? (
          <video className="size-full object-cover" src={src} controls playsInline preload="metadata" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center bg-[linear-gradient(145deg,#fbfaf5,#d8d6cb_48%,#ffffff)] px-5 text-center">
            <p className="mb-7 text-xs font-black uppercase tracking-[0.28em] text-black/40">
              Sanity Slot {slot.slotNumber}
            </p>
            <div className="grid size-16 place-items-center rounded-full bg-black/55 text-white">
              <Play className="ml-1 size-8 fill-white" />
            </div>
            <p className="mt-6 text-sm font-semibold text-black/45">Upload video {slot.slotNumber}</p>
          </div>
        )}
      </div>
      {showCaption ? (
        <div className="mx-auto mt-5 max-w-60 text-lg leading-tight text-[#2d392d] md:text-[21px]">
          <p>{slot.brand}</p>
          <p className="font-black">{slot.title}</p>
        </div>
      ) : null}
    </article>
  );
}

function WideVideo({ slot, caption }: { slot: VideoSlot; caption?: string }) {
  const src = getVideoSrc(slot);

  return (
    <article className="reveal mx-auto w-full max-w-140 text-center">
      <div className="video-card relative aspect-video overflow-hidden rounded-[26px] bg-[#ecebe5] shadow-sm">
        {src ? (
          <video className="size-full object-cover" src={src} controls playsInline preload="metadata" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center bg-[linear-gradient(135deg,#f9f7ef,#d6d6cd)]">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-black/45">
              Sanity Slot {slot.slotNumber}
            </p>
            <div className="grid size-20 place-items-center rounded-full bg-black/35 text-white">
              <Play className="ml-1 size-9 fill-white" />
            </div>
          </div>
        )}
      </div>
      <p className="py-3 text-[22px]">
        {caption || `${slot.brand}: `}
        <span className="italic">{slot.title}</span>
      </p>
    </article>
  );
}

function PortfolioRow({ title, slots }: { title: string; slots: VideoSlot[] }) {
  return (
    <section className="bg-white">
      <SectionTitle>{title}</SectionTitle>
      <div className="mx-auto grid max-w-280 grid-cols-2 gap-x-5 gap-y-14 px-4 pb-20 sm:gap-x-10 sm:gap-y-16 sm:px-5 lg:grid-cols-4">
        {slots.map((slot) => (
          <PhoneVideo key={slot.slotNumber} slot={slot} />
        ))}
      </div>
    </section>
  );
}

function BrandLogoCard({ brand, index }: { brand: BrandLogo; index: number }) {
  return (
    <div className="mx-3 flex h-28 w-44 shrink-0 items-center justify-center rounded-[26px] border border-black/10 bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.05)] md:h-32 md:w-52">
      {brand.logoUrl ? (
        <div
          className="size-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${brand.logoUrl})` }}
          role="img"
          aria-label={brand.name || "Brand logo"}
        />
      ) : (
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-16 rounded-full bg-[linear-gradient(135deg,#efede5,#d7d5ca)]" />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
            {brand.name || `Brand ${index + 1}`}
          </p>
        </div>
      )}
    </div>
  );
}

function BrandTrust({ brands, eyebrow, headline }: { brands: BrandLogo[]; eyebrow: string; headline: string }) {
  const rail = brands.slice(0, 10);
  const animatedRail = [...rail, ...rail];

  return (
    <section className="overflow-hidden bg-[#fbfaf6] py-16">
      <div className="mx-auto max-w-295 px-5 text-center md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-black/45">{eyebrow}</p>
        <h2 className={`${playfair.className} mt-4 text-3xl font-semibold md:text-5xl`}>
          {headline}
        </h2>
      </div>
      <div className="mt-10 overflow-hidden mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="brand-rail flex w-max">
          {animatedRail.map((brand, index) => (
            <BrandLogoCard key={`${brand.name}-${index}`} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialMark({ type }: { type: "tiktok" | "instagram" | "x" }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-7 md:size-10" aria-hidden="true">
        <rect width="17" height="17" x="3.5" y="3.5" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.7" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" className="size-7 md:size-10" aria-hidden="true">
        <path d="M4 4h4.5l4.1 5.8L17.8 4H21l-6.9 7.8L21.6 22h-4.5l-4.8-6.7L6.4 22H3.2l7.5-8.5L4 4Zm3.3 2 10.8 14h1.2L8.5 6H7.3Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-7 md:size-10" aria-hidden="true">
      <path d="M15.5 3c.5 3.1 2.2 4.9 5.1 5.1v3.5a9.2 9.2 0 0 1-5-1.5v6.5c0 3.3-2.6 5.4-5.8 5.4-3.1 0-5.6-2.2-5.6-5.2 0-3.5 3.4-6.1 7.5-5.2v3.7c-1.9-.7-3.7.1-3.7 1.5 0 1 .8 1.7 1.9 1.7 1.2 0 2.1-.8 2.1-2.4V3h3.5Z" fill="currentColor" />
    </svg>
  );
}

const portfolioSections: { key: keyof SectionTitles; start: number }[] = [
  { key: "medicalWellness", start: 5 },
  { key: "skincareHairCare", start: 9 },
  { key: "lifestyleHome", start: 13 },
  { key: "founderLedScripts", start: 17 },
  { key: "appSaasUgc", start: 21 },
  { key: "paidAdHooks", start: 25 },
  { key: "homeDailyFinds", start: 29 },
];

export default async function Page() {
  const site = await client.fetch<SiteContent | null>(siteQuery).catch(() => null);
  const content = mergeContent(site);
  const slots = content.videoSlots;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto flex min-h-18 max-w-7xl items-center justify-end gap-4 px-5 py-3 md:px-8">
          <div className="flex items-center justify-end gap-5 text-sm font-black uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:gap-8 md:text-lg">
            <Link className="nav-link" href="#about">{content.navAboutLabel}</Link>
            <Link className="nav-link" href="#portfolio">{content.navPortfolioLabel}</Link>
            <Link className="nav-link" href="#contact">{content.navContactLabel}</Link>
          </div>
        </nav>
      </header>

      <section className="relative h-277.5 overflow-hidden bg-white sm:h-282.5 md:h-[56.25vw] md:min-h-140 md:max-h-190 md:bg-[#f9f8f2]">
        <Image
          src="/banner-d.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        <div className="absolute inset-x-0 top-0 h-152.5 sm:h-162.5 md:hidden">
          <Image
            src="/banner-m.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-x-0 top-45 z-10 flex items-center justify-center gap-3 md:hidden">
          <Image src="/logo.png" alt={`${content.brandName} logo`} width={58} height={58} className="rounded-full" priority />
          <p className={`${playfair.className} text-4xl font-bold italic text-black`}>{content.brandName}</p>
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl items-start justify-center px-5 pt-133.75 sm:px-8 sm:pt-140 md:items-center md:justify-start md:py-10 md:pt-10">
          <div className="w-full max-w-63.75 sm:max-w-71.25 md:ml-4 md:translate-y-6 lg:ml-10">
            <PhoneVideo slot={slots[0]} tall showCaption={false} />
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-295 grid-cols-1 gap-14 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <h2 className={`${playfair.className} text-4xl font-semibold sm:text-5xl md:text-6xl`}>
            {content.aboutHeading}
          </h2>
          <p className="mt-8 max-w-175 text-xl leading-snug md:text-3xl">{content.creatorBio}</p>
          <ul className="mt-10 space-y-4 text-lg leading-snug md:text-2xl">
            {content.aboutBullets.map((bullet) => (
              <li key={bullet} className="flex gap-4">
                <span className="mt-3 size-2 rounded-full bg-black" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative grid grid-cols-1 gap-12 pt-8 sm:grid-cols-2 sm:gap-14 lg:pt-16">
          <PhoneVideo slot={slots[1]} tall />
          <div className="sm:pt-20">
            <PhoneVideo slot={slots[2]} tall />
          </div>
        </div>
      </section>

      <BrandTrust brands={content.brandLogos} eyebrow={content.brandTrustEyebrow} headline={content.brandTrustHeadline} />

      <section className="bg-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-295">
          <h2 className={`${playfair.className} mb-12 text-4xl font-semibold italic md:mb-16 md:text-5xl`}>
            {content.samplesHeading}
          </h2>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[285px_1fr_285px]">
            <PhoneVideo slot={slots[2]} tall />
            <div className="grid gap-10 md:gap-12">
              <WideVideo slot={slots[3]} caption="Demo sample: " />
              <WideVideo slot={slots[4]} caption="Ad concept: " />
            </div>
            <PhoneVideo slot={slots[5]} tall />
          </div>
        </div>
      </section>

      <div id="portfolio">
        {portfolioSections.map((section) => (
          <PortfolioRow
            key={section.key}
            title={content.sectionTitles[section.key] || fallbackContent.sectionTitles[section.key] || ""}
            slots={slots.slice(section.start, section.start + 4)}
          />
        ))}
      </div>

      <section className="bg-white">
        <SectionTitle>{content.variationsSectionTitle}</SectionTitle>
        <div className="mx-auto grid max-w-295 grid-cols-1 gap-16 px-5 pb-20 md:px-8 md:pb-24 lg:grid-cols-[0.58fr_1.42fr]">
          <div>
            <h2 className={`${playfair.className} text-4xl font-semibold md:text-5xl`}>{content.variationsHeadline}</h2>
            <div className="mt-12 space-y-8 md:mt-20 md:space-y-10">
              {content.variations.map((variation) => (
                <div key={variation.title} className="text-xl leading-snug md:text-2xl">
                  <p className="font-black">* {variation.title}</p>
                  <p className="mt-2 text-black/80">{variation.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-9 gap-y-20 sm:grid-cols-3 sm:items-start sm:gap-x-6 lg:gap-x-6 xl:gap-x-8">
            {[slots[34], slots[35], slots[33]].map((slot, index) => (
              <div key={slot.slotNumber} className={`${index === 1 ? "sm:pt-20" : ""} ${index === 2 ? "col-span-2 justify-self-center sm:col-span-1" : ""}`}>
                <PhoneVideo slot={slot} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-black/10 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-295 grid-cols-1 items-center gap-16 lg:grid-cols-[360px_1fr]">
          <div className="hidden lg:block">
            <PhoneVideo slot={slots[37]} tall />
          </div>
          <div className="text-center">
            <Image
              src="/logo.png"
              alt={`${content.brandName} logo`}
              width={88}
              height={88}
              className="mx-auto mb-8 rounded-full"
            />
            <p className="mb-5 text-xl font-black uppercase tracking-[0.18em]">{content.brandName}</p>
            <h2 className={`${playfair.className} text-4xl font-semibold italic md:text-5xl`}>{content.finalHeadline}</h2>
            <p className="mx-auto mt-8 max-w-180 text-xl leading-snug md:text-3xl">{content.finalText}</p>
            <div className="mt-12 lg:hidden">
              <PhoneVideo slot={slots[37]} tall />
            </div>
            <a className="mt-12 block wrap-break-word text-2xl underline sm:text-3xl md:mt-14 md:text-5xl" href={`mailto:${content.contactEmail}`}>
              {content.contactEmail}
            </a>
            <div className="mt-12 flex flex-wrap justify-center gap-4 text-black/70 md:mt-16 md:gap-6">
              <a className="social-link" href={content.tiktokUrl} aria-label="TikTok">
                <SocialMark type="tiktok" />
              </a>
              <a className="social-link social-link-red" href={content.instagramUrl} aria-label="Instagram">
                <SocialMark type="instagram" />
              </a>
              <a className="social-link" href={content.xUrl} aria-label="X">
                <SocialMark type="x" />
              </a>
              <a className="social-link social-link-red" href={`mailto:${content.contactEmail}`} aria-label="Email">
                <Mail className="size-7 md:size-10" />
              </a>
            </div>
            <p className="mt-16 text-xl md:mt-20 md:text-3xl">
              {content.brandName} | {content.eyebrow} | {content.location}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
