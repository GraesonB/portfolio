export default function elemCenter(element: Element): [number, number] {
  const coords = element.getBoundingClientRect();
  const width = coords.right - coords.left;
  const height = coords.bottom - coords.top;
  return [(coords.left + width /2), (coords.top + height/2)];
}