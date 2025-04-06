"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import chroma from "chroma-js";

export default function HomePage() {
  const [color, setColor] = useState("#ff6b6b");

  const getAnalogous = () =>
    chroma.scale([color]).mode("lab").colors(1, "hex", "analogous");

  const getComplementary = () => [
    color,
    chroma(color).set("hsl.h", "+180").hex(),
  ];

  const getTriadic = () => {
    const h = chroma(color).get("hsl.h");
    return [
      color,
      chroma(color)
        .set("hsl.h", h + 120)
        .hex(),
      chroma(color)
        .set("hsl.h", h + 240)
        .hex(),
    ];
  };

  const getMonochromatic = () =>
    chroma
      .scale([chroma(color).brighten(1), color, chroma(color).darken(1)])
      .colors(5);

  const formatColorValues = (color: string) => {
    const c = chroma(color);
    return {
      hex: c.hex(),
      rgb: c.css(),
      hsl: c.css("hsl"),
      hsv: `hsv(${c
        .hsv()
        .map((n) => Math.round(n))
        .join(", ")})`,
    };
  };

  const renderPalette = (title: string, colors: string[]) => (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {colors.map((c, idx) => {
          const values = formatColorValues(c);
          return (
            <div
              key={idx}
              className="rounded-lg overflow-hidden border shadow cursor-pointer hover:scale-105 transition"
              style={{ backgroundColor: c }}
              onClick={() => navigator.clipboard.writeText(values.hex)}
            >
              <div className="backdrop-blur bg-black/40 text-white p-3 text-sm">
                <p>
                  <strong>HEX:</strong> {values.hex}
                </p>
                <p>
                  <strong>RGB:</strong> {values.rgb}
                </p>
                <p>
                  <strong>HSL:</strong> {values.hsl}
                </p>
                <p>
                  <strong>HSV:</strong> {values.hsv}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen w-full bg-gray-100 text-gray-800 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🎨 Color Harmony Generator
        </h1>

        <div className="mb-10 flex flex-col items-center">
          <HexColorPicker color={color} onChange={setColor} />
          <p className="mt-4 text-lg font-mono text-center">
            Selected: {color}
          </p>
        </div>

        {renderPalette("Analogous Colors", getAnalogous())}
        {renderPalette("Complementary Colors", getComplementary())}
        {renderPalette("Triadic Colors", getTriadic())}
        {renderPalette("Monochromatic Colors", getMonochromatic())}
      </div>
    </main>
  );
}
