// Fixed film-grain layer: one tiled SVG noise texture, multiplied over the page.
const NOISE =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
      "<filter id='n'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/>" +
      "<feColorMatrix type='saturate' values='0'/>" +
      "</filter>" +
      "<rect width='100%' height='100%' filter='url(#n)'/>" +
      "</svg>",
  );

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.045] mix-blend-multiply"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "140px 140px" }}
    />
  );
}
