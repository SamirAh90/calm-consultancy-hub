import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter } from '@/components/site';
import { siteHead } from '@/lib/site-content';
export const Route = createFileRoute('/kontakt')({
  validateSearch: (search: Record<string, unknown>): { amne?: string } => typeof search['amne'] === 'string' ? { amne: search['amne'] } : {},
  head: () => siteHead('Kontakt & boka samtal', 'Kontakta Mind to Safety för ett förutsättningslöst samtal om utbildning, säkerhetsanalys och trygghet i er verksamhet.'), component: ContactPage,
});
function ContactPage() {
  const { amne } = Route.useSearch();
  const [opened, setOpened] = useState(false);
  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Namn: ${data.get('namn')}\nE-post: ${data.get('epost')}\nVerksamhet: ${data.get('verksamhet')}\n\n${data.get('meddelande')}`;
    window.location.href = `mailto:info@mindtosafety.com?subject=${encodeURIComponent(amne || 'Förutsättningslöst samtal')}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }
  return <><SiteHeader/><main><section className="page-top"><div className="site-width reveal"><p className="eyebrow">Kom i kontakt</p><h1>Låt oss prata om trygghet.</h1><p className="body-copy">Varje verksamhet har sina förutsättningar. Hör av er så tar vi ett förutsättningslöst samtal om era behov och hur vi kan hjälpa er.</p></div></section><section className="section-band"><div className="site-width contact-layout"><div><p className="eyebrow mb-5">Skriv till oss</p><a className="contact-email" href="mailto:info@mindtosafety.com">info@mindtosafety.com</a><div className="gold-rule"/><h2 className="section-title">Från tanke till handling.</h2><p className="body-copy">Oavsett om ni söker en utbildning, vill se över er säkerhet eller behöver stöd i en specifik situation börjar vi med att lyssna.</p><p className="body-copy mt-5">Skolor · Offentliga verksamheter · Företag</p></div><form className="contact-form" onSubmit={send}><label className="field-label">Namn *<input className="field-input" name="namn" autoComplete="name" required/></label><label className="field-label">E-post *<input className="field-input" name="epost" type="email" autoComplete="email" required/></label><label className="field-label">Verksamhet<input className="field-input" name="verksamhet" autoComplete="organization"/></label><label className="field-label">Meddelande *<textarea className="field-input" name="meddelande" rows={5} required defaultValue={amne ? `Vi är intresserade av ${amne.toLowerCase()}. ` : ''}/></label><p className="form-note">Meddelandet öppnas i ditt e-postprogram, där du kan granska och skicka det.</p><Button variant="editorial" type="submit">Öppna e-postmeddelande <ArrowUpRight/></Button>{opened && <p className="form-note" role="status">Ditt e-postprogram har öppnats. Skicka meddelandet där, eller skriv direkt till info@mindtosafety.com.</p>}</form></div></section></main><SiteFooter/></>;
}