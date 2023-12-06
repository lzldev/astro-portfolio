import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

const rng = Math.random;

type BTextProps = {
  text: string;
  classOn: string;
  classOff: string;
  interval?: number;
  odds?: number;
};

export default function BText({
  text,
  classOn,
  classOff,
  interval = 500,
  odds = 0.5,
  ...props
}: BTextProps) {
  const blinking = useSignal<boolean[]>(new Array(text.length).fill(false));

  useEffect(() => {
    const fn = setInterval(() => {
      blinking.value = new Array(text.length)
        .fill(false)
        .map(() => rng() > odds);
    }, interval);

    return () => {
      clearInterval(fn);
    };
  }, []);

  return (
    <p {...props}>
      {blinking.value.map((blink, idx) => (
        <span className={blink ? classOn : classOff}>{text[idx]}</span>
      ))}
    </p>
  );
}
