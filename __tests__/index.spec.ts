import HotConfig from '../src';

const hotConfig = new HotConfig({
  envs: {
    beta: 'https://student-api.beta.saybot.net/api/v2/configurations',
  },
  subpath: 'HOMEWORK_NG_WEB',
  env: 'beta',
});

describe('api.basic', () => {
  test('normail single value case', async () => {
    await hotConfig.fetch();
    const res = hotConfig.get();
    console.log('res: ', res);
  });
});
