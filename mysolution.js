class Node {
    constructor(data = null){
        this.data = data;
        this.left = null;
        this.right = null;
    }
};
class Tree {
    constructor(arr){
        var cleansed = this.#cleanseInput(arr);
        this.root = this.buildTree(cleansed, 0, cleansed.length - 1);
    };
    #cleanseInput(arr){
        return Array.from (new Set(arr.sort((a,b)=>a-b)))
    };
    buildTree(arr,s,e){
        let start = s;
        let end = e;
        if(start>end){return null};
        const rootIndex = Math.floor(
            parseInt( (start + end) / 2)
            ); 
        const rootNode = new Node(arr[rootIndex]);
        rootNode.left = this.buildTree(arr, start, rootIndex-1);
        rootNode.right = this.buildTree(arr, rootIndex+1, end);
        return rootNode
    }
};
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};
const ara = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//var ara = [1, 2, 3, 4, 5, 6, 7,123,11,15,23,123,123,121,1,2,5,9,10,22,89,74,21,1040];
const myTree = new Tree(ara);
prettyPrint(myTree.root);