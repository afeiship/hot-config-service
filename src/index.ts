import nx from '@jswork/next';

interface Options {
  envs: Record<string, string>;
  env: string;
  subpath?: string;
  timeout?: number;
}

type Configuration = Record<string, any> | null;

class HotConfigService {
  public options: Options;
  public configuration: Configuration = {};

  constructor(inOptions: Options) {
    this.options = inOptions;
  }

  setOptions(inOptions) {
    this.options = {
      ...this.options,
      ...inOptions,
    };
  }

  /**
    @template: should implement this method.
    @description: init the configuration.
  */
  async init() {
    const { envs, env, timeout, subpath } = this.options;
    const apiURL = envs[env] + `/${subpath}`;
    try {
      const res = await fetch(apiURL).then((r) => r.json());
      this.configuration = nx.get(res, 'data.info') as Configuration;
    } catch (e) {
      console.error('e: ', e);
      this.configuration = null;
    }
  }

  get(inPath?: string) {
    const ctx = this.configuration;
    console.log('path-ctx: ', ctx);
    if (!inPath || !ctx) return ctx;
    return nx.get(ctx, inPath);
  }
}

export default HotConfigService;
