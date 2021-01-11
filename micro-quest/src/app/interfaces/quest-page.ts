import { Encounter } from './encounter';

export interface QuestPage {
  encounter?: Encounter;
  pageNumber: number;
  pageText: string;
}
