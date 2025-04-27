import nextPlugin from "@next/eslint-plugin-next";
import featureSlicedConfig from "@uvarovag/eslint-config-feature-sliced-flat";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

const commonLanguageOptions = {
  parser: tseslint.parser,
  ecmaVersion: 2024,
  sourceType: "module",
};

const commonPlugins = {
  "@typescript-eslint": tseslint.plugin,
  prettier: prettierPlugin,
};

const commonRules = {
  "prettier/prettier": "error",
};

export default [
  ...featureSlicedConfig,
  {
    files: ["frontend/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ...commonLanguageOptions,
      parserOptions: {
        ...commonLanguageOptions,
        project: "./frontend/tsconfig.json",
      },
    },
    plugins: {
      ...commonPlugins,
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off",
      ...commonRules,
    },
  },
  {
    files: ["backend/**/*.{ts,js}"],
    languageOptions: {
      ...commonLanguageOptions,
      parserOptions: {
        ...commonLanguageOptions,
        project: "./backend/tsconfig.json",
      },
    },
    plugins: commonPlugins,
    rules: commonRules,
  },
  {
    ignores: ["**/node_modules", "**/dist", "**/generated", "**/.next"],
  },
];
