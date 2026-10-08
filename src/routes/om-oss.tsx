import { createFileRoute } from '@tanstack/react-router';
import { SiteHeader, SiteFooter, ContactBand, AboutSection } from '@/components/site';
import { siteHead } from '@/lib/site-content';
export const Route = createFileRoute('/om-oss')({ head: () => siteHead('Om oss & Johan Leopoldsson', 'Lär känna Johan Leopoldsson och Mind to Safety. Erfarenhet från Polisens insatsstyrka, högskolesektorn och praktiskt säkerhetsarbete.'), component: AboutPage });
function AboutPage() {
  return <><SiteHeader/><main><section className="page-top"><div className="site-width reveal"><p className="eyebrow">Om Mind to Safety</p><h1>Erfarenhet som bygger trygghet.</h1><p className="body-copy">Vi är ett mindre, specialiserat företag med en tydlig övertygelse: säkerhet behöver fungera i verkligheten, för människorna som befinner sig där.</p></div></section><AboutSection full/><ContactBand/></main><SiteFooter/></>;
}