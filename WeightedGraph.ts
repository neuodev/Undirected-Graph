class PriorityQueue {
  values;
  constructor() {
    this.values = [];
  }
  enqueue(val, protity) {
    this.values.push({ val, protity });
    this.bubbleUp();
  }

  bubbleUp() {
    var idx = this.values.length - 1;
    var element = this.values[idx];
    while (idx > 0) {
      var parentIdx = Math.floor((idx - 1) / 2);
      var parent = this.values[parentIdx];
      if (element.protity >= parent.protity) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  isEmpty() {
    return this.values.length === 0;
  }

  dequeue() {
    if (this.values.length > 0) {
      [this.values[0], this.values[this.values.length - 1]] = [
        this.values[this.values.length - 1],
        this.values[0],
      ];
    }
    var removed = this.values.pop();
    this.bubbleDown();

    return removed;
  }

  bubbleDown() {
    var idx = 0;
    var length = this.values.length;
    var element = this.values[0];
    while (true) {
      var leftChildIdx = 2 * idx + 1;
      var rightChildIdx = 2 * idx + 2;
      var leftChild, rightChild;
      var swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.protity < element.protity) {
          swap = leftChildIdx;
        }
      }

      if (
        (rightChildIdx < length && swap === null) ||
        (swap !== null && rightChild < leftChild)
      ) {
        // inside the boundary
        swap = rightChildIdx;
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }

    return this.values;
  }
}

class Vertex {
  adjacencyList: Edge[];
  constructor(public label: string) {
    this.label = label;
    this.adjacencyList = [];
  }

  addEdge(to: string, weight: number) {
    this.adjacencyList.push(new Edge(this.label, to, weight));
  }
}

class Edge {
  constructor(public from: string, public to: string, public weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

class Graph {
  map = {};
  addNode(val) {
    const node = new Vertex(val);
    if (!this.map[val]) this.map[val] = node;
  }
  addEdge(from: string, to: string, weight: number) {
    if (!this.map[from] || !this.map[to] || from == to) return;

    this.map[from].addEdge(to, weight);
    this.map[to].addEdge(from, weight);
  }
  print() {
    let set = new Set();
    for (let node in this.map) {
      let current = this.map[node];
      for (let edge of current.adjacencyList) {
        set.add(`${edge.from} -> ${edge.to} (W:${edge.weight})`);
      }
    }

    return set;
  }
  // Dijkstra's Algorithm
  shortestDistance(from, to) {
    from = this.map[from];
    if (!from || !to) return;
    let distances = this._initDistance();
    distances[from.label] = 0;

    let previousNodes = {};
    let visited = new Set();
    let PQ = new PriorityQueue();
    PQ.enqueue(from.label, 0);
    while (!PQ.isEmpty()) {
      let current = this.map[PQ.dequeue().val];
      visited.add(current.label);

      for (let n of current.adjacencyList) {
        if (visited.has(n.to)) continue;

        let newDistance = distances[current.label] + n.weight;

        if (newDistance < distances[n.to]) {
          distances[n.to] = newDistance;
          previousNodes[n.to] = current.label;
          PQ.enqueue(n.to, n.weight);
        }
      }
    }

    return distances[to];
  }

  _initDistance() {
    let hashTable = {};
    for (let n in this.map) {
      hashTable[n] = Infinity;
    }

    return hashTable;
  }

  cycleDetection() {
    let visited = new Set();
    for (let node in this.map) {
      const currentNode = this.map[node];
      if (
        !visited.has(currentNode.label) &&
        this._cycleDetection(currentNode, visited, '')
      ) {
        return true;
      }
    }
    return false;
  }
  _cycleDetection(node: Vertex, visited, from: string) {
    const adjacencyList = node.adjacencyList;
    visited.add(node.label);
    for (let n of adjacencyList) {
      if (n.to == from) continue;
      if (visited.has(n.to)) return true;

      let nextNode = this.map[n.to];
      if (this._cycleDetection(nextNode, visited, node.label)) {
        return true;
      }
    }
    return false;
  }

  //@ Prim's algorithm:
  // Extend the tree by adding the smallest connected edge
  minimumSpanningTree() {
    const PQ = new PriorityQueue();
    let visited = new Set();
    let spanningTree = new Set();
    let node = Object.keys(this.map)[0];
    if (!node) return;
    PQ.enqueue(this.map[node], 0);
    while (!PQ.isEmpty()) {
      let currentNode = PQ.dequeue().val;
      visited.add(currentNode.label);
      spanningTree.add(currentNode.label);
      let adjacencyList = currentNode.adjacencyList;
      for (let n of adjacencyList) {
        if (visited.has(n.to)) continue;
        PQ.enqueue(this.map[n.to], n.weight);
      }
    }
    console.log(spanningTree);
    return spanningTree;
  }
}

const graph = new Graph();
// graph.addNode('A');
// graph.addNode('B');
// graph.addNode('C');
// graph.addNode('D');
// graph.addNode('E');
// graph.addEdge('A', 'B', 3);
// graph.addEdge('A', 'D', 2);
// graph.addEdge('A', 'C', 4);
// graph.addEdge('B', 'E', 1);
// graph.addEdge('B', 'D', 6);
// graph.addEdge('D', 'E', 5);
// graph.addEdge('D', 'C', 1);
// graph.print();
// console.log(graph.cycleDetection());
// console.log(graph.shortestDistance('A', 'E'));
// console.log(graph.map);
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addEdge('A', 'B', 3);
graph.addEdge('A', 'C', 1);
graph.addEdge('B', 'D', 4);
graph.addEdge('B', 'C', 2);
graph.addEdge('D', 'C', 5);
graph.minimumSpanningTree();
