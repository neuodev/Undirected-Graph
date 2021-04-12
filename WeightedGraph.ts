class NodeClass {
  constructor(public val, public priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  values;
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    var node = new NodeClass(val, priority);
    this.values.push(node);
    this.bubbleUp();
  }

  bubbleUp() {
    var idx = this.values.length - 1;
    var element = this.values[idx];
    while (idx > 0) {
      var parentIdx = Math.floor((idx - 1) / 2);
      var parent = this.values[parentIdx];
      if (element.priority <= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    console.log(this.values);
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
        if (leftChild.priority > element.priority) {
          swap = leftChildIdx;
        }
      }

      if (
        (rightChildIdx < length && swap === null) ||
        (swap !== null && rightChild > leftChild)
      ) {
        // inside the boundary
        swap = rightChildIdx;
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
    console.log(this.values);
    return this.values;
  }
}

var PQ = new PriorityQueue();

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
}

const graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addEdge('A', 'B', 2);
graph.print();
console.log(graph.map);
