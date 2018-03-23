// console.log('hello');
// // interface SignItem {
// //     vrid: VertexId | RegionId,
// //     annotation: Annotation, // 备注信息，来源于顶点
// //     dist: number, // 距离，以米为单位
// //     upDist: number, // 爬升海拔，米
// //     downDist: number, // 下降海拔，米
// // }
// let item0 = {
//     id: 0,
//     aa: [
//         {
//             a: 1,
//             b: 'hello'
//         },
//         {
//             a: 2,
//             b:'dsf'
//         }
//     ]
// }
let item1 = {
    id: 1,
    vrid: 0,
    dist: 0,
    upDist: 0,
    downDist: 0
}
let item2 = {
    id: 10,
    vrid: 0,
    dist: 0,
    upDist: 0,
    downDist: 0
}
let a = [item1, item2];
console.log(a.find(item => item.vrid == 0));

let items = [{
    vrid: 0,
    dist: 0,
    upDist: 0,
    downDist: 0
}];

console.log(items.find(item => item.vrid === 0));