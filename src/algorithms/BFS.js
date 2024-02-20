import { getUnvisitedNeighbours, createSeenNodesArray } from "../helpers/general_helper";

function bfsAlgorithm(grid, startNode, endNode) {
    const visitedNodes = [];
    const queue = [];
    const numRows = grid.length;
    const numCols = grid[0].length;
    console.log("starting bfs");

    const seenNodes = createSeenNodesArray(numRows, numCols);
    queue.push(startNode);

    while(queue.length > 0) {
        const node = queue.shift();

        //skip if the node is a wall
        if(grid[node.row][node.col] === 1) continue;

        //skip if the node has already been visited
        if(seenNodes[node.row][node.col]) continue;

        visitedNodes.push(node);

        if(node.row === endNode.row && node.col === endNode.col) {
            return visitedNodes;
        }
        const neighbours = getUnvisitedNeighbours(node, grid);
        for(const neighbour of neighbours) {
            if(!queue.includes(neighbour)) {
                queue.push(neighbour);
                neighbour.previousNode = node;
            }
        }

        seenNodes[node.row][node.col] = true;
    }

    return visitedNodes;
}

export { bfsAlgorithm }