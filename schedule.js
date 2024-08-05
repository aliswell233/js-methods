class Scheduler{
    constructor(limit){
        this.queue = []
        this.maxCount = limit
        this.requestCount = 0
    }
    add(time , order){
     const list = ()=>{
      return  new Promise((resolve, reject)=>{
            setTimeout(()=>{
             console.log(order);
             resolve()
            },time) 
         })
     }
    this.queue.push(list)
    }
    taskStart(){
        for(let i = 0; i < this.maxCount; i++){
            this.request()
        }
    }
    request(){
        if(!this.queue.length || this.requestCount >= this.maxCount){
            return 
        }
        this.requestCount++
        this.queue.shift()().then(()=>{
            this.requestCount--;
            this.request()
        })
    }
}
  
const scheduler = new Scheduler(2)
const addTask = (time , order)=> {
    scheduler.add(time , order)
}
addTask('1000', 1)
addTask('500', 2)
addTask('300', 3)
addTask('400', 4)
scheduler.taskStart()

//   addTask
//   scheduler.add
//   this.queue.push
//   taskStart

//   for
//   request
//   this.queue.shift()
//   promiseCreator   -> setTimeout 1000

//   request
//   this.queue.shift()
//   promiseCreator   -> setTimeout 500


//   setTimeout 500
//   resolve(); 
//   then

//   request
//   this.queue.shift()
//   promiseCreator   -> setTimeout 300

//   setTimeout 300
//   resolve(); 
//   then

//   request
//   this.queue.shift()
//   promiseCreator   -> setTimeout 400

//   setTimeout 1000
//   resolve(); 
//   then

//   setTimeout 400
//   resolve(); 
//   then


