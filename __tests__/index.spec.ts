import HotConfig from '../src';

// https://student-api.beta.saybot.net/api/v2/configurations/HOMEWORK_NG_WEB
const hotConfig = new HotConfig({
  envs: {
    beta: 'https://student-api.beta.saybot.net/api/v2/configurations',
  },
  path: '/HOMEWORK_NG_WEB',
  env: 'beta',
});

describe('api.basic', () => {
  test('normail single value case', async () => {
    await hotConfig.fetch();
    const res = hotConfig.get();
    expect(res.success).toBe(true);
  });
});
