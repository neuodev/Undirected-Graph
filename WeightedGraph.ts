class PriorityQueue {
  values;
  constructor() {
    this.values = [];
  }
  enqueue(val) {
    this.values.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    var idx = this.values.length - 1;
    var element = this.values[idx];
    while (idx > 0) {
      var parentIdx = Math.floor((idx - 1) / 2);
      var parent = this.values[parentIdx];
      if (element >= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
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
        if (leftChild < element) {
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
    console.log(set);
    return set;
  }
  shortestDistance(node) {
    node = this.map[node];
    if (!node) return;
    let distances = {};
    let previousNodes = {};
    let visited = new Set();
    let PQ = new PriorityQueue();
    PQ.enqueue(node.label);
    while (PQ.values.length > 0) {
      let current = this.map[PQ.dequeue()];
      console.log(current);

      visited.add(node.label);
      for (let n of current.adjacencyList) {
        if (visited.has(n.from)) continue;
        PQ.enqueue(n.from);
      }
    }
    console.log(visited);
  }

  //   _shortestDistance(node: Vertex, visited , queue: string[]) {

  //   }
}

const graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addEdge('A', 'B', 2);
graph.print();
graph.shortestDistance('A');
console.log(graph.map);
