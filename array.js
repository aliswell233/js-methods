// 扁平化
function flatter1(arr) {
  if (!arr.length) return;
  return arr.reduce(
    (pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur];
  }, []);
}

function flatter2(arr) {
    if (!arr.length) return;
    while(arr.some((item)=>Array.isArray(item))){
        arr = [].concat(...arr)
        console.log('arr', arr);
    } 
    return arr
  }

// 数组驱虫
function uniqueArr(arr){
    return [...new Set(arr)]
}

const tem = [1,3,1]
console.log(typeof new Set(tem));


Array.prototype.reduce = function(callback, pre){
  for(let i = 0; i < this.length ; i++){
    if(!pre){
      pre = callback( this[i] , this[i+1], i + 1, this)
      i++
    }else{
      pre = callback(pre, this[i], i , this)
    }
  }
  
  return pre
}

Array.prototype.flat = function(arr, dep = 1){

}


function compose(){
  
}

