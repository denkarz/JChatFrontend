let loggerPrefix: string = '';
export default {
  install(Vue: any, options: any) {
    function setPrefix(prefix: string) {
      loggerPrefix = prefix;
    }

    function print(object: any) {
      const consl = console;
      consl.log(object);
    }

    function log(object: any, level?: string, prefix?: string) {
      const consl = console;
      let logPrefix = '';
      let logLevel = '';
      const type = object.constructor.name;
      prefix ? logPrefix = prefix : logPrefix = loggerPrefix;
      level ? logLevel = `Level: ${level}` : logLevel = 'Logging';
      consl.log(`[${logLevel}]`, `Type: ${type}`, `${logPrefix} `, JSON.parse(JSON.stringify(object)));
    }

    Vue.prototype.$logger = {
      setPrefix(prefix: string) {
        setPrefix(`${prefix}: `);
      },
      error(object: string, prefix?: string) {
        log(object, 'Error', prefix);
      },
      success(object: string, prefix?: string) {
        log(object, 'Success', prefix);
      },
      log,
      print,
    };
  },
};
