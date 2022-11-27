const Node = (data, left = null, right = null) => {
  return {
    data,
    left,
    right,
  };
};

const Tree = (arr) => {
  let root = buildTree(arr, 0, arr.length - 1);

  const insert = (num, node = root) => {
    if (node.data === num) {
      console.log("Value already exists");
      return;
    }
    if (node.left === null && node.right === null) {
      let nodeToInsert = Node(num);
      if (num < node.data) {
        node.left = nodeToInsert;
      } else {
        node.right = nodeToInsert;
      }
      return;
    }
    if (num < node.data) {
      return insert(num, node.left);
    } else {
      return insert(num, node.right);
    }
  };
  return { root, insert };
};

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  let mid = parseInt((start + end) / 2);
  let node = Node(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const leftSide = arr.slice(0, mid);
  const rightSide = arr.slice(mid, arr.length);
  return merge(mergeSort(leftSide), mergeSort(rightSide));
};

const merge = (left, right) => {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else if (left[0] === right[0]) {
      left.shift();
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());

  return result;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let ana = mergeSort([8, 43, 2, 6, 8, 34, 1, 8, 11, 6]);
console.log(ana);
let anaTree = Tree(ana);
console.log(prettyPrint(anaTree.root));
anaTree.insert(5);
console.log(prettyPrint(anaTree.root));
