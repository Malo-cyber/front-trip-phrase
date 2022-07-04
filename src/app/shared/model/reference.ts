import { Phrase } from './phrase';

export interface Reference {
  id?: number;
  reference: string;
  image: string;
  theme?: string;
  phrases: Phrase[];
  references?: Reference[];
  currentLangtrad?: string;
}
