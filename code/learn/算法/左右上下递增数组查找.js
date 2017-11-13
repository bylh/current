/*
00 01 02
10 11 12
20 21 22
基本思想就是从左下角开始查找，大于往上走，小于往右走
*/

let a = [
    [0, 1, 2, 3],
    [4, 5, 6, 7]
];
console.log(a.length, a[0].length);
for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
        console.log(a[i][j]);
    }
}

function find(target, array) {
    let row = array.length;
    let col = array[0].length;
    for (let i = row - 1, j = 0; i >= 0 && j < col;) {
        if (target > array[i][j]) {
            j++;
        } else if (target < array[i][j]) {
            i--;
        } else {
            return true;
        }

    }
    return false;
}
console.log(find(2, a));