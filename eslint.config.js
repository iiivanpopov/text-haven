import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: [
      "**/node_modules/",
      "**/.next/",
      "**/generated/",
      "**/out/",
      "**/dist/",
      "**/build/",
    ],
    extends: ["next", "prettier", "next/core-web-vitals", "next/typescript"],
    settings: {
      next: {
        rootDir: "./frontend",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  }),
];

export default eslintConfig;
