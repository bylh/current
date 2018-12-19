let N = 10
let source = []

let M = 4

for (let i = 0; i < N; i++) {
    let len = Math.floor(Math.random() * 5) + 5
    let item = []
    for (let j = 0; j < len; j++) item.push(Math.floor(Math.random() * 10))
    source.push(item)
}
console.log(source);
// 1. n 个数组，取其中第M大的数
// Your Code Here

let res = source.reduce((arr, v) => arr.concat(v), [])
            .sort()
            .reverse()

if (M < 0 || M > res.length - 1) {
    console.error('Exceeded')
} else {
    console.log(res[M - 1])
}