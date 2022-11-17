export function lerp(a: number, b: number, t: number) {
  return (1-t) * a + t * b;
}

export function lerpVec(a: [], b: [], t: number) {
  const output = [];
  for (let i = 0; i < a.length; i++) {
    output.push(lerp(a[i], b[i], t))
  }
  return output
}