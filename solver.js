class Solver {
    constructor(arr, row, col, cell_size) {  
        this.move = arr[0][0]; 
        this.move.visited = true; 
        this.row = row; 
        this.col = col; 
        this.cell_size = cell_size; 
        this.neighbours = []; 
        this.travelled = [this.move]; 
        this.queue = [this.move]; 
        this.end = arr[row - 1][col - 1]; 
        this.openset = [this.move]; 
        this.closedset = [];
        this.update = false; 
        this.path = []; 
    }

    depth_first_search() {
        // If not yet reached the end
        if (this.move != arr[this.row - 1][this.col - 1]) {
            // Check neighboring cells
            this.check_neighbours();
            
            // If there are available neighbors
            if (this.neighbours.length != 0) {
                // Choose a path among available neighbors
                this.choose_path();
                // Mark the current cell as travelled
                this.travelled.push(this.move);
                // If not yet reached the end
                if (this.move != arr[this.row - 1][this.col - 1]) {
                    // Fill the current cell with green color
                    fill(0, 255, 0);
                    rect(this.move.x * this.cell_size, this.move.y * this.cell_size, this.cell_size, this.cell_size);
                }
            } else {
                // If there are no available neighbors, backtrack
                // Fill the current cell with a lighter color
                fill(245);
                rect(this.move.x * this.cell_size, this.move.y * this.cell_size, this.cell_size, this.cell_size);
                // Remove the current cell from the travelled path
                this.travelled.pop();
                // Move to the previous cell
                this.move = this.travelled[this.travelled.length - 1];
            }
            return false;
        } else {
            // If reached the end
            return true;
        }
    }
    

    breadth_first_search() {
        // Check if the current position is not the destination
        if (this.move != arr[this.row - 1][this.col - 1]) {
            // Explore and add neighbors to the queue
            this.check_neighbours();
            this.add_neighbours();
            
            // Move to the next cell in the queue
            this.move = this.queue[0];
            this.backtrack = this.move;
            this.queue.splice(0, 1); // Remove the processed cell from the queue
            
            // Visualize the current cell on the grid
            fill(0, 0, 255, 50);
            rect(this.move.x * this.cell_size, this.move.y * this.cell_size, this.cell_size, this.cell_size);
        } else {
            // If the current cell is the destination
            if (this.backtrack.previous != arr[0][0]) {
                // Backtrack to the previous cell
                this.backtrack = this.backtrack.previous;
                
                // Visualize the backtracked cell on the grid
                fill(0, 255, 0);
                rect(this.backtrack.x * this.cell_size, this.backtrack.y * this.cell_size, this.cell_size, this.cell_size);
            } else {
                // If the backtracked cell is the start cell, the search is complete
                return true;
            }
        }
    }
    

    greedy() {
        if (this.openset.length > 0) {
            let j = 0;
            // Find the node in the openset with the lowest f-score
            for (let i = 0; i < this.openset.length; i++) {
                if (this.openset[j].f > this.openset[i].f) {
                    j = i;
                }
            }
            this.move = this.openset[j]; // Set the current node to the one with the lowest f-score
            this.add_neighbors(); // Add neighbors of the current node to the search
            this.openset.splice(j, 1); // Remove the current node from the openset
            this.closedset.push(this.move); // Add the current node to the closedset
    
            // Check if the current node is the goal node
            if (this.move == this.end) {
                this.constructPath(); // Reconstruct the path
                console.log("Done");
                this.display_path("greedy"); // Display the path
                return true; // Search is complete
            }
    
            // Process neighbors of the current node
            for (let i = 0; i < this.neighbours.length; i++) {
                let neighbor = this.neighbours[i];
                if (!this.closedset.includes(neighbor)) {
                    let tempG = this.move.g + 0; // Assuming the cost between nodes is always 0
    
                    // If neighbor is not in the openset, add it
                    if (!this.openset.includes(neighbor)) {
                        this.openset.push(neighbor);
                        this.update = true;
                    } else {
                        // If neighbor is in the openset and the new path is better, update it
                        if (neighbor.g > tempG) {
                            this.update = true;
                        }
                    }
                    // Update neighbor if needed
                    if (this.update) {
                        neighbor.previous = this.move;
                        neighbor.g = tempG;
                        neighbor.h = this.heuristic(neighbor, this.end); // Calculate heuristic
                        neighbor.f = neighbor.g + neighbor.h; // Calculate f-score
                    }
                    this.update = false;
                }
            }
        }
        this.display_path("greedy"); // Display the current path
        return false; // Search is not yet complete
    }
    
    astar() {
        if (this.openset.length > 0) {
            let j = 0;
            // Find the node in the openset with the lowest f-score
            for (let i = 0; i < this.openset.length; i++) {
                if (this.openset[j].f > this.openset[i].f) {
                    j = i;
                }
            }
            this.move = this.openset[j]; // Set the current node to the one with the lowest f-score
            this.add_neighbors(); // Add neighbors of the current node to the search
            this.openset.splice(j, 1); // Remove the current node from the openset
            this.closedset.push(this.move); // Add the current node to the closedset
    
            // Check if the current node is the goal node
            if (this.move == this.end) {
                this.constructPath(); // Reconstruct the path
                console.log("Done");
                this.display_path("astar"); // Display the path
                return true; // Search is complete
            }
    
            // Process neighbors of the current node
            for (let i = 0; i < this.neighbours.length; i++) {
                let neighbor = this.neighbours[i];
                if (!this.closedset.includes(neighbor)) {
                    let tempG = this.move.g + 1; // Assuming the cost between adjacent nodes is always 1
    
                    // If neighbor is not in the openset, add it
                    if (!this.openset.includes(neighbor)) {
                        this.openset.push(neighbor);
                        this.update = true;
                    } else {
                        // If neighbor is in the openset and the new path is better, update it
                        if (neighbor.g > tempG) {
                            this.update = true;
                        }
                    }
                    // Update neighbor if needed
                    if (this.update) {
                        neighbor.previous = this.move;
                        neighbor.g = tempG;
                        neighbor.h = this.heuristic(neighbor, this.end); // Calculate heuristic
                        neighbor.f = neighbor.g + neighbor.h; // Calculate f-score
                    }
                    this.update = false;
                }
            }
        }
        this.display_path("astar"); // Display the current path
        return false; // Search is not yet complete
    }
    
    
    getNeighbours(node) {
        let neighbours = []; 
    
        // Check if there is a cell above the current node and it doesn't have a bottom wall
        if (node.y > 0 && !arr[node.y - 1][node.x].wall[2]) {
            neighbours.push(arr[node.y - 1][node.x]); // Add the cell above to the neighbors array
        }
    
        // Check if there is a cell to the right of the current node and it doesn't have a left wall
        if (node.x < col - 1 && !arr[node.y][node.x + 1].wall[3]) {
            neighbours.push(arr[node.y][node.x + 1]); // Add the cell to the right to the neighbors array
        }
    
        // Check if there is a cell below the current node and it doesn't have a top wall
        if (node.y < row - 1 && !arr[node.y + 1][node.x].wall[0]) {
            neighbours.push(arr[node.y + 1][node.x]); // Add the cell below to the neighbors array
        }
    
        // Check if there is a cell to the left of the current node and it doesn't have a right wall
        if (node.x > 0 && !arr[node.y][node.x - 1].wall[1]) {
            neighbours.push(arr[node.y][node.x - 1]); // Add the cell to the left to the neighbors array
        }
    
        return neighbours; // Return the array of neighboring nodes
    }
    


// Constructs the path from the end node to the start node
constructPath() {
    let path = []; // Initialize an empty array to store the nodes in the path
    let currentNode = this.end; // Start from the end node

    // Traverse backwards from end node to start node (or until a node with no previous node)
    while (currentNode !== null && currentNode.previous !== undefined) {
        path.push(currentNode); // Add the current node to the path array
        currentNode = currentNode.previous; // Move to the previous node
    }

    this.path = path.reverse(); // Reverse the path array to start from the start node
}

    check_neighbours() {
        this.neighbours = [];
        if (this.move.y > 0 && !arr[this.move.y - 1][this.move.x].visited && !arr[this.move.y - 1][this.move.x].wall[2]) {
            this.neighbours.push(0);
        }
        if (this.move.x < this.col - 1 && !arr[this.move.y][this.move.x + 1].visited && !arr[this.move.y][this.move.x + 1].wall[3]) {
            this.neighbours.push(1);
        }
        if (this.move.y < this.row - 1 && !arr[this.move.y + 1][this.move.x].visited && !arr[this.move.y + 1][this.move.x].wall[0]) {
            this.neighbours.push(2);
        }
        if (this.move.x > 0 && !arr[this.move.y][this.move.x - 1].visited && !arr[this.move.y][this.move.x - 1].wall[1]) {
            this.neighbours.push(3);
        }
    }

    choose_path() {
        let next = this.neighbours[floor(random(0, this.neighbours.length))];
        if (next == 0) {
            this.move = arr[this.move.y - 1][this.move.x];
        } else if (next == 1) {
            this.move = arr[this.move.y][this.move.x + 1];
        } else if (next == 2) {
            this.move = arr[this.move.y + 1][this.move.x];
        } else {
            this.move = arr[this.move.y][this.move.x - 1];
        }
        this.move.visited = true;
    }

    add_neighbours() {
        for (let i = 0; i < this.neighbours.length; i++) {
            if (this.neighbours[i] == 0) {
                this.queue.push(arr[this.move.y - 1][this.move.x]);
            } else if (this.neighbours[i] == 1) {
                this.queue.push(arr[this.move.y][this.move.x + 1]);
            } else if (this.neighbours[i] == 2) {
                this.queue.push(arr[this.move.y + 1][this.move.x]);
            } else {
                this.queue.push(arr[this.move.y][this.move.x - 1]);
            }
            this.queue[this.queue.length - 1].visited = true;
            this.queue[this.queue.length - 1].previous = this.move;
        }
    }

    convert_neighbor(index) {
        if (index == 0) {
            return arr[this.move.y - 1][this.move.x];
        } else if (index == 1) {
            return arr[this.move.y][this.move.x + 1];
        } else if (index == 2) {
            return arr[this.move.y + 1][this.move.x];
        } else {
            return arr[this.move.y][this.move.x - 1];
        }
    }

    add_neighbors() {
        this.neighbours = [];
        if (this.move.y > 0 && !this.move.wall[0]) {
            this.neighbours.push(arr[this.move.y - 1][this.move.x]);
        }
        if (this.move.x < this.col - 1 && !this.move.wall[1]) {
            this.neighbours.push(arr[this.move.y][this.move.x + 1]);
        }
        if (this.move.y < this.row - 1 && !this.move.wall[2]) {
            this.neighbours.push(arr[this.move.y + 1][this.move.x]);
        }
        if (this.move.x > 0 && !this.move.wall[3]) {
            this.neighbours.push(arr[this.move.y][this.move.x - 1]);
        }
    }

    heuristic(p1, p2) {
        // Calculate the Manhattan distance between p1 and p2
        // Manhattan distance is the sum of the absolute differences of their x and y coordinates
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
    

    display_path(algorithm) {
        noStroke(); // Remove the stroke for the rectangles
    
        // Display cells in the openset with a semi-transparent red color    A*
        fill(255, 0, 0, 50);
        for (let i = 0; i < this.openset.length; i++) {
            rect(this.openset[i].x * this.cell_size, this.openset[i].y * this.cell_size, this.cell_size, this.cell_size);
        }
    
        // Display cells in the closedset with a semi-transparent blue color   A* and gready
        fill(0, 0, 255, 50);
        for (let i = 0; i < this.closedset.length; i++) {
            rect(this.closedset[i].x * this.cell_size, this.closedset[i].y * this.cell_size, this.cell_size, this.cell_size);
        }
    
        // Determine the color to use for the path based on the algorithm
        if (algorithm === "greedy") {
            fill(255, 165, 0); // Orange color for Greedy algorithm
        } else if (algorithm === "astar") {
            fill(255, 255, 0); // Yellow color for A* algorithm
        }
    
        // Draw the final path
        for (let i = 0; i < this.path.length; i++) {
            rect(this.path[i].x * this.cell_size, this.path[i].y * this.cell_size, this.cell_size, this.cell_size);
        }
    }
    
    
    
    
    
}
