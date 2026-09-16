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

import treatmentRoom from "@/assets/aura-treatment-room.jpg";
import consultationImage from "@/assets/aura-consultation.jpg";
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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AURA Medical Aesthetics & Spa" },
      { name: "description", content: "Bespoke medical aesthetics, skin treatments, and wellness care delivered with clinical excellence at AURA." },
      { property: "og:title", content: "AURA Medical Aesthetics & Spa" },
      { property: "og:description", content: "Elevate your natural beauty with considered, clinician-led aesthetic care." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function BrandMark() {
  return (
    <a href="#top" aria-label="AURA home" className="group flex items-center gap-3">
      <span className="font-display text-[1.55rem] leading-none tracking-[0.18em] text-foreground">AURA</span>
      <span className="h-8 w-px bg-gold/50" />
      <span className="hidden max-w-24 text-[0.57rem] font-medium uppercase leading-[1.35] tracking-[0.16em] text-muted-foreground sm:block">Medical Aesthetics &amp; Spa</span>
    </a>
  );
}

function BookingDialog({ open, onOpenChange, defaultTreatment = "" }: { open: boolean; onOpenChange: (open: boolean) => void; defaultTreatment?: string }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [treatment, setTreatment] = useState(defaultTreatment);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) window.setTimeout(() => setStep("form"), 200);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep("success");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-gold/25 bg-background p-0 shadow-luxury sm:max-w-2xl sm:rounded-none">
        {step === "success" ? (
          <div className="px-7 py-16 text-center sm:px-14">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-sage text-sage-foreground"><Check className="size-6" /></div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Request received</p>
            <DialogTitle className="mt-3 font-display text-4xl font-normal leading-tight">Your consultation journey begins here.</DialogTitle>
            <DialogDescription className="mx-auto mt-4 max-w-md text-sm leading-7">Our concierge will contact you shortly to confirm your preferred appointment and answer any questions.</DialogDescription>
            <Button className="mt-8 h-12 rounded-none px-8 uppercase tracking-[0.12em]" onClick={() => handleOpenChange(false)}>Return to AURA</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-[0.72fr_1.28fr]">
            <div className="hidden bg-sage p-8 md:flex md:flex-col md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Private consultation</p>
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Book your visit</p>
                <DialogTitle className="font-display text-3xl font-normal">Request a consultation</DialogTitle>
                <DialogDescription>Share your preferences and our concierge will confirm the details with you.</DialogDescription>
              </DialogHeader>
              <div className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" required placeholder="Your name" className="h-11 rounded-none" /></div>
                  <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" required placeholder="(555) 000-0000" className="h-11 rounded-none" /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" required placeholder="you@example.com" className="h-11 rounded-none" /></div>
                <div className="space-y-2">
                  <Label>Treatment interest</Label>
                  <Select value={treatment} onValueChange={setTreatment} required>
                    <SelectTrigger className="h-11 rounded-none"><SelectValue placeholder="Choose a treatment" /></SelectTrigger>
                    <SelectContent>{treatments.map((item) => <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="date">Preferred date</Label><Input id="date" type="date" required className="h-11 rounded-none" /></div>
                  <div className="space-y-2">
                    <Label>Preferred time</Label>
                    <Select required><SelectTrigger className="h-11 rounded-none"><SelectValue placeholder="Select time" /></SelectTrigger><SelectContent><SelectItem value="morning">Morning</SelectItem><SelectItem value="afternoon">Afternoon</SelectItem><SelectItem value="evening">Evening</SelectItem></SelectContent></Select>
                  </div>
                </div>
                <Button type="submit" className="h-12 w-full rounded-none uppercase tracking-[0.14em]">Request appointment <ArrowRight /></Button>
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
            {["Treatments", "About", "Philosophy", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-gold">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={() => openBooking()} className="hidden h-11 rounded-none px-6 text-xs uppercase tracking-[0.13em] sm:inline-flex">Book consultation</Button>
            <Button variant="ghost" size="icon" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-6 lg:hidden">{["Treatments", "About", "Philosophy", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-4 font-display text-2xl">{item}</a>)}<Button onClick={() => openBooking()} className="mt-6 h-12 w-full rounded-none">Book consultation</Button></nav>}
      </header>

      <section className="relative min-h-[calc(100svh-5rem)] border-b border-border lg:min-h-[calc(100vh-5rem)]">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[90rem] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10 flex items-center px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold"><span className="h-px w-10 bg-gold" /> Advanced aesthetics · Personalised care</div>
              <h1 className="mt-8 max-w-3xl font-display text-[clamp(3.7rem,6.7vw,7.2rem)] font-normal leading-[0.9]">Elevate your <em className="font-normal text-gold">natural beauty</em> with clinical excellence.</h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">Bespoke aesthetic and wellness treatments where medical expertise meets thoughtful, understated luxury.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-13 rounded-none px-7 text-xs uppercase tracking-[0.14em]"><a href="#treatments">Explore treatments <ArrowRight /></a></Button>
                <Button variant="outline" onClick={() => setConciergeOpen(true)} className="h-13 rounded-none border-foreground/25 px-7 text-xs uppercase tracking-[0.12em]"><MessageCircle /> Direct support booking</Button>
              </div>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-gold" /> Clinician led</span><span className="flex items-center gap-2"><Sparkles className="size-4 text-gold" /> Natural results</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold" /> Private care</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[48rem] overflow-hidden lg:min-h-0">
            <img src={treatmentRoom} alt="Serene AURA medical spa treatment room" width={1200} height={1600} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-foreground/45 to-transparent p-7 text-primary-foreground sm:p-10">
              <p className="max-w-xs font-display text-2xl">Quiet luxury.<br />Confident care.</p><p className="text-right text-[0.65rem] uppercase leading-5 tracking-[0.17em]">Private rooms<br />Thoughtful details</p>
            </div>
          </div>
        </div>
      </section>

      <section id="treatments" className="scroll-mt-24 px-5 py-24 sm:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><p className="section-label">Our expertise</p><h2 className="mt-4 font-display text-5xl sm:text-6xl">Treatments, <em className="font-normal text-gold">refined.</em></h2></div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground lg:justify-self-end">Every service begins with a considered consultation and a clear, personalised plan—because the most beautiful results should always feel like you.</p>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4">
            {treatments.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.name} className="treatment-card group relative border-b border-border px-5 py-9 sm:border-r sm:px-7 lg:min-h-[22rem] lg:px-8 lg:py-10">
                <div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center border border-gold/40 text-gold"><Icon className="size-5" strokeWidth={1.5} /></span><span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span></div>
                <h3 className="mt-10 font-display text-2xl leading-tight">{item.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
                <Button variant="link" onClick={() => openBooking(item.name)} className="mt-7 h-auto p-0 text-xs uppercase tracking-[0.14em] text-foreground no-underline">Inquire / Book <ChevronRight className="transition-transform group-hover:translate-x-1" /></Button>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-sage py-24 lg:py-0">
        <div className="mx-auto grid max-w-[90rem] lg:grid-cols-2">
          <div className="relative min-h-[34rem] lg:min-h-[52rem]"><img src={consultationImage} alt="AURA clinician offering a personalised aesthetic consultation" width={1200} height={912} loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute bottom-6 left-6 border border-primary-foreground/30 bg-foreground/75 px-5 py-4 text-primary-foreground backdrop-blur-sm"><p className="text-[0.65rem] uppercase tracking-[0.16em]">The AURA standard</p><p className="mt-1 font-display text-xl">Subtle. Personal. Assured.</p></div></div>
          <div id="philosophy" className="scroll-mt-20 px-5 py-20 sm:px-12 lg:flex lg:flex-col lg:justify-center lg:px-20">
            <p className="section-label">Our philosophy</p><h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.04] sm:text-6xl">The science of beauty, guided by <em className="font-normal text-gold">care.</em></h2><p className="mt-7 max-w-xl text-base leading-8 text-sage-foreground/75">We believe aesthetic medicine is at its best when expertise, restraint, and genuine human connection come together.</p>
            <div className="mt-12 divide-y divide-sage-foreground/15 border-y border-sage-foreground/15">
              {pillars.map((pillar) => { const Icon = pillar.icon; return <div key={pillar.title} className="grid grid-cols-[auto_1fr] gap-5 py-7 sm:grid-cols-[auto_1fr_auto]"><span className="mt-1 text-xs text-gold">{pillar.number}</span><div><h3 className="font-display text-2xl">{pillar.title}</h3><p className="mt-2 max-w-lg text-sm leading-7 text-sage-foreground/70">{pillar.text}</p></div><Icon className="hidden size-6 text-gold sm:block" strokeWidth={1.4} /></div>; })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 text-center sm:px-10 lg:py-36"><p className="section-label">Begin your journey</p><h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">A more confident you,<br /><em className="font-normal text-gold">beautifully considered.</em></h2><p className="mx-auto mt-6 max-w-xl leading-8 text-muted-foreground">Meet with an AURA practitioner to explore the right treatment path for your goals.</p><Button onClick={() => openBooking()} className="mt-9 h-13 rounded-none px-8 text-xs uppercase tracking-[0.14em]">Book your consultation <CalendarDays /></Button></section>

      <footer id="contact" className="scroll-mt-20 bg-foreground px-5 py-16 text-primary-foreground sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-primary-foreground/15 pb-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr]">
            <div><div className="flex items-center gap-3"><span className="font-display text-3xl tracking-[0.18em]">AURA</span><span className="h-9 w-px bg-gold" /><span className="text-[0.58rem] uppercase leading-4 tracking-[0.16em] text-primary-foreground/60">Medical Aesthetics<br />&amp; Spa</span></div><p className="mt-7 max-w-sm text-sm leading-7 text-primary-foreground/60">Elevated aesthetic medicine, grounded in expertise and made personal to you.</p><div className="mt-7 flex gap-2"><Button variant="outline" size="icon" aria-label="Instagram" className="rounded-none border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Instagram /></Button><Button variant="outline" size="icon" aria-label="Facebook" className="rounded-none border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Facebook /></Button></div></div>
            <div><h3 className="footer-title">Visit us</h3><div className="mt-5 space-y-5 text-sm leading-6 text-primary-foreground/60"><p className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-gold" /> Downtown Clinic<br />125 Aura Avenue</p><p className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-gold" /> Westside Studio<br />48 Willow Lane</p></div></div>
            <div><h3 className="footer-title">Opening hours</h3><div className="mt-5 space-y-2 text-sm text-primary-foreground/60"><p className="flex justify-between gap-5"><span>Mon–Fri</span><span>9–7</span></p><p className="flex justify-between gap-5"><span>Saturday</span><span>9–5</span></p><p className="flex justify-between gap-5"><span>Sunday</span><span>Closed</span></p></div></div>
            <div><h3 className="footer-title">Contact</h3><div className="mt-5 space-y-3 text-sm text-primary-foreground/60"><a href="tel:+15550128722" className="flex items-center gap-3 hover:text-gold"><Phone className="size-4" /> (555) 012-8722</a><a href="mailto:hello@auramedspa.com" className="flex items-center gap-3 hover:text-gold"><Mail className="size-4" /> Email concierge</a></div></div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-[0.65rem] uppercase tracking-[0.14em] text-primary-foreground/40 sm:flex-row sm:justify-between"><p>© 2026 AURA Medical Aesthetics &amp; Spa</p><p>Privacy · Terms · Clinical standards</p></div>
        </div>
      </footer>

      <Button aria-label="Instant booking and support" onClick={() => setConciergeOpen(true)} className="fixed bottom-5 right-5 z-30 h-14 rounded-full px-5 shadow-luxury sm:bottom-7 sm:right-7"><MessageCircle className="size-5" /><span className="hidden text-xs uppercase tracking-[0.1em] sm:inline">Instant booking &amp; support</span></Button>

      <BookingDialog key={selectedTreatment || "general"} open={bookingOpen} onOpenChange={setBookingOpen} defaultTreatment={selectedTreatment} />
      <Dialog open={conciergeOpen} onOpenChange={setConciergeOpen}>
        <DialogContent className="border-gold/25 p-8 shadow-luxury sm:max-w-md sm:rounded-none">
          <DialogHeader><div className="flex size-11 items-center justify-center rounded-full bg-sage text-sage-foreground"><MessageCircle className="size-5" /></div><DialogTitle className="pt-4 font-display text-3xl font-normal">How may we help?</DialogTitle><DialogDescription>Choose the easiest way to connect with your AURA concierge.</DialogDescription></DialogHeader>
          <div className="mt-3 space-y-3"><Button onClick={() => openBooking()} className="h-14 w-full justify-between rounded-none px-5">Request a consultation <CalendarDays /></Button><Button variant="outline" asChild className="h-14 w-full justify-between rounded-none px-5"><a href="https://wa.me/15550128722" target="_blank" rel="noreferrer">Message on WhatsApp <Send /></a></Button><p className="pt-2 text-center text-xs text-muted-foreground">Concierge hours: Monday–Saturday, 9am–6pm</p></div>
        </DialogContent>
      </Dialog>
    </main>
  );
}