const YAML = require('yamljs')
const fs = require('fs')
const path = require('path')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
const NamedModulesPlugin = require('webpack').NamedModulesPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PathHelperPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin

const baseConfig = YAML.parse(fs.readFileSync(path.resolve(__dirname,'base.yaml')).toString())

module.exports = {
    // context:path.resolve(__dirname,'..'),
    entry:[
        'react-hot-loader/patch',
        // "webpack-dev-server/client?http://0.0.0.0:7070",
        "webpack/hot/only-dev-server",
        path.resolve(__dirname,'../src/index.tsx')
    ],
    // entry:'src/index.tsx',
    output:{
        path:path.resolve(__dirname,"../build"),
        // path:'./build',
        filename:"bundle.[name].js"
    },
    module:{
        rules:[
            {
                test: /\.tsx$/,
                use:"ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            // template:'public/index.html',
            filename:'index.html'
        })
    ],
    devServer: {
        inline:true,
        hot:true,
        port:baseConfig.port,
        historyApiFallback: true,
        proxy:baseConfig.proxy
    },
    resolve: {
        // plugins: [
        //     new PathHelperPlugin()
        // ],
        extensions: ['.tsx','.ts','.jsx','.js']
    }
}