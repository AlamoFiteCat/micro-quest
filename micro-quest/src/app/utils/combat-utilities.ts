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
