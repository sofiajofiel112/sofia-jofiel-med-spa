import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Menu, ShieldCheck, X } from "lucide-react";

import darkDanBrighteningCreamImage from "@/assets/DarkDan-27.jpg";
import logoAsset from "@/assets/sofia-jofiel-logo.png";

const servicePricing = [
  { category: "Consultation", service: "Consultation", amount: 30000 },
  { category: "Facial Treatment", service: "Deep Cleansing Facial", amount: 60000 },
  { category: "Facial Treatment", service: "Anti-Acne Facial", amount: 60000 },
  { category: "Facial Treatment", service: "HydraFacial", amount: 65000 },
  { category: "Facial Treatment", service: "Carbon Laser Facial", amount: 65000 },
  { category: "Facial Treatment", service: "Dermaplaning", amount: 50000 },
  { category: "Facial Treatment", service: "Signature Facial", amount: 50000 },
  { category: "Facial Treatment", service: "Vajacial (VJAY Facial)", amount: 80000 },
  { category: "Chemical Peel", service: "Salicylic Chemical Peel (Acne/Acne-Prone Skin)", amount: 70000 },
  { category: "Chemical Peel", service: "PRX Peel (Instant Glow)", amount: 180000 },
  { category: "Chemical Peel", service: "Cosmelan Peel", amount: 850000 },
  { category: "Chemical Peel", service: "TCA Peel (Dark Knuckles, Elbows & Knees)", amount: 120000 },
  { category: "Medical Weight Management", service: "semaglutide/tirzepatide 2.5 mg", amount: 750000 },
  { category: "Medical Weight Management", service: "semaglutide/tirzepatide 5 mg", amount: 850000 },
  { category: "Medical Weight Management", service: "semaglutide/tirzepatide 7.5 mg", amount: 1000000 },
  { category: "Medical Weight Management", service: "semaglutide/tirzepatide 10 mg", amount: 1100000 },
  { category: "Medical Weight Management", service: "semaglutide/tirzepatide 12.5 mg", amount: 1200000 },
  { category: "Medical Weight Management", service: "semaglutide/tirzepatide 15 mg", amount: 1300000 },
  { category: "Laser Brow Removal", service: "Laser Brow Removal", amount: 80000 },
  { category: "Laser Brow Removal", service: "Laser Tattoo Removal", amount: 70000 },
  { category: "Sauna", service: "Body Polishing & Sauna", amount: 70000 },
  { category: "Sauna", service: "Full Body Scrubbing", amount: 50000 },
  { category: "IV Infusion & Wellness", service: "Anti-Aging Drip", amount: 50000 },
  { category: "IV Infusion & Wellness", service: "IV Glow Therapy", amount: 60000 },
  { category: "IV Infusion & Wellness", service: "Detox IV", amount: 80000 },
  { category: "IV Infusion & Wellness", service: "NAD Infusion", amount: 80000 },
  { category: "IV Infusion & Wellness", service: "Skinny Drip", amount: 50000 },
  { category: "IV Infusion & Wellness", service: "Vitamin B12 Shot", amount: 35000 },
  { category: "Wellness", service: "O-Shot/ penis shot", amount: 150000 },
  { category: "Microneedling", service: "Vampire Facial (PRP Microneedling)", amount: 180000 },
  { category: "Microneedling", service: "PRX Microneedling", amount: 280000 },
  { category: "Microneedling", service: "Stretch Mark PRP Microneedling", amount: 80000 },
  { category: "Microneedling", service: "PRP Hair Loss Treatment", amount: 150000 },
  { category: "Microneedling", service: "PRP Hair Loss Treatment + Minoxidil", amount: 280000 },
  { category: "Mesotherapy & Skin Boosters", service: "Glow Booster Mesotherapy", amount: 150000 },
  { category: "Mesotherapy & Skin Boosters", service: "Meso Botox", amount: 400000 },
  { category: "Mesotherapy & Skin Boosters", service: "Polynucleotide Under Eye Treatment", amount: 250000 },
  { category: "Mesotherapy & Skin Boosters", service: "Skin Booster/Mesotherapy", amount: 180000 },
  { category: "Botox Treatments", service: "Anti-Wrinkle Botox", amount: 280000 },
  { category: "Botox Treatments", service: "Masseter Botox", amount: 280000 },
  { category: "Botox Treatments", service: "Botox for Hyperhidrosis (Excessive Armpit Sweating)", amount: 280000 },
  { category: "Dermal Fillers", service: "Dermal Filler", amount: 280000 },
  { category: "Dermal Fillers", service: "Labial Filler (3 ml)", amount: 1100000 },
  { category: "Dermal Fillers", service: "Labial Filler (4 ml)", amount: 1300000 },
  { category: "PDO Threads", service: "PDO Mono Threads", amount: 150000 },
  { category: "PDO Threads", service: "PDO Thread Nose Lift", amount: 250000 },
  { category: "PDO Threads", service: "PDO Thread Double Chin Lift", amount: 450000 },
  { category: "PDO Threads", service: "PDO Thread Face Lift", amount: 750000 },
  { category: "Injection Lipolysis & Body Contouring", service: "Injection Lipolysis (Fat Reduction)", amount: 80000 },
  { category: "Injection Lipolysis & Body Contouring", service: "EM Sculpt", amount: 75000 },
  { category: "Injection Lipolysis & Body Contouring", service: "Radio Frequency", amount: 220000 },
  { category: "Laser Treatments", service: "Chin Laser Hair Removal", amount: 60000 },
  { category: "Laser Treatments", service: "Laser Hair Removal (Armpits)", amount: 70000 },
  { category: "Laser Treatments", service: "Laser Hair Removal (VJAY)", amount: 75000 },
  { category: "Laser Treatments", service: "Laser Hair Removal (Full Face)", amount: 95000 },
  { category: "Laser Treatments", service: "Laser Hair Removal (Hollywood)", amount: 110000 },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(value);
}

function categoryId(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

const serviceCategories = [...new Set(servicePricing.map((item) => item.category))];

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services & Price List | Sofia Jofiel" },
      { name: "description", content: "Browse Sofia Jofiel treatment prices and service list for medical aesthetics, laser, wellness, and body contouring." },
    ],
  }),
});

function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="services-header sticky top-0 z-40 border-b border-white/10 bg-[#090806]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[5.25rem] max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Link to="/" aria-label="Sofia Jofiel home" className="shrink-0">
            <img src={logoAsset} alt="Sofia Jofiel Medical Aesthetics & Spa" width={676} height={369} className="h-16 w-auto object-contain sm:h-[4.75rem]" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            <Link to="/" className="services-nav-link">Home</Link>
            <a href="/#treatments" className="services-nav-link">Treatments</a>
            <a href="/#gallery" className="services-nav-link">Gallery</a>
            <a href="/#about" className="services-nav-link">About</a>
            <Link to="/services" aria-current="page" className="services-nav-link services-nav-active">Services &amp; prices</Link>
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <a href="/#contact" className="hidden h-11 items-center gap-2 bg-gold px-5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#111] transition hover:brightness-110 sm:inline-flex">
              Book consultation <ArrowRight size={15} />
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex size-10 items-center justify-center border border-white/15 text-white transition hover:border-gold hover:text-gold lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-[#090806] px-5 py-4 lg:hidden">
            <Link to="/" onClick={() => setMenuOpen(false)} className="services-mobile-link">Home</Link>
            <a href="/#treatments" onClick={() => setMenuOpen(false)} className="services-mobile-link">Treatments</a>
            <a href="/#gallery" onClick={() => setMenuOpen(false)} className="services-mobile-link">Gallery</a>
            <a href="/#about" onClick={() => setMenuOpen(false)} className="services-mobile-link">About</a>
            <Link to="/services" onClick={() => setMenuOpen(false)} className="services-mobile-link text-gold">Services &amp; prices</Link>
            <a href="/#contact" onClick={() => setMenuOpen(false)} className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 bg-gold text-xs font-semibold uppercase tracking-[0.12em] text-[#111]">Book consultation <ArrowRight size={15} /></a>
          </nav>
        )}
      </header>

      <section className="services-hero relative isolate overflow-hidden border-b border-white/10">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:py-24">
          <div className="relative z-10 max-w-3xl">
            <p className="section-label">Considered care, clear pricing</p>
            <h1 className="mt-7 font-display text-5xl font-normal leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
              Find the care<br /><em className="font-normal text-gold">that feels right.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Explore clinician-led aesthetics, skin and wellness services. Every treatment starts with a thoughtful consultation tailored to your goals.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#treatment-prices" className="inline-flex h-12 items-center gap-3 bg-gold px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#111] transition hover:brightness-110">
                Explore pricing <ArrowRight size={16} />
              </a>
              <a href="/#contact" className="inline-flex h-12 items-center border border-white/20 px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-gold hover:text-gold">
                Talk to our team
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-white/60">
              <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-gold" /> Clinician-led</span>
              <span className="flex items-center gap-2"><Clock3 size={15} className="text-gold" /> Personalised plans</span>
            </div>
          </div>
          <div className="services-hero-image relative mx-auto w-full max-w-sm">
            <img src={darkDanBrighteningCreamImage} alt="Sofia Jofiel brightening ceramide cream" width={2025} height={2700} className="relative z-10 aspect-[3/4] w-full object-cover" />
            <div className="services-image-caption absolute -bottom-4 -left-4 z-20 max-w-[15rem] border border-gold/35 bg-[#14110c]/95 p-4 sm:-left-8">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-gold">The Sofia Jofiel standard</p>
              <p className="mt-2 font-display text-xl">Expertise, with a personal touch.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="treatment-prices" className="scroll-mt-24 px-4 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-col gap-7 border-b border-white/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label">The treatment menu</p>
              <h2 className="mt-4 font-display text-4xl font-normal sm:text-6xl">Services &amp; pricing</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-white/60">Prices are listed in Nigerian Naira. Select a category below to find the service you have in mind.</p>
          </div>

          <nav aria-label="Treatment categories" className="services-category-nav mt-7 flex gap-2 overflow-x-auto pb-3">
            {serviceCategories.map((category) => (
              <a key={category} href={`#${categoryId(category)}`} className="services-category-chip">{category}</a>
            ))}
          </nav>

          <div className="service-price-menu mt-8 space-y-5">
            {serviceCategories.map((category) => (
              <section key={category} id={categoryId(category)} className="service-category scroll-mt-32">
                <h3 className="service-category-title">{category}</h3>
                <div className="service-category-list">
                  {servicePricing.filter((item) => item.category === category).map((item) => (
                    <div key={item.service} className="service-price-row">
                      <span>{item.service}</span>
                      <span className="service-price">₦{formatPrice(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="services-details border-y border-white/10 bg-[#11100d] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-10 max-w-2xl">
            <p className="section-label">Before your visit</p>
            <h2 className="mt-4 font-display text-4xl font-normal sm:text-5xl">A little more to know.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="services-detail-card">
              <span className="services-detail-icon"><Clock3 size={20} /></span>
              <div>
                <h3 className="font-display text-2xl">Operating hours</h3>
                <p className="mt-2 text-sm text-white/55">We’re here to help you find a time that works.</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-white/60">Monday – Saturday</dt><dd className="text-right">10:00 AM – 6:00 PM</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-white/60">Sunday (Corporate Day)</dt><dd className="text-right">2:00 PM – 5:00 PM</dd></div>
                </dl>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-gold">Open 7 days a week</p>
              </div>
            </article>
            <article className="services-detail-card">
              <span className="services-detail-icon"><ShieldCheck size={20} /></span>
              <div>
                <h3 className="font-display text-2xl">Staff discount policy</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  All permanent employees of Sofia Jofiel Med Spa are entitled to a 10% discount on spa services. The discount is non-transferable, subject to management approval, and may not be combined with other promotional offers. Treatments must be scheduled outside peak business hours where practicable.
                </p>
              </div>
            </article>
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-6 text-white/55">Not sure where to start? Our team can help you choose a treatment that suits your goals.</p>
            <Link to="/" hash="contact" className="inline-flex h-12 shrink-0 items-center gap-3 bg-gold px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#111] shadow-[0_0_24px_rgba(201,170,85,0.18)] transition hover:brightness-110">
              Book a consultation <CalendarDays size={17} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="services-footer border-t border-white/10 px-5 py-7 text-center text-xs text-white/45 sm:px-8">
        <p>© 2026 Sofia Jofiel Medical Aesthetics &amp; Spa <span className="mx-2 text-gold">·</span> Thoughtful care, made personal.</p>
      </footer>
    </main>
  );
}
