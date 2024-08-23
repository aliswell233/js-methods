function parseInput(input) {
  // 按换行符分割输入
  const lines = input.trim().split('\n');
  
  // 第一个数字表示模块总数
  const N = parseInt(lines[0], 10);
  
  // 解析依赖关系
  const dependencies = lines.slice(1).map(line => line.split(' ').map(Number));
  
  return { N, dependencies };
}

function calculateBatchInitializationTimes(N, dependencies) {
  const graph = Array.from({ length: N }, () => []);
  const inDegree = Array(N).fill(0);

  dependencies.forEach((deps, i) => {
      const depCount = deps[0];
      for (let j = 1; j <= depCount; j++) {
          const dependency = deps[j] - 1; // 转换为 0 索引
          graph[dependency].push(i);
          inDegree[i] += 1;
      }
  });

  const queue = [];
  for (let i = 0; i < N; i++) {
      if (inDegree[i] === 0) {
          queue.push(i);
      }
  }

  let batchCount = 0;
  let processedModules = 0;

  while (queue.length > 0) {
      batchCount += 1;
      const currentBatchSize = queue.length;

      for (let i = 0; i < currentBatchSize; i++) {
          const module = queue.shift();
          processedModules += 1;

          graph[module].forEach(neighbor => {
              inDegree[neighbor] -= 1;
              if (inDegree[neighbor] === 0) {
                  queue.push(neighbor);
              }
          });
      }
  }

  if (processedModules !== N) {
      return -1;
  }

  return batchCount;
}

// 示例输入字符串
const input = `5
3 2 3 4
1 5
1 5
1 5
0`;

const { N, dependencies } = parseInput(input);
const result = calculateBatchInitializationTimes(N, dependencies);
console.log(result);  // 输出: 3
