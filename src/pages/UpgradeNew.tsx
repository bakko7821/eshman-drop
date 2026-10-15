import { useState } from "react";
import { calculateUpgrade, type UpgradeResult } from "../utils/upgrade";
import UpgradeWheel from "../components/UpgradeWheel";

const sourceSkin = { name: "Исходный скин", price: 100 };
const targetSkin = { name: "Целевой скин", price: 1000 };

export default function Upgrade() {
  const [failureStreak, setFailureStreak] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [pendingResult, setPendingResult] = useState<UpgradeResult | null>(
    null,
  );
  const [result, setResult] = useState<UpgradeResult | null>(null);

  const chance = Math.min(100, (sourceSkin.price / targetSkin.price) * 100);

  const goldCardAvailable = chance < 20 && failureStreak >= 7;

  function handleUpgrade() {
    if (spinning) return;

    const outcome = calculateUpgrade(
      sourceSkin.price,
      targetSkin.price,
      failureStreak,
    );

    setPendingResult(outcome);
    setResult(null);
    setSpinning(true);
  }

  function handleAnimationComplete() {
    if (!pendingResult) return;

    setFailureStreak(pendingResult.failureStreak);
    setResult(pendingResult);
    setPendingResult(null);
    setSpinning(false);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6 text-white">
      <h1 className="text-3xl font-bold">Skin Upgrade</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-800 p-5">
          <p className="text-sm text-zinc-400">Твой скин</p>
          <h2 className="mt-2 font-semibold">{sourceSkin.name}</h2>
          <p className="mt-2">{sourceSkin.price} ₽</p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-5">
          <p className="text-sm text-zinc-400">Целевой скин</p>
          <h2 className="mt-2 font-semibold">{targetSkin.name}</h2>
          <p className="mt-2">{targetSkin.price} ₽</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#111820] p-5">
        <UpgradeWheel
          chance={chance}
          spinning={spinning}
          result={pendingResult?.success ?? null}
          onAnimationComplete={handleAnimationComplete}
        />

        <div className="mt-6 flex justify-between text-sm">
          <span className="text-zinc-400">Серия неудач</span>
          <span>{failureStreak} / 7</span>
        </div>

        {goldCardAvailable && (
          <div className="mt-4 rounded-xl border border-yellow-500/50 bg-yellow-950/40 p-4">
            <p className="font-bold text-yellow-300">✦ GOLD CARD</p>
            <p className="mt-1 text-sm text-yellow-100">
              Доступна на следующую попытку · бонус 50%
            </p>
          </div>
        )}

        <button
          onClick={handleUpgrade}
          disabled={spinning}
          className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {spinning ? "Прокрут..." : "Улучшить"}
        </button>

        {result && (
          <div className="mt-5 text-center">
            <p
              className={`text-lg font-bold ${
                result.success ? "text-green-400" : "text-red-400"
              }`}
            >
              {result.success ? "Улучшение успешно!" : "Улучшение не удалось"}
            </p>

            {result.goldCardActive && (
              <p className="mt-2 text-sm text-yellow-300">
                {result.goldCardTriggered
                  ? "Gold Card сработала!"
                  : result.success
                    ? "Gold Card не сработала."
                    : "Gold Card использована."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
