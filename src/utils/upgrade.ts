export type UpgradeResult = {
  success: boolean;
  chance: number;
  multiplier: number;
  goldCardActive: boolean;
  goldCardTriggered: boolean;
  failureStreak: number;
};

const GOLD_CARD_THRESHOLD = 7;
const GOLD_CARD_MAX_CHANCE = 20;
const GOLD_CARD_CHANCE = 50;

export function calculateUpgrade(
  sourcePrice: number,
  targetPrice: number,
  previousFailureStreak: number,
): UpgradeResult {
  if (
    !Number.isFinite(sourcePrice) ||
    !Number.isFinite(targetPrice) ||
    sourcePrice <= 0 ||
    targetPrice <= 0
  ) {
    throw new Error("Стоимость скинов должна быть положительной");
  }

  const multiplier = targetPrice / sourcePrice;
  const chance = Math.min(100, (sourcePrice / targetPrice) * 100);

  const goldCardActive =
    chance < GOLD_CARD_MAX_CHANCE &&
    previousFailureStreak >= GOLD_CARD_THRESHOLD;

  const success = Math.random() * 100 < chance;

  const goldCardTriggered =
    success && goldCardActive && Math.random() * 100 < GOLD_CARD_CHANCE;

  let failureStreak: number;

  if (goldCardActive || success) {
    // Gold Card расходуется на одну попытку.
    failureStreak = 0;
  } else {
    failureStreak = previousFailureStreak + 1;
  }

  return {
    success,
    chance,
    multiplier,
    goldCardActive,
    goldCardTriggered,
    failureStreak,
  };
}
