// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await config;

  // Add 'mjs' and 'cjs' to the existing sourceExts array
  return {
    ...config,
    resolver: {
      ...config.resolver,
      sourceExts: [...sourceExts, "mjs", "cjs"],
    },
  };
})();
