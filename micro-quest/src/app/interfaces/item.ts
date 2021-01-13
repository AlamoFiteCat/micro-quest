export interface Item {
  strength: number;
  dexterity: number;
  intelligence: number;
  critical: number;
  haste: number;
  versatility: number;
  mastery: number;

  icon: string;
  name: string;

  armor?: number;
  slot?: string;
  type: string;
}
