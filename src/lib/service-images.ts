import pdv from '@/assets/pdv-training.jpg';
import analysis from '@/assets/safety-analysis.jpg';
import conflict from '@/assets/conflict-management.jpg';

export const serviceImages: Record<string, { src: string; alt: string }> = {
  pdv: { src: pdv, alt: 'Illustrationsbild av taktisk beredskap för PDV-utbildning' },
  sakerhetsanalys: { src: analysis, alt: 'Granskning av en planritning vid säkerhetsanalys' },
  bemotande: { src: conflict, alt: 'Illustrationsbild av ett professionellt bemötande i ett svårt samtal' },
};