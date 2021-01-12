import { Encounter } from './encounter';

export interface QuestPage {
  encounter?: Encounter;
  lastPage?: boolean;
  pageNumber: number;
  pageText: string;
}
