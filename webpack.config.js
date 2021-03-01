'use strict';
const path = require('path');
//Plugins 
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Node Path 
const nodeModulesPath = path.join(__dirname, 'node_modules');
// Web application root directory
const webRootPath = path.resolve(__dirname);
const srcPath = path.join(__dirname, 'src');
const appPath = path.join(srcPath, 'app');

// Path where files will be copied over 
const distPath = path.join(webRootPath, 'dist');
// Define paths for libraries, javascript & css 
const libsPath = path.join(distPath, 'libs');
const jsPath = path.join(distPath, 'js');
const cssPath = path.join(distPath, 'css');
module.exports = {
    context: appPath, // base directory 
    optimization: {
        minimize: true
    },
    entry: {
        //Each entry points where to start the bundling process 
        //if an array is passed then all items will be processed 
        // best practice one entry point per html page
        main: "./main.ts",
        "views/mathexamples": "./views/mathexamples.ts",
        "views/carloan": "./views/carloan.ts",
        "views/registerView": "./views/register.view.ts",
        "views/employeesView": "./views/employees.view.ts",
        "views/employeeListView": "./views/employeesList.view.ts",
        "views/switchStatementView": "./views/switchStatement.view.ts"
    },
    output: {
        publicPath: distPath, //root path where js will be copied
        path: jsPath,  //javascript path identified above
        filename: '[name].js'  //output file name 
    },
    module: {
        //this section you add the plugins
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                use: [
                   //{ loader: "style-loader" }, //creates style nodes from JS string
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    { loader: "postcss-loader" }, //post process to compile css
                    { loader: "sass-loader" }  // compiles Sass to CSS, using node Sass by default

                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: '[name].css'
            }
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(nodeModulesPath, '/jquery/'),
                    to: path.join(libsPath, '/jquery/')
                },
                {
                    from: path.join(nodeModulesPath, '/bootstrap/'),
                    to: path.join(libsPath, '/bootstrap/')
                },
                {
                    from: path.join(nodeModulesPath, '/toastr/'),
                    to: path.join(libsPath, '/toastr/')
                },
                {
                    from: path.join(srcPath, '/images/'),
                    to: path.join(distPath, '/images/')
                },
                {
                    from: path.join(srcPath, '/css/'),
                    to: path.join(distPath, '/css/')
                }
                ,{
                    from: path.join(srcPath, '/assets/'),
                    to: path.join(distPath, '/assets/')
                }

            ]
        })
    ]
};
