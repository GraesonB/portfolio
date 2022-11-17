import lerp from './lerp'

export default function smoothStep(t: number) {
  const value1 = t * t;
  const value2 = 1 - (1 - t) * (1 - t);
  return lerp(value1, value2, t);
}