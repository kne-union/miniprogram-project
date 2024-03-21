const appConfig = {
  "lazyCodeLoading": "requiredComponents",
  pages: ['pages/index/index', 'pages/mine/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: "custom"
  },
  tabBar: {
    backgroundColor: '#ffffff', color: '#003365', selectedColor: '#5879D0', custom: true, list: [{
      pagePath: 'pages/index/index', text: '首页'
    }, {
      pagePath: 'pages/mine/index', text: '我的'
    }]
  }
};

export default appConfig;
