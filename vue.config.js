module.exports = {
  css: {
    extract: false
  },
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
};
