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