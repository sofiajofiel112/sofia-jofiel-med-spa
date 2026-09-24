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
  Sparkles,
  Syringe,
  Target,
  Waves,
  X,
  Zap,
} from "lucide-react";

import logoAsset from "@/assets/sofia-jofiel-logo.png";
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
  { name: "Skin Consultation", description: "A comprehensive skin analysis and bespoke treatment roadmap.", icon: CircleUserRound },
  { name: "Botox Treatments", description: "Subtle, precision-led treatments for a refreshed, natural expression.", icon: Syringe },
  { name: "Dermal Fillers", description: "Artful facial balancing to restore structure, volume, and harmony.", icon: Droplets },
  { name: "Medical-Grade Facials", description: "Results-driven rituals tailored to your skin's changing needs.", icon: Sparkles },
  { name: "Laser Treatment", description: "Advanced light technology for clarity, tone, and lasting smoothness.", icon: Zap },
  { name: "Body Sculpting & Treatment", description: "Non-invasive contouring designed around your individual goals.", icon: Waves },
  { name: "IV Infusion Therapy", description: "Clinician-led hydration and nutrient support for renewed vitality.", icon: Activity },
  { name: "Weight Management", description: "A considered, medically supported path to sustainable wellbeing.", icon: Target },
];

const pillars = [
  { number: "01", title: "Expert Clinical Practitioners", text: "Our experienced clinicians combine medical precision with an artist's eye for beautifully subtle results.", icon: ShieldCheck },
  { number: "02", title: "State-of-the-Art Technology", text: "We invest in proven, advanced technologies selected for safety, comfort, and exceptional outcomes.", icon: Microscope },
  { number: "03", title: "Tailored Client Care", text: "Every treatment begins with listening. Your plan is designed around you, never a passing trend.", icon: Leaf },
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
    ? { width: "calc(16rem * 0.9 * 0.9)", height: "auto" }
    : { width: "auto", height: "calc(3.5rem * 1.188 * 1.1)" };

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
    const date = (form.querySelector('#date') as HTMLInputElement)?.value || "";
    const time = preferredTime || "";

    const message = [
      'New consultation request',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Treatment: ${treatment}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
    ].join('%0A');
    const waNumber = '2349111871264';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with prefilled message, then show success state
    window.open(waUrl, '_blank');
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
                  <div className="space-y-2"><Label htmlFor="date">Preferred date</Label><Input id="date" type="date" required className="h-11 rounded-none" /></div>
                  <div className="space-y-2">
                    <Label>Preferred time</Label>
                    <Select value={preferredTime} onValueChange={setPreferredTime} required>
                      <SelectTrigger className="h-11 rounded-none"><SelectValue placeholder="Select time" /></SelectTrigger>
                      <SelectContent><SelectItem value="morning">Morning</SelectItem><SelectItem value="afternoon">Afternoon</SelectItem><SelectItem value="evening">Evening</SelectItem></SelectContent>
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
            {["Treatments", "About", "Philosophy", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-gold">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={() => openBooking()} className="hidden h-11 rounded-none px-6 text-xs uppercase sm:inline-flex">Book consultation</Button>
            <Button variant="ghost" size="icon" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-6 lg:hidden">{["Treatments", "About", "Philosophy", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-4 font-display text-2xl">{item}</a>)}<Button onClick={() => openBooking()} className="mt-6 h-12 w-full rounded-none">Book consultation</Button></nav>}
      </header>

      <section className="relative min-h-[calc(100svh-5rem)] border-b border-border lg:min-h-[calc(100vh-5rem)]">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[90rem] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10 flex items-center px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
            <div className="max-w-3xl">
              <div className="motion-reveal flex items-center gap-3 text-xs font-semibold uppercase text-gold"><span className="h-px w-10 bg-gold" /> Advanced aesthetics · Personalised care</div>
               <h1 className="motion-reveal mt-8 max-w-3xl font-display text-[clamp(3.7rem,6.7vw,7.2rem)] font-normal leading-[0.9]">Sofia Jofiel</h1>
               <p className="motion-reveal mt-5 max-w-3xl font-display text-3xl leading-tight text-foreground sm:text-5xl">Elevate your <em className="font-normal text-gold">natural beauty</em> with clinical excellence.</p>
               <p className="motion-reveal mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">Bespoke aesthetic and wellness treatments where medical expertise meets thoughtful, understated luxury.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-13 rounded-none px-7 text-xs uppercase"><a href="#treatments">Explore treatments <ArrowRight /></a></Button>
                <Button variant="outline" onClick={() => setConciergeOpen(true)} className="h-13 rounded-none border-foreground/25 px-7 text-xs uppercase"><MessageCircle /> Direct support booking</Button>
              </div>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-[0.68rem] font-semibold uppercase text-muted-foreground">
                <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-gold" /> Clinician led</span><span className="flex items-center gap-2"><Sparkles className="size-4 text-gold" /> Natural results</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold" /> Private care</span>
              </div>
            </div>
          </div>
          <div className="hero-visual relative min-h-[48rem] overflow-hidden lg:min-h-0">
             <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80" alt="Nigerian woman in a serene luxury spa treatment room" width={1200} height={1600} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-foreground/45 to-transparent p-7 text-primary-foreground sm:p-10">
              <p className="max-w-xs font-display text-2xl">Quiet luxury.<br />Confident care.</p><p className="text-right text-[0.65rem] uppercase leading-5">Private rooms<br />Thoughtful details</p>
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
              return <article key={item.name} className="treatment-card group relative border-b border-border px-5 py-9 sm:border-r sm:px-7 lg:min-h-[22rem] lg:px-8 lg:py-10">
                <div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center border border-gold/40 text-gold"><Icon className="size-5" strokeWidth={1.5} /></span><span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span></div>
                <h3 className="mt-10 font-display text-2xl leading-tight">{item.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
                <Button variant="link" onClick={() => openBooking(item.name)} className="mt-7 h-auto p-0 text-xs uppercase text-foreground no-underline">Inquire / Book <ChevronRight className="transition-transform group-hover:translate-x-1" /></Button>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-sage py-24 lg:py-0">
        <div className="mx-auto grid max-w-[90rem] lg:grid-cols-2">
           <div className="hero-visual relative min-h-[34rem] lg:min-h-[52rem]"><img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80" alt="African beauty consultant speaking with a client in a boutique clinic" width={1200} height={912} loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute bottom-6 left-6 border border-primary-foreground/30 bg-foreground/75 px-5 py-4 text-primary-foreground backdrop-blur-sm"><p className="text-[0.65rem] uppercase">The Sofia Jofiel standard</p><p className="mt-1 font-display text-xl">Subtle. Personal. Assured.</p></div></div>
          <div id="philosophy" className="scroll-mt-20 px-5 py-20 sm:px-12 lg:flex lg:flex-col lg:justify-center lg:px-20">
            <p className="section-label">Our philosophy</p><h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.04] sm:text-6xl">The science of beauty, guided by <em className="font-normal text-gold">care.</em></h2><p className="mt-7 max-w-xl text-base leading-8 text-sage-foreground/75">We believe aesthetic medicine is at its best when expertise, restraint, and genuine human connection come together.</p>
            <div className="mt-12 divide-y divide-sage-foreground/15 border-y border-sage-foreground/15">
              {pillars.map((pillar) => { const Icon = pillar.icon; return <div key={pillar.title} className="grid grid-cols-[auto_1fr] gap-5 py-7 sm:grid-cols-[auto_1fr_auto]"><span className="mt-1 text-xs text-gold">{pillar.number}</span><div><h3 className="font-display text-2xl">{pillar.title}</h3><p className="mt-2 max-w-lg text-sm leading-7 text-sage-foreground/70">{pillar.text}</p></div><Icon className="hidden size-6 text-gold sm:block" strokeWidth={1.4} /></div>; })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 text-center sm:px-10 lg:py-36"><p className="section-label">Begin your journey</p><h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">A more confident you,<br /><em className="font-normal text-gold">beautifully considered.</em></h2><p className="mx-auto mt-6 max-w-xl leading-8 text-muted-foreground">Meet with an AURA practitioner to explore the right treatment path for your goals.</p><Button onClick={() => openBooking()} className="mt-9 h-13 rounded-none px-8 text-xs uppercase">Book your consultation <CalendarDays /></Button></section>

      <footer id="contact" className="scroll-mt-20 bg-foreground px-5 py-16 text-primary-foreground sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-primary-foreground/15 pb-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr]">
             <div><BrandLogo className="max-w-full" footer /><p className="mt-7 max-w-sm text-sm leading-7 text-primary-foreground/60">Elevated aesthetic medicine, grounded in expertise and made personal to you.</p><div className="mt-7 flex gap-2"><Button asChild variant="outline" size="icon" aria-label="Instagram" className="rounded-none border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="https://instagram.com/sofiajofiel.spa" target="_blank" rel="noreferrer"><Instagram /></a></Button><Button asChild variant="outline" size="icon" aria-label="TikTok" className="rounded-none border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="https://www.tiktok.com/@sofiajofiel.spa" target="_blank" rel="noreferrer"><TikTokIcon /></a></Button></div></div>
            <div>
              <h3 className="footer-title">Visit us</h3>
              <div className="mt-2 text-sm leading-6 text-primary-foreground/60">
                {clinicLocations.map((location) => <div key={location.name} className=""><strong className="font-semibold text-primary-foreground">{location.name}</strong><div className="mt-2">{location.address}</div></div>)}
              </div>
            </div>
            <div>
              <h3 className="footer-title">Opening hours</h3>
              <div className="mt-5 text-sm text-primary-foreground/60">
                <div className="grid grid-cols-[auto_auto] items-start gap-x-1 gap-y-2">
                  <div>Mon — Fri</div><div>9 — 7</div>
                  <div>Saturday</div><div>9 — 5</div>
                  <div>Sunday</div><div>Closed</div>
                </div>
              </div>
            </div>
             <div><h3 className="footer-title">Contact</h3><div className="mt-5 space-y-3 break-words text-sm text-primary-foreground/60"><a href="tel:+2349111871264" className="flex items-center gap-3 hover:text-gold"><Phone className="size-4 shrink-0" /> Call Us Now</a><a href="mailto:booking@sofiajofielmedspa.com" className="flex items-center gap-3 hover:text-gold"><Mail className="size-4 shrink-0" /> booking@sofiajofielmedspa.com</a><a href="mailto:Info@sofiajofielmedspa.com" className="flex items-center gap-3 hover:text-gold"><Mail className="size-4 shrink-0" /> Info@sofiajofielmedspa.com</a><a href="mailto:Support@sofiajofielmedspa.com" className="flex items-center gap-3 hover:text-gold"><Mail className="size-4 shrink-0" /> Support@sofiajofielmedspa.com</a></div></div>
          </div>
           <div className="flex flex-col gap-3 pt-7 text-[0.65rem] uppercase text-primary-foreground/40 sm:flex-row sm:justify-between"><p>© 2026 Sofia Jofiel Medical Aesthetics &amp; Spa</p><p>Privacy · Terms · Clinical standards</p></div>
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
            <Button variant="outline" asChild className="h-14 w-full justify-between rounded-none px-5"><a href="mailto:booking@sofiajofielmedspa.com">Email bookings <Mail /></a></Button>
            <p className="pt-2 text-center text-xs text-muted-foreground">Concierge hours: Monday — Saturday, 9am — 6pm</p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}