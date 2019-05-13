import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import is from 'whatitis';
export var Cat = function Cat(properties) {
  _classCallCheck(this, Cat);

  is.Object(properties) ? Object.assign(this, properties) : this.value = properties;
};

function getValue(cat) {
  return cat.value;
}

export var isInclude = [].includes(1);
export function choice(yesCallback, noCallback) {
  return function (cat) {
    return (getValue(cat) ? yesCallback : noCallback)(cat);
  };
}