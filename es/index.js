import { birth, map } from './suit';
import catcher from './suit/catcher';
import compose from './suit/compose';
import getConfig from './getConfig';
import stage from './stage';
export default catcher(compose(map(stage), birth(getConfig)), function (error) {
  console.error(error);
});