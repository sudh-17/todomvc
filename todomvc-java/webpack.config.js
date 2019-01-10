var htmlWebpackPlugin = require('html-webpack-plugin')//导入webpack的HTML插件模板
var path = require('path');
var webpack = require('webpack');

module.exports={
    context: __dirname,//上下文
    entry:'./src/app.js',
    output:{
        path: __dirname+'/dist/',
        filename: 'js/[name].min.js',
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname +'src'),
                exclude: path.resolve( __dirname +'node_modules'),
                options:{
                    presets:['latest']
                }
            }
        ]
    },
    plugins:[
        //html插件
        new htmlWebpackPlugin({
            filename:'index.html',//HTML文件名称
            template: 'index.html', //HTML模板
            inject: 'body',
            
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}