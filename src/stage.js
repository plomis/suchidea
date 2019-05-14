
import env from 'whatenvis';
import addEventListener from 'add-dom-event-listener';


function handleWheel( e ) {
  const delta = ( env.firefox ? 3 : 1 ) * e.delta;
  if ( delta > 0 ) { // 向上
    console.log( "下:", delta );
  } else if ( delta < 0 ) { // 向下
    console.log( "上:", delta );
  }
}

export default function( config ) {

  const container = config.dom;
  const eventName = env.firefox ? 'DOMMouseScroll' : 'mousewheel';
  const wheelListener = addEventListener( container, eventName, handleWheel );
  const handleWrap = document.createElement( 'div' );
  container.appendChild( handleWrap );

  return {
    destory() {
      wheelListener.remove();
    }
  };
}
