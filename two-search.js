function search(arr, target , start , end){
    const mid  = Math.floor((start + end) / 2)
    
    if(arr[mid] === target){
        return mid
    }
    if(start > end){
        return -1
    }
    if(arr[mid] < target){
       return  search(arr, target, mid + 1, end)
    }else{
       return  search(arr, target, start, mid -1)
    }
}



const dataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const position = search(dataArr, 6, 0, dataArr.length - 1);
if (position !== -1) {
  console.log(`目标元素在数组中的位置:${position}`);
} else {
  console.log("目标元素不在数组中");
}
