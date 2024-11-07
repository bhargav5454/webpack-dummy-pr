// postcss.config.js

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-preset-env")({
      stage: 1, // You can specify the stage depending on which CSS features you want to support
    }),
    require("autoprefixer"),
  ],
};
