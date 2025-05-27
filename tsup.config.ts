import { defineConfig, Options } from 'tsup';
import tsupBanner from '@jswork/tsup-banner';
import { umdWrapper } from 'esbuild-plugin-umd-wrapper';
import { replace } from 'esbuild-plugin-replace';

const baseOptions: Options = {
  entry: ['src/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  tsconfig: './tsconfig.json',
  dts: true,
  sourcemap: true,
  cjsInterop: true,
  // external: ['react', 'react-dom'],
  banner: {
    js: tsupBanner(),
  },
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
};

export default defineConfig([
  {
    ...baseOptions,
    splitting: true,
  },
  {
    ...baseOptions,
    format: ['umd'] as any,
    esbuildPlugins: [
      replace({
        'export default': 'export =',
      }),
      umdWrapper({
        libraryName: 'HotConfigService',
      }),
    ],
  }
]);
