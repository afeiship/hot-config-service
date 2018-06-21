export default class Config {

  static APIS = {
    baseUrl: `//${location.host}`,
    items: {
      '/backend': {
        // global:
        'login': ['post', '/adminUser/login'],
        'logout': ['post', '/adminUser/logout']
      }
    }
  };
  static MONKEY_BUSY_MSG = '程序猿开紧张开发中...';
}



