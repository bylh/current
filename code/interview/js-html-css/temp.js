/**
 * 题目1
 * 给数组增加功能函数
 * 使用array.prototype完成
 */


const a = [1, 2, 3, 4, 5];
function multiply() {
    let squ = [];
    for (i = 0; i < this.length; i++) {
        squ.push(Math.pow(this[i], 2));
    }
    this.push(...squ);
}
Array.prototype.multiply = multiply;
a.multiply();
console.log(a);

/*
题目2
js浮点数保存
参考 https://segmentfault.com/a/1190000012175422
*/
console.log(0.1 + 0.2 === 0.3);  // false
console.log(0.1 + 0.1 === 0.2); // true


/**
 * 题目3
 * symbol
 * 参考 https://zhuanlan.zhihu.com/p/22652486
 */
const x = {
    key1: Symbol(), // 
    key2: 10
}
console.log(JSON.stringify(x));

// 结果： {"key2":10}， symbol结果是非字符串不能stringify
console.log(x.key1); // Symbol() 值是看不到的

/** 
 * proxy 双向绑定等
*/

let handler = {
    get: function(target, name){
        return name in target ? target[name] : 37;
    }
};

let p = new Proxy({}, handler);

p.a = 1;
p.b = undefined;

console.log(p.a, p.b);    // 1, undefined

console.log('c' in p, p.c);    // false, 37