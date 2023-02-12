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
    };
    insert(root,key){
        if (root == null){
            console.log(key,'a new node was created due to ', root)
            root = new Node(key);
            return root
        };
        if(key < root.data){
            console.log(key,'key is Lower ',root.data)
            root.left = this.insert(root.left,key);
        } else if(key > root.data){
            console.log(key,'key is bigger ',root.data)
            root.right = this.insert(root.right,key);
        } else {//If key == root.data
            console.error('Can not have duplicate values.')
        }
        return root
    };
    get getRoot(){
        return this.root
    };
    deleteNum(root,key){
        //case 1 - tree is empty
        if (root == null){
            return null
        };
        console.log('Case: Executing search of matching node for: ', key);
        //find the node with the matching value
        if(key < root.data){
            console.log('Case: Redirecting to left tree')
            root.left = this.deleteNum(root.left,key)
        } else if (key > root.data){
            console.log('Case: Redirecting to right tree')
            console.log(this.deleteNum(root.right,key))
            root.right = this.deleteNum(root.right,key)
            console.log('Status of right root: ', root.right)
        } else {//Matching find. Elaborate the 3 cases
            switch(true){
                case (root.left == null && root.right == null):
                    console.log('Case: Node has no children')
                    root = null;
                    return root;
                    break;
                case (root.left == null):
                    console.log('Case: Node has no left children')
                    root = root.right;
                    return root;
                    break;
                case (root.right == null):
                    console.log('Case: Node has no right children')
                    root = root.left;
                    return root;
                    break;
                default: // Node to deleteNum has at least 1 child on each side
                console.log('Case: Node has left and right children')
                let succesor = this.findSuccesor(root.right);
                root.data = succesor;
                root.right = this.deleteNum(root.right,succesor);
                return root;
                break
            };
            return root
        };
        console.log('Returning root:',root)
        return root
    };
    findSuccesor(root){//right side version
        let succesor = root.data;
        while (root.left != null){
            succesor = root.left.data;
            root = root.left;
        } 
        return succesor
    };
    findNum(num,root = this.root){
        console.log('Searching',num,'on',root)
        if(root == null){
            console.log('NOT FOUND')
            return num
        };
        if(num < root.data){
            return this.findNum(num,root.left)
        } else if (num > root.data){
            return this.findNum(num,root.right)
        } else if (num == root.data) {
            return root
        } else {
            return false
        }
    };
    levelOrder(){
        const traversal = [];
        const queue = [this.root];
        while (queue.length != 0){
            const ref = queue[0];
            traversal.push(ref.data);
                if(ref.left != null){ queue.push(ref.left) }
                if(ref.right != null){ queue.push(ref.right) }
                queue.shift()
        };
        return traversal
    };
    recurseLvlOr(storage = [this.root], print = ''){
        const ref = (storage.length > 0)? storage[0] : null;
        switch(true){
            case (ref == null):
                return print;
                break;
            case (ref.left != null):
                storage.push(ref.left);      
            case (ref.right != null):
                storage.push(ref.right);
            default:
                'Wut'
        };
        print += ' ' + ref.data;
        storage.shift()
        return this.recurseLvlOr(storage,print);
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
//const ara = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
var ara = [1, 2, 3, 4, 5, 6, 7,123,11,15,23,123,123,121,1,2,5,9,10,22,89,74,21,1040];
const myTree = new Tree(ara);
//myTree.insert(myTree.root,67)
//myTree.deleteNum(myTree.root,4)
//myTree.deleteNum(myTree.root,89)
//myTree.deleteNum(myTree.root,123)
//myTree.deleteNum(myTree.root,7)
//console.log(myTree.findNum(26))
//console.log(myTree.levelOrder())
console.log(myTree.recurseLvlOr())
prettyPrint(myTree.root);