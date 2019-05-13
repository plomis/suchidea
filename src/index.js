
import { Cat, choice } from './suit';
import catcher from './suit/catcher';
import compose from './suit/compose';


function stage( config_ ) {

  // addEvents( config.dom );
}


/**
 * config {
 *   container: dom,
 *   plugins: array,
 *   mode: string,
 *   width: number,
 *   height: number
 * }
 */
function getConfig( config ) {
  return config;
}

function birth( func ) {
  return function( config ) {
    return new Cat( func( config ));
  };
}

export default catcher( compose( stage, birth( getConfig )), ( error ) => {
  console.error( error );
});
