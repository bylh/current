import * as moment from 'moment';
import * as lodash from 'lodash';
// import _defaultsDeep from 'lodash/defaultsDeep';
import defaultsDeep = require('lodash/defaultsDeep');
import { loadavg } from 'os';
interface ICache{
    useCache:boolean;
    [propName:string]:any;
}
const cache:ICache = {useCache:true};
console.log('test123', cache, moment());

interface A extends B {
    x: number,
}
interface B {
    y: number,
}
let a: A = {
    x: 1,
    y: 2
}
let b: B = {y: 10};

interface LabelledValue {
    label: string;
  }
  
  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj);
  }
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel({size: 10, label: "Size 10 Object"} as LabelledValue);
  console.log(defaultsDeep(b, a));

  let c = {
      a: 1,
      b: 2,
      c: 3
  };
  let d = {
      a: 4,
      b: 4
  }
//   console.log(lodash.omit(c, ['c']));
//   console.log(lodash.assign(c, d));
//   console.log(lodash.defaults(d, c));
// console.log({
//     ...c,
//     a: 5
// });
console.log(lodash.pick(c, ['a', 'b', 'd']));
  
  