// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        // The 'plugins' array should be at the same level as 'presets'
        plugins: [
            'react-native-reanimated/plugin',
        ],
    };
};