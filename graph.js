class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on
  // the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes
  // property on the graph
  addVertices(vertexArray) {
    if (!vertexArray.length) return ;
    this.nodes.add(vertexArray.pop())
    return this.addVertices(vertexArray)
  }

  // this function accepts two vertices and updates their adjacent values to
  // include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to
  // remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property,
  // it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    while (vertex.adjacent.length) {
      removeEdge(vertex, [...vertex.adjacent][0])
    }
    this.nodes.delete(vertex)
  }

  depthFirstHelper(vertex, found) {
    found.push(vertex.value)

    let adjacents = [...vertex.adjacent]

    for (let i = 0; i < adjacents.length; i++) {
      const adjacent = adjacents[i];
      if (!found.includes(adjacent.value)) this.depthFirstHelper(adjacent, found);
    }

    return found
  }
  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let found = [];
    return this.depthFirstHelper(start, found)
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {

    let [found, queue] = [[], []];

    found.push(start.value);
    queue.push(start);

    while (queue.length) {
      const vertex = queue.shift();

      let adjacents = [...vertex.adjacent]

      for (let i = 0; i < adjacents.length; i++) {
        const adjacent = adjacents[i];

        if (!found.includes(adjacent.value)) {
          found.push(adjacent.value);
          queue.push(adjacent);
        }
      }
    }
    return found;
  }
}
let graph = new Graph();
let S = new Node("S");
let P = new Node("P");
let U = new Node("U");
let X = new Node("X");
let Q = new Node("Q");
let Y = new Node("Y");
let V = new Node("V");
let R = new Node("R");
let W = new Node("W");
let T = new Node("T");

graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

graph.breadthFirstSearch(S)

module.exports = {Graph, Node}