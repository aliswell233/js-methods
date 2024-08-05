class EventEmitter{
    constructor(){
        this.events = {}
    }
    on(type, callBack){
        if(!this.events[type]){
            this.events[type] = [callBack]
        }else{
            this.events[type].push(callBack)
        }
    }
    emit(type, ...arg){
        if(!this.events[type]) return
        this.events[type].forEach(callBack => {
            console.log('dd',this);
            callBack.apply(this, arg)
            // callBack(arg)
        });
    }
    off(type,callBack){
        if(!this.events[type]) return
        this.events[type].filter((item)=>{
            item !== callBack
        })
    }
    once(type,callBack){
        function fn(){
            callBack()
            this.off(type,fn)
        }
        this.on(type,fn)
    }
}


// 使用如下
const event1 = new EventEmitter();

function handle(){

  console.log(this);
};

event1.on("click", handle);

event1.emit("click", 1, 2, 3, 4);

// event.off("click", handle);

// event.emit("click", 1, 2);

// event.once("dbClick", () => {
//   console.log(123456);
// });
// event.emit("dbClick");
// event.emit("dbClick");