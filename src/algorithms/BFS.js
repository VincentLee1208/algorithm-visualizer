function bfsAlgorithm(grid, startNode, endNode) {
    const visitedNodes = [];
    const queue = [];
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isValid = (row, col) => {
        return row >= 0 && row < numRows && col >= 0 && col < numCols;
    };

    const getUnvisitedNeighbors = (node) => {
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

            if(isValid(neighbourRow, neighbourCol) && grid[neighbourRow][neighbourCol] !== 1) {
                neighbours.push({row: neighbourRow, col: neighbourCol});
            }
        }

        return neighbours;
    };

    const createSeenNodesArray = (rows, cols) => {
        return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
    }

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

        const neighbours = getUnvisitedNeighbors(node);
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