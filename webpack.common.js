const path = require("path");
const fs = require("fs");
const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/ts/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "./public/"),
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new RemovePlugin({
            after: {
                root: "./public/",
                test: [
                    {
                        folder: ".",
                        method: (absoluteItemPath) => {
                            const mainFile = path.basename(absoluteItemPath);
                            const mainFileName = mainFile.substring(0, mainFile.indexOf(".") + 1) + mainFile.substring(mainFile.lastIndexOf("."));
                            const mainFileDate = fs.statSync(absoluteItemPath).ctime;

                            let shouldDelete = false;
                            fs.readdirSync(path.dirname(absoluteItemPath)).filter(file => file != mainFile && file.substring(0, file.indexOf(".") + 1) + file.substring(file.lastIndexOf(".")) == mainFileName).forEach(file => {
                                if (fs.statSync(path.join(path.dirname(absoluteItemPath), file)).ctime > mainFileDate) {
                                    shouldDelete = true;
                                }
                            });
                            return shouldDelete;
                        }
                    }
                ]
            }
        })
    ],
    optimization: {
        moduleIds: "hashed",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets"
                    }
                }
            }
        ],
    }
};