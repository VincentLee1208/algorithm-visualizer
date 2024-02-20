import { getUnvisitedNeighbours } from '../helpers/general_helper';

const dijkstraAlgorithm = (grid, startNode, endNode) => {
    /*
    const numRows = grid.length;
    const numCols = grid[0].length;

    const distance = {};
    const parent = {};
    const pq = new PriorityQueue();

    for(let row = 0; row < numRows; row++) {
        for(let col = 0; col < numCols; col++) {
            const node = { row, col };
            distance[node] = Infinity;
            parent[node] = null;
        }
    }

    distance[startNode] = 0;
    pq.push({ node: startNode, distance: 0 });

    while(!pq.isEmpty()) {
        const { node, distance: dist } = pq.pop();
        if(node === endNode) {
            break;
        }
        const neighbours = getUnvisitedNeighbours(node, grid);
        for (const neighbour of neighbours) {
            const newDist = dist + 1;

            if(newDist < distance[neighbour]) {
                distance[neighbour] = newDist;
                parent[neighbour] = node;
                pq.push({ node: neighbour, distance: newDist });
            }
        }
    }

    const visitedNodes = [];
    let currentNode = endNode;

    while(currentNode !== startNode) {
        visitedNodes.unshift(currentNode);
        currentNode = parent[currentNode];
    }

    visitedNodes.unshift(startNode);
    return visitedNodes;
    */
};

export { dijkstraAlgorithm }