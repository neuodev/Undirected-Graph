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
