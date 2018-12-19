let tree = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
            left: null,
            right: null
        },
        right: {
            value: 5,
            left: null,
            right: null
        }
    },
    right: {
        value: 3,
        left: {
            value: 6,
            left: null,
            right: null
        },
        right: {
            value: 7,
            left: null,
            right: null
        }
    }
}

// 按行输出二叉树

let queue = [tree];
function generate() {
    if(queue.length === 0) return;
    let item = queue.shift();
    console.log(item.value);
    if(item.left) queue.push(item.left);
    if(item.right) queue.push(item.right);

    generate()
}

generate();