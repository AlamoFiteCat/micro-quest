import { Encounter } from '../interfaces/encounter';
import { Hero } from '../interfaces/hero';

export const combatLogResolver = (
  attackerName: string,
  weapon: string,
  attackDifference: number,
  damage: number,
  targetHealth: number,
  targetName: string
): string => {
  let action: string;
  let effect: string;

  if (weapon === 'bow' || weapon === 'crossbow') {
    action = ` releases a bolt towards ${targetName} from their ${weapon}`;
  } else if (weapon === 'sword' || weapon === 'hammer' || 'swords') {
    action = ` swings their ${weapon} at ${targetName}`;
  } else if (weapon === 'daggers' || weapon === 'spear') {
    action = ` attempts a poke ${targetName} with their ${weapon}`;
  }

  // [attack hit]
  if (attackDifference >= 0) {
    effect = ` and hits for ${damage} damage.`;
  }
  // [attack missed]
  else {
    if (attackDifference <= 0) {
      effect = ' and only nearly grazes their target.';
    } else if (attackDifference <= -3) {
      effect = ` and barely hits, but ${targetName} dodges just in time.`;
    } else if (attackDifference <= -5) {
      effect = ' but misses their target.';
    } else if (attackDifference <= -10) {
      effect = ' but misses by a long shot.';
    }
  }

  if (targetHealth <= 0) {
    effect += ` ${attackerName} is victorious!`;
  }
  return attackerName + action + effect;
};

export const calculateHeroCombat = (hero: Hero, encounter: Encounter) => {
  const heroPrimaryModifier = Math.floor((hero[hero.primaryStat] - 10) / 2);
  let heroDamage = 0;
  const heroAttack = Math.floor(Math.random() * 20) + 1 + heroPrimaryModifier;

  if (heroAttack >= encounter.armor) {
    heroDamage = Math.floor(Math.random() * 6) + 1 + heroPrimaryModifier;
  }

  return {
    heroAttack,
    heroDamage,
  };
};

export const calculateEnemyCombat = (hero: Hero, encounter: Encounter) => {
  const heroArmor = hero.armor + Math.floor((hero.dexterity - 10) / 2);

  const enemyAttack =
    Math.floor(Math.random() * 20) + 1 + encounter.difficultyModifier;
  let enemyDamage = 0;
  if (enemyAttack >= heroArmor) {
    enemyDamage =
      Math.floor(Math.random() * encounter.damage) +
      1 +
      encounter.difficultyModifier;
  }

  return {
    enemyAttack,
    enemyDamage,
    heroArmor,
  };
};
