console.log(a, b)
var a = b = 12
function foo(){
// 2
    console.log(a, b)
// 3
    var a = b = 13
    console.log(a, b)
}
foo()
console.log(a, b)




var a = undefined
var b = undefined
function foo(){
       var a  = undefined
       var b = undefined
    // 2
        console.log(a, b)
    // 3
        a = b =13
        console.log(a, b)
    }
a = 12
b ='林一一'