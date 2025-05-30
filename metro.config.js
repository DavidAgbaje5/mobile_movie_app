// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// These lines are crucial for Firebase compatibility
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes("cjs")) {
    config.resolver.sourceExts.push("cjs");
}
config.resolver.unstable_enablePackageExports = false; // THIS IS THE KEY LINE

module.exports = withNativeWind(config, { input: './app/globals.css' });