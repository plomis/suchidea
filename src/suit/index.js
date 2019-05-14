
import is from 'whatitis';


// 传递对象
export class Cat {

  constructor( properties ) {
    this.value = properties;
  }

  getValue() {
    return this.value;
  }
}

export function map( func ) {
  return function( cat ) {
    return func( cat.getValue());
  };
}

export function choice( yesCallback, noCallback ) {
  return function( cat ) {
    return ( cat.getValue() ? yesCallback : noCallback )( cat );
  };
}

export function birth( func ) {
  return function( config ) {
    return new Cat( func( config ));
  };
}
