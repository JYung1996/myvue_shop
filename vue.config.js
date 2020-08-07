module.exports = {
    publicPath: './',
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            // 发现一个index.html中vue.js包，就去查找是否在main.js中引入了该文件
            // vue:'Vue' 分号前为index.html引入的包，分号后为main.js中导入的自定义的包名称
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
            })

            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })

        })

        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}