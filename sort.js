/** 冒泡排序 */
function bubbleSort(arr){
    const len = arr.length
    for(let i = 0; i < len ; i++){
        for(let j =0; j< len - 1; j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr
}
console.log(bubbleSort([5,2,3,4,1]))

// 选择排序
function selectSort(arr){
    const len = arr.length
    let minIndex = 0
    for(let i = 0; i < len - 1 ; i++){
        minIndex = i
        for(let j = i; j< len ; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
 
    return arr
}
console.log(selectSort([5,2,3,4,1]))

// 插入排序
function insertSort(arr){
    const len = arr.length
    for(let i = 1 ; i < len  ; i++){
        let j = i
        let target = arr[j]
        while(j > 0 && arr[j -1] > target){
            arr[j] = arr[j - 1] 
            j--
        }
        arr[j] = target
    }
    return arr
}
console.log(insertSort([5,2,3,4,1]))


// 快速排序
function quickSort(arr){
    if(arr.length < 2){
        return arr
    }
    const cur = arr[arr.length - 1]
    const lef = arr.filter((item, index)=> item <= cur && index!== arr.length -1 )
    const right = arr.filter((item)=> item > cur)
    return [...quickSort(lef), cur , ...quickSort(right)]
}
console.log(quickSort([5,2,3,4,1]));

// 归并排序
function merge(left,right){
    let i = 0 , j = 0, res = []
    while(i < left.length && j < right.length){
        if(left[i] < right[j]){
            res.push(left[i++])
        }else{
            res.push(right[j++])
        }
    }
    // 如果left right 有一个遍历完了
    if(i < left.length){
        res.push(...left.slice(i))
    }else{
        res.push(...right.slice(j))
    }
    return res
}
function mergeSort(arr){
    if(arr.length < 2){
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))
    return merge(left, right)
}
console.log(mergeSort([5,2,3,4,1]));