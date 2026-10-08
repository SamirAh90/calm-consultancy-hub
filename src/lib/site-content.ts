export const services = [
  { id: 'pdv', number: '01', title: 'PDV-utbildning', short: 'Beredskap som gör skillnad när det gäller.', description: 'Vår PDV-utbildning riktar sig till skolor, offentliga verksamheter och företag som vill stärka sin beredskap inför allvarliga våldshändelser. Fokus ligger på förebyggande arbete, tydliga handlingsmönster, mental förberedelse och praktisk träning, baserat på erfarenhet från skarpa PDV-situationer.', points: ['Förebyggande säkerhetsarbete', 'Tydliga handlingsmönster', 'Mental förberedelse', 'Praktisk träning'] },
  { id: 'sakerhetsanalys', number: '02', title: 'Säkerhetsanalys', short: 'Från riskbild till genomförbara åtgärder.', description: 'Platsbesök där vi snabbt identifierar risker och förbättringsområden i er verksamhet – utifrån hur det faktiskt fungerar i praktiken. Ni får konkreta och prioriterade åtgärdsförslag som är enkla att genomföra och ofta mycket kostnadseffektiva. Resultatet blir ökad trygghet och en starkare förmåga att förebygga och hantera oönskade händelser.', points: ['Platsbesök i er verksamhet', 'Identifiering av risker', 'Prioriterade åtgärdsförslag', 'Praktiska och kostnadseffektiva lösningar'] },
  { id: 'bemotande', number: '03', title: 'Hotfullt och rättshaveristiskt beteende', short: 'Trygghet i det professionella bemötandet.', description: 'Utbildningen ger deltagarna kunskap och praktiska verktyg för att hantera hotfullt, aggressivt och rättshaveristiskt beteende på ett tryggt, professionellt och rättssäkert sätt. Målet är att skapa gemensamma arbetssätt som ökar tryggheten och gör komplexa situationer lättare att hantera – för både individ och organisation.', points: ['Kunskap om hotfullt och aggressivt beteende', 'Praktiska verktyg för bemötande', 'Gemensamma arbetssätt', 'Professionellt och rättssäkert agerande'] },
];

export function siteHead(title: string, description: string) {
  return { meta: [
    { title: `${title} | Mind to Safety` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} | Mind to Safety` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}