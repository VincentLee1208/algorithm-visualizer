const isValid = (row, col, grid) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

const getUnvisitedNeighbours = (node, grid) => {
    const {row, col} = node;
    const neighbours = [];

    const directions = [
        {row: -1, col: 0},
        {row: 1, col: 0},
        {row: 0, col: -1},
        {row: 0, col: +1}
    ];

    for(const dir of directions) {
        const neighbourRow = row + dir.row;
        const neighbourCol = col + dir.col;

        if(isValid(neighbourRow, neighbourCol, grid) && grid[neighbourRow][neighbourCol] !== 1) {
            neighbours.push({row: neighbourRow, col: neighbourCol});
        }
    }

    return neighbours;
};

const createSeenNodesArray = (rows, cols) => {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
}

const getShortestPath = (startNode, endNode, parents) => {
    const shortestPath = [];
    let currentNode = endNode;

    while(currentNode !== startNode) {
        shortestPath.push(currentNode);
        currentNode = parents[currentNode];
    }

    shortestPath.push(startNode);

    return shortestPath.reverse();
}

export { getUnvisitedNeighbours, createSeenNodesArray, getShortestPath };