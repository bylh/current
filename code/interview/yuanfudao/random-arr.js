let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let ts = [1 ,2 , 3, 4, 5];


// Shuffle, 打乱一个数组

// 方法一，并非真正的 shuffle
console.log(arr.sort((a, b) => Math.random() - .5))

console.log(ts.sort((a,b) => false));
