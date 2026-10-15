import { useEffect, useRef, useState } from "react";

type Props = {
  chance: number;
  spinning: boolean;
  result: boolean | null;
  onAnimationComplete: () => void;
};

const FULL_ROTATION = 360;
const SPIN_DURATION = 2000;
const STOP_DURATION = 1000;
const TOTAL_ROTATIONS = 6;
const EDGE_MARGIN = 2;

export default function UpgradeWheel({
  chance,
  spinning,
  result,
  onAnimationComplete,
}: Props) {
  const [angle, setAngle] = useState(0);
  const [transition, setTransition] = useState("none");
  const wasSpinning = useRef(false);

  useEffect(() => {
    if (!spinning || wasSpinning.current || result === null) {
      return;
    }

    wasSpinning.current = true;

    // Нормализуем шанс, чтобы он всегда был в пределах 0–100%.
    const safeChance = Math.max(0, Math.min(100, chance));

    // Выигрышная область симметрична относительно нижней точки.
    const halfArc = (safeChance * 3.6) / 2;

    // Стрелка в состоянии 0° направлена вверх.
    // 180° — нижняя центральная точка.
    let targetAngle: number;

    if (result && safeChance >= 100) {
      targetAngle = 180;
    } else if (!result || safeChance <= 0) {
      // Проигрыш всегда останавливается вне зоны.
      const outsideAngle = 180 + halfArc + EDGE_MARGIN;
      targetAngle =
        outsideAngle <= 360 ? outsideAngle : 180 - halfArc - EDGE_MARGIN;
    } else {
      // Выигрыш — строго внутри цветного сектора.
      const usableHalfArc = Math.max(0, halfArc - EDGE_MARGIN);
      targetAngle = 180 + (Math.random() * 2 - 1) * usableHalfArc;
    }

    const startingAngle = angle;
    const fastEndAngle = startingAngle + FULL_ROTATION * TOTAL_ROTATIONS;

    // Сначала 2 секунды вращаем стрелку.
    setTransition(`transform ${SPIN_DURATION}ms linear`);
    setAngle(fastEndAngle);

    const stopTimer = window.setTimeout(() => {
      // Находим ближайший будущий угол с нужным результатом.
      const currentNormalized =
        ((fastEndAngle % FULL_ROTATION) + FULL_ROTATION) % FULL_ROTATION;

      const delta =
        (targetAngle - currentNormalized + FULL_ROTATION) % FULL_ROTATION ||
        FULL_ROTATION;

      setTransition(
        `transform ${STOP_DURATION}ms cubic-bezier(0.12, 0.7, 0.15, 1)`,
      );
      setAngle(fastEndAngle + delta);
    }, SPIN_DURATION);

    const completeTimer = window.setTimeout(
      () => {
        wasSpinning.current = false;
        onAnimationComplete();
      },
      SPIN_DURATION + STOP_DURATION + 100,
    );

    return () => {
      window.clearTimeout(stopTimer);
      window.clearTimeout(completeTimer);
      wasSpinning.current = false;
    };
  }, [spinning, result]);

  const safeChance = Math.max(0, Math.min(100, chance));
  const halfArc = (safeChance * 3.6) / 2;
  const startAngle = 180 - halfArc;
  //   const endAngle = 180 + halfArc;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      {/* Круговая шкала */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            conic-gradient(
              from ${startAngle}deg,
              #ffb52e 0deg,
              #ff7a18 ${halfArc * 1.3}deg,
              #ed352e ${safeChance * 3.6}deg,
              #202a36 ${safeChance * 3.6}deg,
              #202a36 360deg
            )
          `,
          boxShadow: "0 0 35px #0008, inset 0 0 0 5px #293341",
        }}
      />

      {/* Внутренний диск */}
      <div className="absolute inset-[8%] rounded-full border border-white/10 bg-[#101923]">
        <div className="absolute inset-[8%] rounded-full border border-white/10" />

        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 h-2 origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${i * 9}deg)`,
              opacity: i % 5 === 0 ? 0.8 : 0.25,
            }}
          >
            <div className="h-2 w-px bg-slate-300" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black tracking-tight text-lime-400">
            {safeChance.toFixed(2)}%
          </span>
          <span className="text-xs text-lime-300">шанс улучшения</span>
        </div>
      </div>

      {/* Стрелка */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotate(${angle}deg)`,
          transition,
        }}
      >
        <div
          className="absolute left-1/2 top-[1%] -translate-x-1/2"
          style={{ filter: "drop-shadow(0 0 5px #ff9d24)" }}
        >
          <div
            className="h-0 w-0"
            style={{
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "18px solid #ffb52e",
            }}
          />
        </div>
      </div>

      {/* Центральная ось */}
      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-400 bg-slate-900" />
    </div>
  );
}
