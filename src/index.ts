import obp from 'object-path';
import fetchMp from '@jswork/fetch-mp';
import fetchWithTimeout from '@jswork/fetch-with-timeout';

type Configuration = Record<string, any> | null | undefined;

// 添加自定义错误类
class ConfigurationError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

interface Options {
  envs: Record<string, string>;
  env: string;
  path?: string;
  timeout?: number;
  fallback?: Configuration;
}

const defaults: Partial<Options> = {
  timeout: 30 * 1000,
  fallback: {},
};

class HotConfigService {
  public options: Options;
  public configuration: Configuration = {};

  constructor(inOptions: Options) {
    this.options = { ...defaults, ...inOptions };
  }

  private async fetchJson(url: string, options: { timeout?: number }): Promise<any> {
    const isMp = typeof wx !== 'undefined' && typeof wx.getSystemInfoSync !== 'undefined';
    const returnJson = (r: Response) =>
      r.json().catch((err) => {
        console.error('Failed to parse response as JSON:', err);
        return this.options.fallback;
      });

    return isMp
      ? fetchMp(url, options).then(returnJson)
      : fetchWithTimeout(url, options).then(returnJson);
  }

  async fetch() {
    const { envs, env, timeout, path } = this.options;
    const apiURL = envs[env] + (path ?? '');

    try {
      const res = await this.fetchJson(apiURL, { timeout });
      this.configuration = await this.transformResponse(res);
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      throw new ConfigurationError(`Failed to fetch configuration from ${apiURL}`, error);
    }
    return this.configuration;
  }

  async transformResponse(inResponse: Response) {
    const { status, ok } = inResponse;
    if (status !== 200 || !ok) return this.options.fallback;
    const res = await inResponse.json();
    return res as Configuration;
  }

  get(inPath?: string) {
    const ctx = this.configuration;
    if (!inPath || !ctx) return ctx;
    return obp.get(ctx, inPath);
  }
}

export default HotConfigService;
