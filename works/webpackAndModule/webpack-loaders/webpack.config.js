const path = require("path");
module.exports = {
    mode:"production",

    // //raw-loader
    // entry:'./src/static/index.js',
    // output:{
    //     path:path.resolve(__dirname,"dist"),
    //     filename:'[name]-txt.js'
    // },
    // module: {
    //     rules: [
    //       {
    //         test: /\.txt$/i,
    //         use: 'raw-loader'
    //       },
    //     ],
    // },

    //file-loader
    entry:'./src/static/file-loader.js',
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'[name]-[hash].[ext]'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                //生成的路径及文件名
                name: '[path][name].[ext]',
                //文件存放路径(这个路径是相对于output下的路径而言),且会加上原有的文件所在的项目路径
                outputPath: '/imgs',
                //文件公共路径（需和最后引用文件路径一致）
                publicPath: '/imgs/src/static/imgs',
              },
            },
          ],
        },
      ],
    },
}