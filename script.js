const Node = (data, left = null, right = null) => {
  return {
    data,
    left,
    right,
  };
};

const Tree = (arr) => {
  let root = buildTree(arr, 0, arr.length - 1);
  const getRoot = () => root;

  const insertNode = (num, node = root) => {
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
      return insertNode(num, node.left);
    } else {
      return insertNode(num, node.right);
    }
  };

  const deleteNode = (num, node = root) => {
    if (node === null) {
      return node;
    }

    if (num < node.data) {
      node.left = deleteNode(num, node.left);
    } else if (num > node.data) {
      node.right = deleteNode(num, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      node.data = minValue(node.right);
      node.right = deleteNode(node.data, node.right);
    }
    return node;
  };

  function minValue(node) {
    let minv = node.data;
    while (node.left != null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  }

  const findNode = (num, node = root) => {
    if (num < node.data) {
      node = node.left;
      findNode(num, node);
    } else if (num > node.data) {
      node = node.right;
      findNode(num, node);
    }

    return node;
  };

  const height = (node = root) => {
    if (node === null) {
      return 0;
    }
    return (
      1 +
      Math.max(
        node.left !== null ? height(node.left) : -1,
        node.right !== null ? height(node.right) : -1
      )
    );
  };

  const depth = (num, node = root) => {
    if (num < node.data) {
      return 1 + depth(num, node.left);
    } else if (num > node.data) {
      return 1 + depth(num, node.right);
    } else {
      return 0;
    }
  };

  const isBalanced = (node = root) => {
    if (node.left === null || node.right === null) {
      if (Math.abs(height(node.left) - height(node.right)) <= 1) {
        return true;
      } else {
        return false;
      }
    }
    if (Math.abs(height(node.left) - height(node.right)) <= 1) {
      return true * isBalanced(node.left) * isBalanced(node.right);
    } else {
      return false;
    }
  };

  const getArray = (arr, node = root) => {
    if (node === null) {
      return;
    }
    arr.push(node.data);
    getArray(arr, node.left);
    getArray(arr, node.right);
    return arr;
  };

  const rebalance = () => {
    let newArr = mergeSort(getArray([]));
    root = buildTree(newArr, 0, newArr.length - 1);
    console.log(root);
  };

  return {
    getRoot,
    insertNode,
    deleteNode,
    findNode,
    height,
    depth,
    isBalanced,
    rebalance,
  };
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
prettyPrint(anaTree.getRoot());
anaTree.deleteNode(2);
anaTree.insertNode(10);
anaTree.deleteNode(1);
prettyPrint(anaTree.getRoot());
anaTree.rebalance();
prettyPrint(anaTree.getRoot());
