
import is from 'whatitis';


export class Cat {
  constructor( properties ) {
    is.Object( properties ) ? Object.assign( this, properties ) : this.value = properties;
  }
}

function getValue( cat ) {
  return cat.value;
}

export function choice( yesCallback, noCallback ) {
  return function( cat ) {
    return ( getValue( cat ) ? yesCallback : noCallback )( cat );
  };
}
