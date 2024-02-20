import { createSeenNodesArray, getUnvisitedNeighbours } from "../helpers/general_helper";

function dfsAlgorithm(grid, startNode, endNode) {
    const visitedNodes = [];
    const stack = [];
    const numRows = grid.length;
    const numCols = grid[0].length;

    const seenNodes = createSeenNodesArray(numRows, numCols);
    stack.push(startNode);

    while(stack.length > 0) {
        const node = stack.pop();

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
            if(!stack.includes(neighbour)) {
                stack.push(neighbour);
                neighbour.previousNode = node;
            }
        }

        seenNodes[node.row][node.col] = true;
    }

    return visitedNodes;
}

export { dfsAlgorithm }