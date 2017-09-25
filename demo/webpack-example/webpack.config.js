var rd = require('rd');                                         //node模块 读写文件目录
var webpack = require('webpack');
var resolve = require('path').resolve;
var publicPath = '/dist';                                       //静态资源(css,js,img) 打包路径
var assetsPath = resolve('.' + publicPath);                     //打包后的静态资源存放路径(JS,CSS,IMG...)
var htmlPath = resolve('./dist/pages');                         //打包后的HTML存放路径
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");    //webpack插件, 用于分离css成单文件
var CleanPlugin = require('clean-webpack-plugin')                  //webpack插件，用于清除目录文件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;      //对指定的chunks进行公共模块的提取 多个html共用一个js文件(chunk)，可用CommonsChunkPlugin

var entry = { main: __dirname + '/src/entries/app.js' }; //主入口
var entryKeys = []

var plugins = [
  new CleanPlugin( //每次编译 自动删除之前编译完的旧文件
    ['dist']
    , {
      // root: resolve(__dirname, '../'),       　 //基于此目录查找
      verbose: true,        　　　　　　　　　　  //是否开启在控制台输出信息
      watch: true,                              //默认false 为true时删除所有的编译文件
      // exclude: []
    }
  ),
  new CommonsChunkPlugin({//提取JS中公共模块
    name: ['main', ...entryKeys],                      //or   names: Array 对应entry上的键值
    filename: './js/vendor.[ChunkHash:8].js',          //生成文件的名字，如果没有默认为输出文件名
    minChunks: Infinity,                               //模块被引用的次数多少才会被独立打包>=2
    // chunks:                                         //表示需要在哪些chunk（也可以理解为webpack配置中entry的每一项）里寻找公共代码进行打包。不设置此参数则默认提取范围为所有的chunk
  }),
  new ExtractTextPlugin("css/[name].[ContentHash:8].css"), //页面中提取的css名字
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [//自动添加CSS属性前缀
        require("autoprefixer")({
          browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        })
      ]
    }
  })
];

//枚举目录下的所有文件夹
rd.eachDirFilterSync('./src/pages', /(pages)(\\)(\b[a-z]+\b)/i, function (f) {
  let s = '\\';
  f = f.split(s).join(s + s);
  rd.eachFilterSync(f, /\.html$/i, function (files) {//枚举对应文件夹下的文件
    let temp = files.split(s);
        temp.splice(0, temp.length - 2);
    let entryKey = temp.join(s).substr(0, temp.join(s).length - 5);
        entry[entryKey] = __dirname + '/src/entries/' + entryKey + '.js';//批量添加入口文件

    let chunks = temp[0].match(/(CarInsuranceService)/gi) ? [entryKey] : ['main', entryKey]

    temp = new htmlWebpackPlugin({
      filename: htmlPath + s + temp.join(s),//编译后的html路径
      template: 'src/pages' + s + temp.join(s),//模板html路径
      inject: 'head',
      chunks,
      // minify: { //代码压缩选项
      // removeComments: true,
      // collapseWhitespace: true,
      // removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
      // }
    });
    entryKeys.push(entryKey)
    plugins.push(temp); //枚举到的页面加入打包队列
  });

}, function (err) {
  assert.equal(err, null);
});

module.exports = {
  entry,
  output: {
    path: assetsPath,
    filename: 'js/[name].[ChunkHash:8].js',
    publicPath: publicPath,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.json', '.ejs', '.styl'],
    alias: {
      '@': resolve('src'),
      '~': resolve('src/components'),
      '~assets': resolve('src/assets')
    }
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [
        'ejs-compiled-loader',
        'extract-loader?publicPath=' + publicPath,
        'html-loader?' + JSON.stringify({
          attrs: ['img:src', 'img:data-on', 'img:data-off', 'link:href']
        }),
      ]
    }, {
      test: /\.ejs$/,
      loader: 'ejs-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader?importLoaders=1!postcss-loader"
      })
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader!postcss-loader!stylus-loader"
      })
    }, {
      test: /\.js$/,
      loader: 'babel-loader',//ES6转ES5
      include: resolve(__dirname, 'src'), //包含的检测目录
      exclude: resolve(__dirname, 'node_modules'), //排除的检测目录
      options: {
        presets: ['latest']
      }
    }, {
      test: /\.(png|jpg|gif|webp|svg)$/i,
      use: [
        {
          loader: 'url-loader',//limit小于指定值会转base64
          options: {
            // limit: 2000,
            limit: 500,
            name: 'img/[name]-[hash:8].[ext]'
          }
        },
        // 'image-webpack-loader'//压缩图片
      ]
    }]
  }
}
