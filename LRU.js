class Node {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }

class LRUCache {
    constructor(capacity){
        // 容量 map(key, node) 头结点 尾结点 头尾互相指定
    }
    get(key){
        // if map找不到  返回-1
        //  else map找得到 把结点移动到开头 moveToHead()
    }
    put(key, value){
        // if map的到 1更新map的node.val  2moveToHead（） 
        // else map找不到1 map.set 2addNode（）3是否超过容量，超过要删除最后一个popTail并且map.delete
    }
    moveToHead(node){
        // 删除结点 removeNode
        // 在头部添加结点 addNode
    }
    removeNode(node){
        // 找到上一个和下一个， 指定指针
    }
    addNode(node){
        // 指定node的next pre 为 this.head.next , this.head
        // this.head.next.pre = node
        // this.head.next = node
    }
    popTail(){
        // 因为head和tail都是空。 所以tail的前一个才是尾结点
        // removeNode（tail.pre）
    }
}



