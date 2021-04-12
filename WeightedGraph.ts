class Vertex {
  constructor(public node: string) {
    this.node = node;
  }
}

class Edge {
  constructor(public from: string, public to: string, public weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}
