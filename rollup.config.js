import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/srpay.js",
    format: "iife",
    name: "SRPay",
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
  ],
  external: [
    "react",
    "react-dom",
    "axios",
    "react-hook-form",
    "react-phone-input-2",
    "react-select",
  ],
};
