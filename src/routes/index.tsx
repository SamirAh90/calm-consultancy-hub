import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter, ContactBand, ServicesOverview, AboutSection } from '@/components/site';
import { siteHead } from '@/lib/site-content';
import campus from '@/assets/campus.jpg';

export const Route = createFileRoute('/')({
  head: () => siteHead('Förebyggande säkerhet & trygghet', 'Mind to Safety stärker trygghet och beredskap i skolor, offentliga verksamheter och företag genom utbildning, säkerhetsanalys och praktisk träning.'),
  component: Index,
});

function Index() {
  return <><SiteHeader/><main><section className="home-hero"><img className="hero-photo" src={campus} width={1920} height={1024} alt="Lugn skandinavisk utbildningsmiljö med naturligt ljus"/><div className="hero-shade"/><div className="hero-bottom"/><div className="site-width hero-content reveal"><p className="eyebrow">Förebyggande säkerhet & beredskap</p><h1 className="hero-title">Mind to Safety<br/><em>Från tanke till trygghet.</em></h1><div className="gold-rule"/><p className="hero-description">Vi hjälper skolor, offentliga verksamheter och företag att skapa trygghet som fungerar i vardagen. Med kunskap, mental förberedelse och praktisk träning går vi från teori till handling.</p><div className="hero-actions"><Button variant="editorial" asChild><Link to="/kontakt">Boka ett samtal <ArrowRight/></Link></Button><Button variant="editorialOutline" asChild><Link to="/tjanster">Utbildningar & insatser</Link></Button></div><div className="hero-footnote"><span>Skolor</span><span>Offentliga verksamheter</span><span>Företag</span></div></div></section><section className="section-band section-soft"><div className="site-width intro-grid"><div><p className="eyebrow">Vår utgångspunkt</p><h2 className="section-title">Trygghet börjar<br/>med människan.</h2></div><div className="body-copy"><p>Säkerhet handlar om människor som förstår sitt uppdrag, känner sig trygga i sina roller och har förutsättningar att agera när det behövs.</p><p>Med erfarenhet från kommunalt skolsäkerhetsarbete, högskolesektorn och operativt arbete inom Polismyndigheten omsätter vi krav och erfarenheter till praktiska, genomförbara åtgärder.</p><Link to="/om-oss" className="text-link mt-5">Enkelt. Realistiskt. Fungerande. <ArrowRight size={16}/></Link></div></div></section><ServicesOverview/><AboutSection/><ContactBand/></main><SiteFooter/></>;
}
