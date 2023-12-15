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
  @description: set the configuration.
  */
  setDataAsConfig(inData) {
    this.configuration = inData as Configuration;
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
      this.setDataAsConfig(res);
    } catch (e) {
      console.error('HotConfigService: ', e);
      this.configuration = null;
    }
  }

  get(inPath?: string) {
    const ctx = this.configuration;
    if (!inPath || !ctx) return ctx;
    return nx.get(ctx, inPath);
  }
}

export default HotConfigService;
