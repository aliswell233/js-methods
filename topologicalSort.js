// 初始化入度为 0 的顶点
// 将入度为 0 的节点加入队列
// 进行拓扑排序
// 如果图中有环，拓扑排序是不可能的

// {
//     "A": ["B", "C"],
//     "B": ["D", "E"],
//     "C": ["E"],
//     "D": [],
//     "E": []
// }
// 将入度为 0 的节点加入队列
// { A: 0, B: 1, C: 1, D: 1, E: 2 }

// 将入度为 0 的节点加入队列
// [ 'A' ]


function topologicalSort(graph) {
    const inDegree = {};
    const result = [];
    const queue = [];

    // 初始化入度为 0 的顶点
    for (let node in graph) {
        inDegree[node] = 0;
    }
    for (let node in graph) {
        graph[node].forEach(neighbor => {
            inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
        });
    }

    console.log('inDegree111', inDegree);

    // 将入度为 0 的节点加入队列
    for (let node in inDegree) {
        if (inDegree[node] === 0) {
            queue.push(node);
        }
    }

    console.log('queue', queue);

    // 进行拓扑排序
    while (queue.length) {
        const node = queue.shift();
        result.push(node);
        
        graph[node].forEach(neighbor => {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        });
    }

    // 如果图中有环，拓扑排序是不可能的
    if (result.length !== Object.keys(graph).length) {
        throw new Error("Graph has a cycle, topological sorting is not possible");
    }

    return result;
}

// function topologicalSort(graph){
//     let queue = []
//     let du = {}
//     let ans = []

//     for(let item in graph ){
//         du[item] = 0
//     }
//     for(let item in graph ){
//         graph[item].forEach((ele)=>{
//           du[ele] = (du[ele] || 0) + 1
//         })
//     }
//     for(let item in du){
//         if(du[item] === 0){
//             queue.push(item)
//         }
//     }

//     while(queue.length){
//         const q =  queue.shift()
//         ans.push(q)

//         graph[q].forEach((ele)=>{
//             du[ele]--
//             if(du[ele] === 0){
//                 queue.push(ele)
//             }
//         })
//     }

//     if(ans.length !== Object.keys(graph).length ){
//         throw new Error('dd')
//     }

//     return ans
// }

// 示例图
const graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["E"],
    "D": [],
    "E": []
};

console.log(topologicalSort(graph)); // 输出: [ 'A', 'C', 'B', 'E', 'D' ]






