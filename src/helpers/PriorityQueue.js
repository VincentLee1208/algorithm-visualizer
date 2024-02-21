class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    isEmpty() {
        return this.nodes.length === 0;
    }

    push(item) {
        this.nodes.push(item);
        this.nodes.sort((a, b) => a.distance - b.distance);
    }

    pop() {
        return this.nodes.shift();
    }
}

export { PriorityQueue };