import HotConfig from '../src';

const hotConfig = new HotConfig({
  envs: {
    beta: 'https://student-api.beta.saybot.net/api/v2/configurations',
  },
  namespace: 'HOMEWORK_NG_WEB',
  env: 'beta',
});

describe('api.basic', () => {
  test('normail single value case', async () => {
    await hotConfig.init();
    const res = hotConfig.get();
    console.log('res: ', res);
  });
});
