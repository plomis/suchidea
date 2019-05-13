import { Cat, choice, isInclude } from './utils/suit';
import compose from './utils/compose';

function stage(config_) {} // addEvents( config.dom );

/**
 * config {
 *   container: dom,
 *   plugins: array,
 *   mode: string,
 *   width: number,
 *   height: number
 * }
 */


function getConfig(config) {
  return config;
}

function birth(func) {
  return function (config) {
    try {
      return new Cat(func(config));
    } catch (e) {
      return new Cat({
        value: null,
        error: e
      });
    }
  };
}

function throwError(cat) {
  if (cat.error) {
    throw cat.error;
  }
}

export default isInclude ? compose(choice(stage, throwError), birth(getConfig)) : null;