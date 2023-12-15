interface Options {
  envs: Record<string, string>;
  env: string;
  timeout: number;
}

interface Configuration {}

class HotConfigService {
  public options: Options;
  public configuration: Configuration = {};

  constructor(inOptions: Options) {
    this.options = inOptions;
  }

  async init() {
    const { envs, env, timeout } = this.options;
    const apiURL = envs[env];
  }
}

export default HotConfigService;
