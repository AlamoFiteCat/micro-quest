export interface Hero {
  name: string;
  picture: string;
  story: string;
  strength: number;
  dexterity: number;
  intelligence: number;
  charisma: number;
  primaryStat: string;
  currentHealth?: number;
  critical?: number;
  haste?: number;
  versatility?: number;
  mastery?: number;
  armor?: number;
  health?: number;
  f_dead?: boolean;
  level?: number;
  weapon?: string;
  user?: string;
}
