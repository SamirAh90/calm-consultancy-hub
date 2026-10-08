import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, Menu, X, ShieldCheck, ScanLine, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/site-content';
import johan from '@/assets/johan.png.asset.json';

export function Brand() {
  return <Link to="/" className="brand" aria-label="Mind to Safety – startsida"><span className="brand-main">Mind <span>to Safety</span></span><span className="brand-tag">Kunskap. Beredskap. Trygghet.</span></Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = <><Link className="nav-link" to="/" onClick={() => setOpen(false)}>Hem</Link><Link className="nav-link" to="/om-oss" onClick={() => setOpen(false)}>Om oss</Link><Link className="nav-link" to="/tjanster" onClick={() => setOpen(false)}>Utbildningar & insatser</Link><Link className="nav-link" to="/kontakt" onClick={() => setOpen(false)}>Kontakt</Link><Button variant="editorialOutline" className="nav-cta" asChild><Link to="/kontakt" onClick={() => setOpen(false)}>Boka samtal <ArrowRight size={13}/></Link></Button></>;
  return <header className="site-header"><div className="site-width header-inner"><Brand/><nav className="desktop-nav" aria-label="Huvudnavigation">{links}</nav><Button variant="ghost" size="icon" className="mobile-menu-trigger" aria-label={open ? 'Stäng menyn' : 'Öppna menyn'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>{open && <nav className="mobile-nav" aria-label="Mobilnavigation">{links}</nav>}</header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-width footer-inner"><Brand/><span className="footer-note">Förebyggande säkerhet. Långsiktig trygghet.</span><a className="footer-note" href="mailto:info@mindtosafety.com">info@mindtosafety.com</a></div></footer>;
}

export function ContactBand() {
  return <section className="contact-band"><div className="site-width contact-inner"><div><p className="eyebrow">Nästa steg börjar med ett samtal</p><h2 className="section-title">Hur kan vi stärka er trygghet?</h2><p className="body-copy">Hör av er för ett förutsättningslöst samtal om er verksamhet och era behov.</p></div><Button variant="editorial" asChild><Link to="/kontakt">Boka ett samtal <ArrowRight/></Link></Button></div></section>;
}

export function ServicesOverview() {
  const icons = [ShieldCheck, ScanLine, Users];
  return <section className="section-band"><div className="site-width"><div className="section-heading"><div><p className="eyebrow">Vad vi erbjuder</p><h2 className="section-title">Kunskap som blir handlingskraft.</h2></div><Link className="text-link" to="/tjanster">Alla utbildningar & insatser <ArrowRight size={16}/></Link></div><div className="services-grid">{services.map((service, index) => { const Icon = icons[index] ?? ShieldCheck; return <article className="service-item" key={service.id}><div className="service-top"><Icon size={26} strokeWidth={1}/><span className="service-number">{service.number}</span></div><h3>{service.title}</h3><p>{service.short} {index === 0 ? 'Förebyggande arbete, mental förberedelse och praktisk träning för allvarliga våldshändelser.' : index === 1 ? 'Vi identifierar risker i er verksamhet och ger konkreta, prioriterade förslag som fungerar i vardagen.' : 'Praktiska verktyg och gemensamma arbetssätt för ett tryggt, professionellt och rättssäkert agerande.'}</p><Link className="text-link" to="/tjanster" hash={service.id}>Läs mer <ArrowRight size={15}/></Link></article>; })}</div></div></section>;
}

export function JohanPortrait() {
  return <div className="portrait-frame"><img src={johan.url} alt="Johan Leopoldsson, en av grundarna av Mind to Safety" width={300} height={300} loading="lazy"/><p className="portrait-caption">Johan Leopoldsson · Medgrundare, Mind to Safety</p></div>;
}

export function AboutSection({ full = false }: { full?: boolean }) {
  return <section className="section-band section-soft"><div className="site-width"><div className="about-grid"><JohanPortrait/><div><p className="eyebrow">Människan bakom kompetensen</p><h2 className="section-title">Johan Leopoldsson</h2><div className="body-copy"><p>Jag heter Johan Leopoldsson och är en av grundarna av MindToSafety. Vi är ett mindre, specialiserat företag som arbetar med förebyggande säkerhet, utbildning och beredskap.</p><p>Jag är själv verksam inom högskolesektorn och arbetar dagligen med säkerhetsfrågor i en miljö med höga krav, tydliga regelverk och begränsade handlingsutrymmen.</p><p>Vår styrka ligger i kombinationen av erfarenhet från kvalificerat polisiärt arbete och praktiskt säkerhetsarbete. Jag själv har bakgrund från Polisens insatsstyrka i Stockholm med erfarenhet av att hantera komplexa och allvarliga situationer, inklusive pågående dödligt våld (PDV).</p>{full && <p>Vi utgår alltid från verkligheten – med lösningar som är genomförbara, kostnadseffektiva och anpassade efter varje verksamhets förutsättningar. Vårt mål är att hjälpa organisationer att gå från tanke till handling – och att bygga långsiktig trygghet genom kunskap, struktur och praktisk träning.</p>}</div>{!full && <Link to="/om-oss" className="text-link mt-7">Läs mer om oss <ArrowRight size={16}/></Link>}</div></div><blockquote className="quote">”För oss handlar säkerhet primärt inte om pärmar, policyer eller dyra system. Det handlar om människor.”<cite className="quote-author">Mind to Safety</cite></blockquote></div></section>;
}