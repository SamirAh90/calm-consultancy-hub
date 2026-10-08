import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter, ContactBand, ServiceImage } from '@/components/site';
import { services, siteHead } from '@/lib/site-content';

export const Route = createFileRoute('/tjanster')({ head: () => siteHead('Utbildningar & insatser', 'PDV-utbildning, säkerhetsanalys och utbildning i hotfullt och rättshaveristiskt beteende. Praktiska insatser för tryggare verksamheter.'), component: ServicesPage });
function ServicesPage() {
  return <><SiteHeader/><main><section className="page-top"><div className="site-width reveal"><p className="eyebrow">Kunskap som gör skillnad</p><h1>Utbildningar & insatser</h1><p className="body-copy">Förebyggande säkerhet – enkelt, realistiskt och fungerande. Vi hjälper er att omsätta teori till handling, med insatser anpassade efter er verksamhets förutsättningar.</p></div></section><div className="site-width">{services.map(service => <section id={service.id} className="service-detail" key={service.id}><span className="service-number">{service.number}</span><div><ServiceImage id={service.id}/><h2>{service.title}</h2><p className="body-copy">{service.description}</p><Button variant="editorialOutline" className="mt-7" asChild><Link to="/kontakt" search={{ amne: service.title }}>Prata om era behov <ArrowRight/></Link></Button></div><ul className="detail-list">{service.points.map(point => <li key={point}><Check size={15}/>{point}</li>)}</ul></section>)}</div><ContactBand/></main><SiteFooter/></>;
}