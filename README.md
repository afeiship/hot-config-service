# hot-config-service
> A lightweight JavaScript class for dynamic configurations.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/hot-config-service
```

## usage
```js
import HotConfigService from '@jswork/hot-config-service';

const hotConfig = new HotConfigService({
  // 环境配置，可以设置多个环境的API地址
  envs: {
    'beta': 'https://student-api.beta.saybot.net',
    'production': 'https://student-api.alo7.com'
  },
  // 当前环境
  env: 'beta',
  // API路径，可选，默认为空
  path: '/api/v2/configurations/',
  // 请求超时时间，可选，默认为30秒
  timeout: 30000,
  // 当请求失败时的默认配置，可选
  fallback: {}
});

// 获取配置
await hotConfig.fetch();

// 获取整个配置对象
const config = hotConfig.get();

// 获取特定路径的配置值
const value = hotConfig.get('some.nested.key');
```

## license
Code released under [the MIT license](https://github.com/afeiship/hot-config-service/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/hot-config-service
[version-url]: https://npmjs.org/package/@jswork/hot-config-service

[license-image]: https://img.shields.io/npm/l/@jswork/hot-config-service
[license-url]: https://github.com/afeiship/hot-config-service/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/hot-config-service
[size-url]: https://github.com/afeiship/hot-config-service/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/hot-config-service
[download-url]: https://www.npmjs.com/package/@jswork/hot-config-service
