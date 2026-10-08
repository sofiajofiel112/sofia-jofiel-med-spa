import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Droplets,
  Facebook,
  Flower2,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Send,
  ShieldCheck,
  Syringe,
  Target,
  Waves,
  X,
  Zap,
} from "lucide-react";

import botoxImage from "@/assets/botox.avif";
import consultationImage from "@/assets/aura-consultation.jpg";
import fillerImage from "@/assets/filler.jpeg";
import laserImage from "@/assets/laser.jpg";
import logoAsset from "@/assets/sofia-jofiel-logo.png";
import sculptingImage from "@/assets/sculpting.jpeg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const treatments = [
  { name: "Skin Consultation", description: "Thoughtful, one-to-one evaluation of your skin goals, concerns, and treatment history to build a clear, personalised plan.", icon: CircleUserRound, image: consultationImage },
  { name: "Botox Treatments", description: "Precision-led wrinkle softening that smooths expression lines while preserving the natural movement and character of your face.", icon: Syringe, image: botoxImage },
  { name: "Derma Fillers", description: "Strategic volume restoration and contour refinement to enhance balance, lift, and definition with natural-looking results.", icon: Droplets, image: fillerImage },
  { name: "Medical-Grade Facials", description: "Deeply renewing rituals that target congestion, luminosity, hydration, and long-term skin health.", icon: Flower2, image: "https://images.unsplash.com/photo-1521590832167-7ae74b1fcd05?auto=format&fit=crop&w=900&q=80" },
  { name: "Laser Treatment", description: "Targeted light therapies designed to clarify tone, refine texture, and reduce visible imperfections with minimal downtime.", icon: Zap, image: laserImage },
  { name: "Body Sculpting & Treatment", description: "Non-surgical contouring and tone-focused treatments tailored to sculpt, firm, and redefine your silhouette.", icon: Waves, image: sculptingImage },
  { name: "IV Infusion Therapy", description: "Clinician-guided hydration and nutrient support to restore energy, optimise recovery, and support everyday wellbeing.", icon: Activity, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80" },
  { name: "Weight Management", description: "A medically informed, sustainable approach to metabolism, energy, and healthy lifestyle changes that last.", icon: Target, image: "https://images.unsplash.com/photo-1541534401786-8ac06c4d1d6c?auto=format&fit=crop&w=900&q=80" },
];

const pillars = [
  { number: "01", title: "Expert Clinical Practitioners", text: "Our experienced clinicians combine medical precision with an artist's eye for beautifully subtle results.", icon: ShieldCheck },
  { number: "02", title: "State-of-the-Art Technology", text: "We invest in proven, advanced technologies selected for safety, comfort, and exceptional outcomes.", icon: Microscope },
  { number: "03", title: "Tailored Client Care", text: "Every treatment begins with listening. Your plan is designed around you, never a passing trend.", icon: Leaf },
];

const galleryHighlights = [
  {
    label: "Skin rituals",
    title: "Calm, clinical, and deeply restorative.",
    description: "Medical-grade facials and skin correction plans that leave you refreshed, supported, and visibly brighter.",
    image: "https://images.unsplash.com/photo-1521590832167-7ae74b1fcd05?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Confidence-first aesthetics",
    title: "Natural balance, beautifully refined.",
    description: "Subtle treatments designed to restore harmony, soften lines, and enhance what is already beautifully yours.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Wellness-led care",
    title: "A softer, more radiant everyday glow.",
    description: "From hydration support to tailored wellness rituals, our approach keeps your skin and wellbeing in sync.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Private clinic feel",
    title: "Luxury details that put you at ease.",
    description: "An intimate environment, thoughtful service, and expert guidance from consultation through aftercare.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
];

const clinicLocations = [
  { name: "Our Office", address: "Suite 4 & 5, Ojaja Mall, Ogombo Road, Abraham Adesanya, Ajah, Lagos State." },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
    { title: "Sofia Jofiel Medical Aesthetics & Spa" },
    { name: "description", content: "Bespoke medical aesthetics, skin treatments, and wellness care at Sofia Jofiel's clinic in Lagos." },
      { property: "og:title", content: "Sofia Jofiel Medical Aesthetics & Spa" },
      { property: "og:description", content: "Elevate your natural beauty with considered, clinician-led aesthetic care in Lagos." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function BrandLogo({ className = "", footer = false }: { className?: string; footer?: boolean }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex items-center ${className}`}>
        <span className={footer ? "font-display text-2xl tracking-tight text-primary-foreground" : "font-display text-2xl tracking-tight text-foreground sm:text-3xl"}>
          Sofia Jofiel
        </span>
      </div>
    );
  }

  const style = footer
    ? { width: "calc(16rem * 0.9 * 0.9 * 1.21)", height: "auto" }
    : { width: "auto", height: "calc(3.5rem * 1.188 * 1.1 * 1.1 * 1.1 * 1.1)" };

  return (
    <img
      src={logoAsset}
      alt="Sofia Jofiel"
      width={738}
      height={296}
      onError={() => setHasError(true)}
      className={className || "w-auto"}
      style={{ ...style, ...((className ? {} : {})) }}
    />
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M14.65 3.5c.43 1.53 1.55 2.77 3.2 3.17v2.52a5.86 5.86 0 0 1-3.2-1.04v7.92a5.14 5.14 0 1 1-5.14-5.14c.25 0 .5.02.74.07v2.68c-.22-.04-.45-.06-.69-.06A2.41 2.41 0 1 0 11.8 18.6V3.5h2.85Z" />
      <path d="M14.65 3.5c.43 1.53 1.55 2.77 3.2 3.17v2.52a5.86 5.86 0 0 1-3.2-1.04v7.92a5.14 5.14 0 1 1-5.14-5.14c.25 0 .5.02.74.07v2.68c-.22-.04-.45-.06-.69-.06A2.41 2.41 0 1 0 11.8 18.6V3.5h2.85Z" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function BrandMark() {
  return (
    <a href="#top" aria-label="Sofia Jofiel home" className="flex items-center">
      <BrandLogo className="h-auto w-auto" />
    </a>
  );
}

function BookingDialog({ open, onOpenChange, defaultTreatment = "" }: { open: boolean; onOpenChange: (open: boolean) => void; defaultTreatment?: string }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [treatment, setTreatment] = useState(defaultTreatment);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) window.setTimeout(() => setStep("form"), 200);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const name = (form.querySelector('#name') as HTMLInputElement)?.value || "";
    const phone = (form.querySelector('#phone') as HTMLInputElement)?.value || "";
    const email = (form.querySelector('#email') as HTMLInputElement)?.value || "";
    const date = preferredDate || "";
    const time = preferredTime || "";

    const subject = encodeURIComponent('New consultation request');
    const body = encodeURIComponent([
      'New consultation request',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Treatment: ${treatment}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
    ].join('\n'));
    const recipient = 'info@sofiajofielmedspa.com';

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setStep("success");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-gold/25 bg-background p-0 shadow-luxury sm:max-w-2xl sm:rounded-none">
        {step === "success" ? (
          <div className="px-7 py-16 text-center sm:px-14">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-sage text-sage-foreground"><Check className="size-6" /></div>
            <p className="mt-8 text-xs font-semibold uppercase text-gold">Request received</p>
            <DialogTitle className="mt-3 font-display text-4xl font-normal leading-tight">Your consultation journey begins here.</DialogTitle>
             <DialogDescription className="mx-auto mt-4 max-w-md text-sm leading-7">Our Sofia Jofiel concierge will contact you shortly to confirm your preferred appointment and answer any questions.</DialogDescription>
             <Button className="mt-8 h-12 rounded-none px-8 uppercase" onClick={() => handleOpenChange(false)}>Return to Sofia Jofiel</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-[0.72fr_1.28fr]">
            <div className="hidden bg-sage p-8 md:flex md:flex-col md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-gold">Private consultation</p>
                <p className="mt-5 font-display text-3xl leading-tight">Care, considered around you.</p>
              </div>
              <div className="space-y-4 text-sm text-sage-foreground/80">
                <p className="flex gap-3"><BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" /> Discreet, no-pressure guidance</p>
                <p className="flex gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-gold" /> 45-minute initial appointment</p>
                <p className="flex gap-3"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" /> Clinician-led treatment planning</p>
              </div>
            </div>
            <form onSubmit={submit} className="p-7 sm:p-10">
              <DialogHeader>
                <p className="text-xs font-semibold uppercase text-gold">Book your visit</p>
                <DialogTitle className="font-display text-3xl font-normal">Request a consultation</DialogTitle>
                <DialogDescription>Share your preferences and our concierge will confirm the details with you.</DialogDescription>
              </DialogHeader>
              <div className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" required placeholder="Your name" className="h-11 rounded-none" /></div>
                  <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" required placeholder="(234) 000-0000" className="h-11 rounded-none" /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" required placeholder="you@example.com" className="h-11 rounded-none" /></div>
                <div className="space-y-2">
                  <Label>Treatment interest</Label>
                  <Select value={treatment} onValueChange={setTreatment} required>
                    <SelectTrigger className="h-11 rounded-none"><SelectValue placeholder="Choose a treatment" /></SelectTrigger>
                    <SelectContent>{treatments.map((item) => <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                {/* Preferred clinic removed; single office */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="date">Preferred date</Label><Input id="date" type="date" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} required className="h-11 rounded-none" /></div>
                  <div className="space-y-2">
                    <Label>Preferred time</Label>
                    <Select value={preferredTime} onValueChange={setPreferredTime} required>
                      <SelectTrigger className="h-11 rounded-none"><SelectValue placeholder="Select time" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00AM">9:00AM</SelectItem>
                        <SelectItem value="11:00AM">11:00AM</SelectItem>
                        <SelectItem value="1:00PM">1:00PM</SelectItem>
                        <SelectItem value="3:00PM">3:00PM</SelectItem>
                        <SelectItem value="4:00PM">4:00PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="h-12 w-full rounded-none uppercase">Request appointment <ArrowRight /></Button>
                <p className="text-center text-[0.68rem] leading-5 text-muted-foreground">By submitting, you agree to be contacted about your consultation request.</p>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");

  function openBooking(treatment = "") {
    setSelectedTreatment(treatment);
    setConciergeOpen(false);
    setBookingOpen(true);
  }

  return (
    <main id="top" className="overflow-x-clip bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 lg:px-10">
          <BrandMark />
          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {["Treatments", "Gallery", "About", "Philosophy", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-gold">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={() => openBooking()} className="hidden h-11 rounded-none px-6 text-xs uppercase sm:inline-flex">Book consultation</Button>
            <Button variant="ghost" size="icon" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-6 lg:hidden">{["Treatments", "Gallery", "About", "Philosophy", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-4 font-display text-2xl">{item}</a>)}<Button onClick={() => openBooking()} className="mt-6 h-12 w-full rounded-none">Book consultation</Button></nav>}
      </header>

      <section className="relative min-h-[calc(100svh-5rem)] border-b border-border lg:min-h-[calc(100vh-5rem)]">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[90rem] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10 flex items-center px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
            <div className="max-w-3xl">
              <div className="motion-reveal flex items-center gap-3 text-xs font-semibold uppercase text-gold"><span className="h-px w-10 bg-gold" /> Advanced aesthetics · Personalised care</div>
               <h1 className="motion-reveal mt-8 max-w-3xl font-display text-[clamp(3.7rem,6.7vw,7.2rem)] font-normal leading-[0.9]">Sofia Jofiel</h1>
               <p className="motion-reveal mt-5 max-w-3xl font-display text-3xl leading-tight text-foreground sm:text-5xl">Elevate your <em className="font-normal text-gold">natural beauty</em> with clinical excellence.</p>
               <p className="motion-reveal mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">Bespoke aesthetic and wellness treatments where medical expertise meets thoughtful, understated luxury. We create plans that feel polished, personal, and entirely aligned with your lifestyle.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-13 rounded-none px-7 text-xs uppercase"><a href="#treatments">Explore treatments <ArrowRight /></a></Button>
                <Button variant="outline" onClick={() => setConciergeOpen(true)} className="h-13 rounded-none border-foreground/25 px-7 text-xs uppercase"><MessageCircle /> Direct support booking</Button>
              </div>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-[0.68rem] font-semibold uppercase text-muted-foreground">
                <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-gold" /> Clinician led</span><span className="flex items-center gap-2"><Leaf className="size-4 text-gold" /> Natural results</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold" /> Private care</span>
              </div>
            </div>
          </div>
          <div className="hero-visual relative min-h-[48rem] overflow-hidden lg:min-h-0">
             <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80" alt="Luxury spa treatment room in a premium med spa" width={1200} height={1600} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-foreground/45 to-transparent p-7 text-primary-foreground sm:p-10">
              <p className="max-w-xs font-display text-2xl">Quiet luxury.<br />Confident care.</p><p className="text-right text-[0.65rem] uppercase leading-5">Private rooms<br />Thoughtful details</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40 px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className=" rounded-none border border-gold/20 bg-background/40 p-8 sm:p-10">
              <p className="section-label">Signature care</p>
              <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.02] sm:text-6xl">Luxury aesthetics, grounded in clinical expertise.</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">Every Sofia Jofiel treatment begins with listening, skin analysis, and a tailored plan that balances visible refinement with natural, confident results.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="border border-border bg-card/80 p-4"><p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold">Consultation</p><p className="mt-3 font-display text-3xl">01</p><p className="mt-2 text-sm leading-6 text-muted-foreground">In-depth assessment and treatment mapping.</p></div>
                <div className="border border-border bg-card/80 p-4"><p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold">Precision</p><p className="mt-3 font-display text-3xl">02</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Clinician-led protocols and safe medical standards.</p></div>
                <div className="border border-border bg-card/80 p-4"><p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold">Aftercare</p><p className="mt-3 font-display text-3xl">03</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Thoughtful guidance for lasting, natural results.</p></div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="min-h-[18rem] overflow-hidden border border-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521590832167-7ae74b1fcd05?auto=format&fit=crop&w=900&q=80')" }} aria-label="Client treatment room" />
              <div className="flex flex-col justify-between border border-border bg-card/80 p-5">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold">Why clients choose us</p>
                  <p className="mt-4 font-display text-3xl leading-tight">Discreet, elevated, reassuring.</p>
                </div>
                <p className="mt-6 text-sm leading-7 text-muted-foreground">From Lagos to your lifestyle, each plan is individually designed to feel calm, credible, and beautifully balanced.</p>
              </div>
              <div className="col-span-full overflow-hidden border border-border bg-card/80 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold">Private clinic experience</p>
                    <p className="mt-3 font-display text-3xl leading-tight">Designed for comfort, confidence, and calm.</p>
                  </div>
                  <div className="h-24 w-full max-w-[18rem] overflow-hidden border border-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80')" }} aria-label="Luxury treatment clinic interior" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="treatments" className="scroll-mt-24 px-5 py-24 sm:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><p className="section-label">Our expertise</p><h2 className="mt-4 font-display text-5xl sm:text-6xl">Treatments, <em className="font-normal text-gold">refined.</em></h2></div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground lg:justify-self-end">Every service begins with a considered consultation and a clear, personalised plan; because the most beautiful results should always feel like you.</p>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4">
            {treatments.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.name} className="treatment-card group relative border-b border-border px-5 py-9 sm:border-r sm:px-7 lg:min-h-[26rem] lg:px-8 lg:py-10" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="mb-5 overflow-hidden border border-border bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')`, height: "12rem" }} aria-label={item.name} />
                <div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center border border-gold/40 text-gold"><Icon className="size-5" strokeWidth={1.5} /></span><span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span></div>
                <h3 className="mt-8 font-display text-2xl leading-tight">{item.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
                <Button variant="link" onClick={() => openBooking(item.name)} className="mt-7 h-auto p-0 text-xs uppercase text-foreground no-underline">Inquire / Book <ChevronRight className="transition-transform group-hover:translate-x-1" /></Button>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[#151515] px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="space-y-6">
              <p className="section-label">Why Sofia Jofiel</p>
              <h2 className="font-display text-5xl leading-[1.02] sm:text-6xl">Clinical confidence, without the clinical coldness.</h2>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">Our clinic blends medical-grade expertise with a warm, considered approach that helps you feel at ease while achieving refined, natural-looking results.</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border border-border bg-card/80 p-4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Private care</p><p className="mt-3 font-display text-4xl">1:1</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Tailored consultations and treatment plans.</p></div>
                <div className="border border-border bg-card/80 p-4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Medical grade</p><p className="mt-3 font-display text-4xl">A+</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Protocols chosen for safety, comfort, and visible polish.</p></div>
                <div className="border border-border bg-card/80 p-4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Luxury feel</p><p className="mt-3 font-display text-4xl">Calm</p><p className="mt-2 text-sm leading-6 text-muted-foreground">An environment designed to feel restorative, not rushed.</p></div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="hero-visual relative min-h-[20rem] overflow-hidden border border-border bg-cover bg-center sm:min-h-[24rem]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521590832167-7ae74b1fcd05?auto=format&fit=crop&w=900&q=80')" }} aria-label="Sofia Jofiel aesthetic treatment" />
              <div className="flex min-h-[20rem] flex-col justify-between border border-border bg-card/80 p-5 sm:min-h-[24rem]">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Signature approach</p>
                  <p className="mt-4 font-display text-3xl leading-tight">Natural-looking refinement with a confident finish.</p>
                </div>
                <p className="mt-6 text-sm leading-7 text-muted-foreground">Whether you are refreshing your glow or correcting balance, every plan is shaped around your face, your features, and your pace.</p>
              </div>
              <div className="sm:col-span-2 overflow-hidden border border-border bg-card/80 p-4 sm:p-5">
                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Designed for modern living</p>
                    <p className="mt-3 font-display text-3xl leading-tight">Thoughtful treatment, real-world results.</p>
                  </div>
                  <div className="h-28 overflow-hidden border border-border bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80')" }} aria-label="Luxury med spa interior" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-20 border-t border-border bg-card/40 px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label">A closer look</p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl">An atmosphere of calm, refinement, and real results.</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground">Our clinic blends a high-touch medical experience with the ease of a luxury wellness retreat, so every appointment feels considered, private, and beautifully reassuring.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {galleryHighlights.map((item) => (
              <article key={item.title} className="overflow-hidden border border-border bg-background">
                <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} aria-label={item.title} />
                <div className="p-5">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">{item.label}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-sage py-24 lg:py-0">
        <div className="mx-auto grid max-w-[90rem] lg:grid-cols-2">
           <div className="hero-visual relative min-h-[34rem] lg:min-h-[52rem]"><img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" alt="Spa massage scene in a premium wellness clinic" width={1200} height={912} loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute bottom-6 left-6 border border-primary-foreground/30 bg-foreground/75 px-5 py-4 text-primary-foreground backdrop-blur-sm"><p className="text-[0.65rem] uppercase">The Sofia Jofiel standard</p><p className="mt-1 font-display text-xl">Subtle. Personal. Assured.</p></div></div>
          <div id="philosophy" className="scroll-mt-20 px-5 py-20 sm:px-12 lg:flex lg:flex-col lg:justify-center lg:px-20">
            <p className="section-label">Our philosophy</p><h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.04] sm:text-6xl">The science of beauty, guided by <em className="font-normal text-gold">care.</em></h2><p className="mt-7 max-w-xl text-base leading-8 text-sage-foreground/75">We believe aesthetic medicine is at its best when expertise, restraint, and genuine human connection come together.</p>
            <div className="mt-12 divide-y divide-sage-foreground/15 border-y border-sage-foreground/15">
              {pillars.map((pillar) => { const Icon = pillar.icon; return <div key={pillar.title} className="grid grid-cols-[auto_1fr] gap-5 py-7 sm:grid-cols-[auto_1fr_auto]"><span className="mt-1 text-xs text-gold">{pillar.number}</span><div><h3 className="font-display text-2xl">{pillar.title}</h3><p className="mt-2 max-w-lg text-sm leading-7 text-sage-foreground/70">{pillar.text}</p></div><Icon className="hidden size-6 text-gold sm:block" strokeWidth={1.4} /></div>; })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 text-center sm:px-10 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,151,78,0.18),transparent_38%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl">
          <p className="section-label">Begin your journey</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">A more confident you,<br /><em className="font-normal text-gold">beautifully considered.</em></h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-muted-foreground">Meet with our clinical team to explore the right treatment path for your goals, your skin, and your lifestyle.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button onClick={() => openBooking()} className="h-13 rounded-none px-8 text-xs uppercase">Book your consultation <CalendarDays /></Button>
            <Button variant="outline" onClick={() => setConciergeOpen(true)} className="h-13 rounded-none border-border bg-transparent px-8 text-xs uppercase">Speak with concierge</Button>
          </div>
          <div className="mt-12 grid gap-4 border-t border-border pt-6 text-left sm:grid-cols-3">
            <div className="rounded-none border border-border bg-card/70 p-4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Private planning</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Bespoke recommendations based on your goals and treatment history.</p></div>
            <div className="rounded-none border border-border bg-card/70 p-4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Clinician-led care</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Medical-grade protocols and luxury-level attention at every step.</p></div>
            <div className="rounded-none border border-border bg-card/70 p-4"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">Lagos-based service</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Thoughtful, discreet care designed around your routine and comfort.</p></div>
          </div>
        </div>
      </section>

      <footer id="contact" className="scroll-mt-20 border-t border-border bg-[#111111] px-5 py-16 text-white sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-primary-foreground/15 pb-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr]">
             <div><BrandLogo className="max-w-full" footer /><p className="mt-7 max-w-sm text-sm leading-7 text-white/70">Elevated aesthetic medicine, grounded in expertise and made personal to you.</p><div className="mt-7 flex gap-2"><Button asChild variant="outline" size="icon" aria-label="Instagram" className="rounded-none border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"><a href="https://instagram.com/sofiajofiel.spa" target="_blank" rel="noreferrer"><Instagram /></a></Button><Button asChild variant="outline" size="icon" aria-label="TikTok" className="rounded-none border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"><a href="https://www.tiktok.com/@sofiajofiel.spa" target="_blank" rel="noreferrer"><TikTokIcon /></a></Button></div></div>
            <div>
              <h3 className="footer-title">Visit us</h3>
              <div className="mt-2 text-sm leading-6 text-white/70">
                {clinicLocations.map((location) => <div key={location.name} className=""><strong className="font-semibold text-white">{location.name}</strong><div className="mt-2">{location.address}</div></div>)}
              </div>
            </div>
            <div>
              <h3 className="footer-title">Opening hours</h3>
              <div className="mt-5 text-sm text-white/70">
                <div className="grid grid-cols-[auto_auto] items-start gap-x-2 gap-y-2">
                  <div>Mon — Fri</div><div>9:00 — 19:00</div>
                  <div>Saturday</div><div>9:00 — 17:00</div>
                  <div>Sunday</div><div>Closed</div>
                </div>
              </div>
            </div>
             <div><h3 className="footer-title">Contact</h3><div className="mt-5 space-y-3 break-words text-sm text-white/70"><a href="tel:+2349111871264" className="flex items-center gap-3 hover:text-gold"><Phone className="size-4 shrink-0" /> Call Us Now</a><a href="mailto:info@sofiajofielmedspa.com" className="flex items-center gap-3 hover:text-gold"><Mail className="size-4 shrink-0" /> info@sofiajofielmedspa.com</a><a href="mailto:Info@sofiajofielmedspa.com" className="flex items-center gap-3 hover:text-gold"><Mail className="size-4 shrink-0" /> Info@sofiajofielmedspa.com</a><a href="mailto:Support@sofiajofielmedspa.com" className="flex items-center gap-3 hover:text-gold"><Mail className="size-4 shrink-0" /> Support@sofiajofielmedspa.com</a></div></div>
          </div>
           <div className="flex flex-col gap-3 pt-7 text-[0.65rem] uppercase text-white/40 sm:flex-row sm:justify-between"><p>© 2026 Sofia Jofiel Medical Aesthetics &amp; Spa</p><p>Privacy · Terms · Clinical standards</p></div>
        </div>
      </footer>

      <Button aria-label="Instant booking and support" onClick={() => setConciergeOpen(true)} className="fixed bottom-5 right-5 z-30 h-14 rounded-full px-5 shadow-luxury sm:bottom-7 sm:right-7"><MessageCircle className="size-5" /><span className="hidden text-xs uppercase sm:inline">Instant booking &amp; support</span></Button>

      <BookingDialog key={selectedTreatment || "general"} open={bookingOpen} onOpenChange={setBookingOpen} defaultTreatment={selectedTreatment} />
      <Dialog open={conciergeOpen} onOpenChange={setConciergeOpen}>
         <DialogContent className="max-h-[92vh] overflow-y-auto border-gold/25 p-8 shadow-luxury sm:max-w-lg sm:rounded-none">
           <DialogHeader><div className="flex size-11 items-center justify-center rounded-full bg-sage text-sage-foreground"><MessageCircle className="size-5" /></div><DialogTitle className="pt-4 font-display text-3xl font-normal">How may we help?</DialogTitle><DialogDescription>Choose the easiest way to connect with your Sofia Jofiel concierge.</DialogDescription></DialogHeader>
          <div className="mt-3 space-y-3">
            <Button onClick={() => openBooking()} className="h-14 w-full justify-between rounded-none px-5">Request a consultation <CalendarDays /></Button>
            <Button variant="outline" asChild className="h-14 w-full justify-between rounded-none px-5"><a href="https://wa.link/axqkwx" target="_blank" rel="noreferrer">Send us a WhatsApp Message <Send /></a></Button>
            <Button variant="outline" asChild className="h-14 w-full justify-between rounded-none px-5"><a href="tel:+2349111871264">Call our concierge <Phone /></a></Button>
            <Button variant="outline" asChild className="h-14 w-full justify-between rounded-none px-5"><a href="mailto:info@sofiajofielmedspa.com">Email bookings <Mail /></a></Button>
            <p className="pt-2 text-center text-xs text-muted-foreground">Concierge hours: Monday — Saturday, 9am — 6pm</p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}