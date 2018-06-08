const webpack = require ("webpack");
const fs      = require ("fs");
const path    = require ("path");
const cwd     = require ("process").cwd;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

// This needs to be done to leave sqlite3 out of packaging
const nodeModules = {};

fs.readdirSync ("node_modules")
  .filter ((x) =>
  {
     return [ ".bin" ].indexOf (x) === -1;
  })
  .forEach ((mod) =>
  {
     nodeModules[mod] = `commonjs ${ mod }`;
  });

module.exports = function (env)
{
   const nodeEnv = env && env.prod ? "production" : "development";
   const isProd = nodeEnv === "production";

   const plugins = [];
   plugins.push (new ProgressBarPlugin());
   plugins.push (new webpack.LoaderOptionsPlugin({ debug: !isProd }));
   plugins.push (new ForkTsCheckerWebpackPlugin({tslint: true, workers: 3, checkSyntacticErrors: true}));

   return {
   entry:   [ "./index" ],
   devtool: "#eval-source-map",
   module:
   {
      rules:
      [
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options:
            {
               // disable type checker - it will be used in fork plugin
               transpileOnly: true,
               silent: true
            }
         },
         {
            test:   /\.css$/,
            loader: "style-loader!css-loader"
         },
         {
            test:   /\.txt$/,
            loader: "raw-loader"
         },
         {
            test:   /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: "url-loader",
               options: {
                  limit: 10000
               }
         },
         {
            test:   /\.(eot|ttf|wav|mp3)$/,
            loader: "file-loader"
         },
         {
            test:   /\.node$/,
            loader: "node-loader"
         }
      ]
   },
   target:  "electron-main",
   resolve:
   {
     extensions: [ ".js", ".ts", ".tsx" ],
   },
   output:
   {
      path: path.resolve(__dirname, "webpack"),
      publicPath: "./webpack/",
      filename:   "bundle.js"
   },
   plugins,
   optimization:
   {
      noEmitOnErrors: true, // NoEmitOnErrorsPlugin
      concatenateModules: true // ModuleConcatenationPlugin
   },
   externals: [ nodeModules ]
};
}
