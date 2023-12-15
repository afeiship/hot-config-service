# hot-config-service
> A lightweight JavaScript class for dynamic configurations.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/hot-config-service
```

## usage
```js
import HotConfigService from '@jswork/hot-config-service';

const hotConfig = new HotConfigService({
  envs: {
    'beta': 'https://student-api.beta.saybot.net',
    'production': 'https://student-api.alo7.com'
  },
  env: 'beta',
  subpath: '/api/v2/configurations/'
});

// setOptions
hotConfig.setOptions({ env: 'production' });

// init
await hotConfig.init();

// get value
hostConfig.get('env');
```

## types
```ts
/// <reference types="@jswork/hot-config-service/global.d.ts" />
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
