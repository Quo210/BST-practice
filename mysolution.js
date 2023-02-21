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
        console.log('A new tree has been created.')
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
            console.log('a new node was created using ', key)
            root = new Node(key);
            return root
        };
        if(key < root.data){
            //console.log(key,'key is Lower ',root.data)
            root.left = this.insert(root.left,key);
        } else if(key > root.data){
            //console.log(key,'key is bigger ',root.data)
            root.right = this.insert(root.right,key);
        } else {//If key == root.data
            console.error(`Can not have duplicate values. ${key} was not added to the tree.}`)
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
        //console.log('Case: Executing search of matching node for: ', key);
        //find the node with the matching value
        if(key < root.data){
            //console.log('Case: Redirecting to left tree')
            root.left = this.deleteNum(root.left,key)
        } else if (key > root.data){
            //console.log('Case: Redirecting to right tree')
            //console.log(this.deleteNum(root.right,key))
            root.right = this.deleteNum(root.right,key)
            //console.log('Status of right root: ', root.right)
        } else {//Matching find. Elaborate the 3 cases
            switch(true){
                case (root.left == null && root.right == null):
                    //console.log('Case: Node has no children')
                    root = null;
                    return root;
                    break;
                case (root.left == null):
                    //console.log('Case: Node has no left children')
                    root = root.right;
                    return root;
                    break;
                case (root.right == null):
                    //console.log('Case: Node has no right children')
                    root = root.left;
                    return root;
                    break;
                default: // Node to deleteNum has at least 1 child on each side
                //console.log('Case: Node has left and right children')
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
        //console.log('Searching',num,'on',root)
        if(root == null){
            console.log('NOT FOUND')
            return root
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
    levelOrder(func,obj = {}){
        const traversal = [];
        const queue = [this.root];
        while (queue.length != 0){
            const ref = queue[0];
            traversal.push(ref.data);
            if(func != undefined){ func(ref) }
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
                'Should never reach here'
        };
        print += ' ' + ref.data;
        storage.shift()
        return this.recurseLvlOr(storage,print);
    };
    preOrder(root = this.root,storage = []){
        if(root == null){
            return storage
        };
        storage.push(root.data);
        this.preOrder(root.left,storage);
        this.preOrder(root.right,storage);
        return storage
    };
    inOrder(root = this.root,storage = []){
        if(root == null){
            return storage
        };
        this.inOrder(root.left,storage);
        storage.push(root.data);
        this.inOrder(root.right,storage);
        return storage
    };
    postOrder(root = this.root,storage = []){
        if(root == null){
            return storage
        };
        this.postOrder(root.left,storage);
        this.postOrder(root.right,storage);
        storage.push(root.data);
        return storage
    };
    height(node = this.root){//find the height of a node in the tree
        if (node == null){
            return -1
        }
        let leftH = this.height(node.left);
        let rightH = this.height(node.right);
        return Math.max(leftH,rightH) + 1
    };
    findDepth(nodeNum){
        const find = this.findNum(nodeNum);
        const value = (find)? find.data : null;
        if (!value){ return `${nodeNum} NOT FOUND`};
        let pointer = this.root;
        let depth = 0;
        while(pointer != null && pointer.data != value){
            if(value < pointer.data){
                pointer = pointer.left;
                depth++
            } else if (value > pointer.data) {
                pointer = pointer.right;
                depth++;
            } else return depth
        }
        return `Depth for ${nodeNum} is: ` + depth
    }
    isBalanced(){
        let status = { 'isBalanced' : true };
        this.levelOrder((node)=>{
            if (status.isBalanced == false){
                return status
            }
            if(node == null){
                //do nothing
            } else {
                //console.log(node,`node was not null`)
                let left = this.height(node.left);
                let right = this.height(node.right);
                if(left > right){
                    let calc = left - right;
                    //console.log(`${left} larger than ${right}`, `difference is ${calc} levels of depth`)
                    if( calc > 1) status.isBalanced = false;
                } else if (left < right){
                    let calc = right - left;
                    //console.log(`${right} larger than ${left}`, `difference is ${calc}}`)
                    if( calc > 1) status.isBalanced = false;
                } else {
                    //console.log(`${left} is as balanced ${right}`)
                }
            }
        }, status);
        return `The current Binary Tree can be considered ${(status.isBalanced == false)? 'not balanced' : 'balanced.'}`
    };
    rebalance(){
        const data = this.inOrder();
        this.root = this.buildTree(data, 0, data.length -1)
        console.log('The tree has been rebalanced.')
        return this.root
    }

};

function makeRandoNumArr(num){
    if (num > 200){
        num = 200
    };
    const store = [];
    for (let i = 0; i < num; i++){
        store.push(
            Math.floor( Math.random() * 1000) + 1 
        );
    }
    return store
}
    
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};
// 0. Create Array of random numbers
const ara = makeRandoNumArr(30);
// 1. Create BST
const myTree = new Tree(ara); 
// 2. Check and confirm the tree being balanced;
console.log( myTree.isBalanced() ) 
// Show tree on console
prettyPrint(myTree.root);
// 3. Print elements in pre, post and in order 
console.log('Tree data read preOrder: ', myTree.preOrder())
console.log('Tree data read postOrder: ', myTree.postOrder())
console.log('Tree data read inOrder: ', myTree.inOrder())
// 4. Unbalance the tree
myTree.insert(myTree.root,167)
myTree.insert(myTree.root,268)
myTree.insert(myTree.root,371)
myTree.insert(myTree.root,72)
myTree.insert(myTree.root,173)
myTree.insert(myTree.root,275)
// 5. Confirm that tree is unbalanced
console.log( myTree.isBalanced() );
// show unbalanced tree
prettyPrint(myTree.root);
// 6. Balance the tree
myTree.rebalance();
// 7. Confirm that tree has been rebalanced
console.log( myTree.isBalanced() );
// show rebalanced tree
prettyPrint(myTree.root);
// 8. Print all elements in pre, post and in order 
console.log('Tree data read preOrder: ', myTree.preOrder())
console.log('Tree data read postOrder: ', myTree.postOrder())
console.log('Tree data read inOrder: ', myTree.inOrder())

