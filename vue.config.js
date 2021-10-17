const PUBLIC_PATH = process.env.publicPath || "/";

module.exports = {
    publicPath: PUBLIC_PATH,
    devServer: {
        host: "0.0.0.0",
        port: 3001,
        disableHostCheck: true,
        public: "me.orf.at:3001",
    },
    css: {
        loaderOptions: {
            //sass: {
            //prependData: `
            //@import "~@/assets/_responsive.scss";
            //@import "~@/assets/_constants.scss";
            //`,
            //},
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                "balm-ui-plus": "balm-ui/dist/balm-ui-plus.js",
                "balm-ui-css": "balm-ui/dist/balm-ui.css",
            },
        },
    },
};
