function quickSort(arr) {
    if (arr.length <= 1) return arr;

    let pivotIndex = Math.floor(arr.length / 2);
    let privot = arr.splice(pivotIndex, 1)[0];
    let left = [],
        right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= privot) left.push(arr[i]);
        if (arr[i] > privot) right.push(arr[i]);
    }

    return quickSort(left).concat(privot, quickSort(right));
}

function quickes6(arr) {

    if (!arr.length) {
        return []
    }

    const [pivot, ...rest] = arr

    return [

        ...quickes6(rest.filter(x => x < pivot)),

        pivot,

        ...quickes6(rest.filter(x => x >= pivot))

    ]

}

let testArr = [85, 24, 24 , 63, 45, 17, 31, 31, 96, 50];
let test;

// let testArr1 = quickSort(testArr);
// console.log(testArr, testArr1);

let testArr2 = quickes6(test);
console.log(testArr, testArr2);