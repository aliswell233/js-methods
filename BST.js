class Node{
    constructor(val){
        this.value = val
        this.left = null
        this.right = null
    }
}

class BST{
    constructor(root){
        root = null
    }

    insert(val){
        const newNode = new Node(val)
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode){
        if (newNode.value < node.value) {
            if(node.left === null){
                node.left = newNode;
            }else{
                this.insertNode(node.left, newNode);
            }
        }else{
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(value){
        return this.searchNode(this.root, value);
    }

    searchNode(node, value){
        if (node === null) {
            return false;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true;
        }
    }

    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, value){
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else{
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            // 找比下一个右结点 最小的左节点
            const aux = this.findMinNode(node.right);
            node.value = aux.value; // 先替换

            node.right = this.removeNode(node.right, aux.value); // 再最小的左节点删值
            return node;
        }
    }

    // 辅助方法：找到最小节点
    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}