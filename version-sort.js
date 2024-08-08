function versionSort(arr){
   arr.sort((v1 , v2)=>{
    let i = 0
    const arr1 = v1.split('.')
    const arr2 = v2.split('.')
    while(true){
        const s1 = arr1[i]
        const s2 = arr2[i]
        i++
        if(s1 === undefined || s2 === undefined){
            return arr2.length - arr1.length
        }
        if(s1 === s2) continue
        return s2 - s1
    }
   }) 
   return arr
}

console.log(versionSort(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']))