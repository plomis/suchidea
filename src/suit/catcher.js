
export default function( func, callback ) {
  return function( config ) {
    try {
      return func( config );
    } catch( error ) {
      callback( error );
    }
  };
}
