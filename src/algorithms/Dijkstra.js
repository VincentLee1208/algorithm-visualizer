import { getUnvisitedNeighbours } from '../helpers/general_helper';
import { PriorityQueue } from '../helpers/PriorityQueue';

const dijkstraAlgorithm = (grid, startNode, endNode) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    var distance = new Map();
    var parent = new Map();
    const pq = new PriorityQueue();

    const reachableNodes = new Set();

    const getIndex = (row, col) => row * numCols + col;

    const getReachable = (node) => {
        const stack = [node];
        while(stack.length > 0) {
            const currentNode = stack.pop();
            const index = getIndex(currentNode.row, currentNode.col);
            if(reachableNodes.has(index)) {
                continue;
            }
            reachableNodes.add(index);
            const neighbours = getUnvisitedNeighbours(currentNode, grid);
            for(const neighbour of neighbours) {
                if(grid[neighbour.row][neighbour.col] !== 1) {
                    stack.push(neighbour);
                }
            }
        }
    }

    getReachable(startNode);
    console.log(reachableNodes);

    for(let node of reachableNodes) {
        distance.set(node, Infinity);
        parent.set(node, null);
    }

    distance.set(getIndex(startNode.row, startNode.col), 0);
    
    pq.push({ node: startNode, distance: 0 });

    
    while(!pq.isEmpty()) {
        const { node, distance: dist } = pq.pop();
        if(node === endNode) {
            break;
        }

        const neighbours = getUnvisitedNeighbours(node, grid);
        for(const neighbour of neighbours) {
            const newDist = dist+1;

            if(newDist < distance.get(getIndex(neighbour.row, neighbour.col))) {
                distance.set(getIndex(neighbour.row, neighbour.col), newDist);
                parent.set(getIndex(neighbour.row, neighbour.col), node);
                pq.push({ node: neighbour, distance: newDist });
            }
        }
    }

    
    const visitedNodes = [];
    let currentNode = endNode;

    while(currentNode !== startNode) {
        visitedNodes.unshift(currentNode);
        currentNode = parent.get(getIndex(currentNode.row, currentNode.col));
    }

    console.log(visitedNodes);

    return visitedNodes;
    
    
};

export { dijkstraAlgorithm }