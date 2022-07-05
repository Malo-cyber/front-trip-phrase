import { Phrase } from './phrase';

export interface Reference {
  id?: number;
  image: string;
  theme?: number | null;
  phrases: Phrase[];
  references?: Reference[];
  currentLangtrad?: string;
}
