const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      paths.appBuild = webpackConfig.output.path = path.resolve(
        `dist/${
          process.env.REACT_APP_BUILD_TARGET === "offscreen"
            ? "offscreen"
            : "popup"
        }`
      );

      return {
        ...webpackConfig,
        plugins: [
          new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            excludeChunks: ["background", "content"],
          }),
          ...webpackConfig.plugins.slice(1),
        ],
        entry: {
          main: [
            env === "development" &&
              require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          background: "./src/scripts/background.ts",
          content: "./src/scripts/content.ts",
        },
        output: {
          ...webpackConfig.output,
          filename: (pathData) =>
            pathData.chunk.name === "main"
              ? webpackConfig.output.filename
              : "../scripts/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
      };
    },
  },
};
