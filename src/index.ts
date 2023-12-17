import nx from '@jswork/next';

type Configuration = Record<string, any> | null | undefined;

interface Options {
  envs: Record<string, string>;
  env: string;
  subpath?: string;
  timeout?: number;
  fallback?: Configuration;
}

const defaults: Partial<Options> = {
  timeout: 5000,
  fallback: {},
};

class HotConfigService {
  public options: Options;
  public configuration: Configuration = {};

  constructor(inOptions: Options) {
    this.options = { ...defaults, ...inOptions };
    this.init();
  }

  init() {}

  async transformResponse(inResponse: Response) {
    const { status, ok } = inResponse;
    if (status !== 200 || !ok) return this.options.fallback;
    const res = await inResponse.json();
    return res as Configuration;
  }

  async fetch() {
    const { envs, env, fallback, timeout, subpath } = this.options;
    const apiURL = envs[env] + subpath;
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeout);

    try {
      const {signal} = abortController;
      const res = await fetch(apiURL, { signal });
      this.configuration = await this.transformResponse(res);
    } catch (e) {
      console.error('HotConfigService: ', e);
      this.configuration = fallback;
    }
    return this.configuration;
  }

  get(inPath?: string) {
    const ctx = this.configuration;
    if (!inPath || !ctx) return ctx;
    return nx.get(ctx, inPath);
  }
}

export default HotConfigService;
