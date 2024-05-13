class Generate{
	constructor(arr, row, col, cell_size) {
        this.current = arr[0][0]; 
        this.current.visited = true; 
        this.row = row - 1; 
        this.col = col - 1; 
        this.cell_size = cell_size; 
        this.neighbours = []; 
        this.previous; 
        this.travelled = [this.current];
        this.dead_ends = []; 
    } 
	no_dead_end_maze(arr) {
		// Check if there are cells already visited during the current iteration of the process.
		if (this.travelled != 0) {     // Not finished yet
			noStroke();
			//draws a rectangle representing the current cell in the maze
			rect(this.current.x * this.cell_size + 1, this.current.y * this.cell_size + 1, this.cell_size - 2, this.cell_size - 2);
			this.check_neighbours(); // Check for unvisited neighbors except for the outer border
			if (this.neighbours.length != 0) {    // If there are neighbors
				this.previous = this.current; // Save the current cell as previous
				this.current = this.neighbours[floor(random(0, this.neighbours.length))]; // Choose a random neighbor to move to
				this.current.visited = true; // Mark the new neighbor as visited
				this.remove_wall(); // Remove walls between the current and previous cell
				this.travelled.push(this.current); // Add the current cell to the list of visited cells
				return false;
			} else { 
				this.travelled.pop(); // Remove the current cell from the list of visited cells
				if (this.travelled.length != 0) {
					this.current = this.travelled[this.travelled.length - 1]; // Set the previous cell as the current cell
				}
				return false;
			}
			// End of loop
		} else {
			this.count_dead_ends(arr); // Calculate dead ends in the grid
			if (this.dead_ends.length != 0) {
				let position = this.remove_dead_ends(this.dead_ends[0]); // Choose a dead end to remove
				this.remove_dead_ends_wall(position, this.dead_ends[0], arr); // Remove the dead end
				return false;
			} else {
				return true; // Finish maze generation without dead ends
			}
		}
	}
	
	

	
      //بنشوف الجيران اللى ماتزرتش
	check_neighbours(){
		this.neighbours = []; // Initialize an empty array to store unvisited neighboring cells
		// Check if the current cell has a neighbor to the north and if it's unvisited
		if(this.current.y > 0 && !arr[this.current.y - 1][this.current.x].visited){
			this.neighbours.push(arr[this.current.y - 1][this.current.x]); // Add the unvisited neighbor to the list
		}
		// Check if the current cell has a neighbor to the east and if it's unvisited
		if(this.current.x < this.col && !arr[this.current.y][this.current.x + 1].visited){
			this.neighbours.push(arr[this.current.y][this.current.x + 1]); // Add the unvisited neighbor to the list
		}
		// Check if the current cell has a neighbor to the south and if it's unvisited
		if(this.current.y < this.row && !arr[this.current.y + 1][this.current.x].visited){
			this.neighbours.push(arr[this.current.y + 1][this.current.x]); // Add the unvisited neighbor to the list
		}
		// Check if the current cell has a neighbor to the west and if it's unvisited
		if(this.current.x > 0 && !arr[this.current.y][this.current.x - 1].visited){
			this.neighbours.push(arr[this.current.y][this.current.x - 1]); // Add the unvisited neighbor to the list
		}
	}
	
	remove_wall(){
		// If the current cell is above the previous cell, remove the bottom wall of the current cell and the top wall of the previous cell.
		if((this.current.y - this.previous.y) == -1){
			this.previous.wall[0] = false;
			this.current.wall[2] = false;	
		}
		// If the current cell is to the right of the previous cell, remove the left wall of the current cell and the right wall of the previous cell.
		if((this.current.x - this.previous.x) == 1){
			this.previous.wall[1] = false;
			this.current.wall[3] = false;
		}
		// If the current cell is below the previous cell, remove the top wall of the current cell and the bottom wall of the previous cell.
		if((this.current.y - this.previous.y) == 1){
			this.previous.wall[2] = false;
			this.current.wall[0] = false;
		}
		// If the current cell is to the left of the previous cell, remove the right wall of the current cell and the left wall of the previous cell.
		if((this.current.x - this.previous.x) == -1){
			this.previous.wall[3] = false;
			this.current.wall[1] = false;
		}
	}
	

	count_dead_ends(arr){
		this.dead_ends = [];
		for(let i = 0; i < arr.length; i ++){
			for(let j = 0; j < arr[i].length; j ++){
				let count = 0;
				if(arr[i][j].wall[0] == true){
					count ++;
				}
				if(arr[i][j].wall[1] == true){
					count ++;
				}
				if(arr[i][j].wall[2] == true){
					count ++;
				}
				if(arr[i][j].wall[3] == true){
					count ++;
				}
			
				if(count > 2){
					this.dead_ends.push(arr[i][j]);
				}			
			}
		}
	}

  // الداله دى بتجيب الخلايا اللى لم يتم زيارتها وتعطيها للداله اللى بعدها عشان تمسح الحاجه اللى بتخليها dead end
  remove_dead_ends(cell){
    // If the cell is at the top-left corner of the maze
    if(cell.y == 0 && cell.x == 0){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[1]){ count_wall.push(1); }
        if(cell.wall[2]){ count_wall.push(2); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
    // If the cell is at the top-right corner of the maze
    else if(cell.y == 0 && cell.x == this.col){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[2]){ count_wall.push(2); }
        if(cell.wall[3]){ count_wall.push(3); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))]; 
    }
    // If the cell is at the bottom-left corner of the maze
    else if(cell.y == this.row && cell.x == 0){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[0]){ count_wall.push(0); }
        if(cell.wall[1]){ count_wall.push(1); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
    // If the cell is at the bottom-right corner of the maze
    else if(cell.y == this.row && cell.x == this.col){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[0]){ count_wall.push(0); }
        if(cell.wall[3]){ count_wall.push(3); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
    // If the cell is at the top row of the maze (excluding corners)
    else if(cell.y == 0){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[1]){ count_wall.push(1); }
        if(cell.wall[2]){ count_wall.push(2); }
        if(cell.wall[3]){ count_wall.push(3); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
    // If the cell is at the bottom row of the maze (excluding corners)
    else if(cell.y == this.row){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[0]){ count_wall.push(0); }
        if(cell.wall[1]){ count_wall.push(1); }
        if(cell.wall[3]){ count_wall.push(3); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
    // If the cell is at the leftmost column of the maze (excluding corners)
    else if(cell.x == 0){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[0]){ count_wall.push(0); }
        if(cell.wall[1]){ count_wall.push(1); }
        if(cell.wall[2]){ count_wall.push(2); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
    // If the cell is at the rightmost column of the maze (excluding corners)
    else if(cell.x == this.col){
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[0]){ count_wall.push(0); }
        if(cell.wall[2]){ count_wall.push(2); }
        if(cell.wall[3]){ count_wall.push(3); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
    // If the cell is neither at the edge nor at the corner of the maze
    else{
        // Check which walls are present and store them in count_wall array
        let count_wall = [];
        if(cell.wall[0]){ count_wall.push(0); }
        if(cell.wall[1]){ count_wall.push(1); }
        if(cell.wall[2]){ count_wall.push(2); }
        if(cell.wall[3]){ count_wall.push(3); }
        // Choose a random wall from count_wall to remove
        return count_wall[floor(random(0, count_wall.length))];
    }
}

   // امسح الجدارن اللى هتخليها dead endالعشوائيه اللى تم اختيارها فوف
	remove_dead_ends_wall(position, cell, arr){
		if(position == 0){
			cell.wall[0] = false;
			arr[cell.y - 1][cell.x].wall[2] = false;
		}
		else if(position == 1){
			cell.wall[1] = false;
			arr[cell.y][cell.x + 1].wall[3] = false;
		}
		else if(position == 2){
			cell.wall[2] = false;
			arr[cell.y + 1][cell.x].wall[0] = false;
		}
		else{
			cell.wall[3] = false;
			arr[cell.y][cell.x - 1].wall[1] = false;
		}			
	}
}