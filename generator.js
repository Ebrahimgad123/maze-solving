class Generate{

	constructor(arr, row, col, cell_size){
		this.current = arr[0][0];
		this.current.visited = true;
		this.row = row - 1;
		this.col = col - 1;
		this.cell_size = cell_size;
		this.neighbours = [];
		this.previous;
		this.travelled = [this.current];
		this.dead_ends = [];
		this.half_dead_ends = [];
		this.counted = false;
	}
	no_dead_end_maze(arr){
		if(this.travelled != 0){
			fill(0, 255, 0);
			noStroke();
			rect(this.current.x * this.cell_size + 1, this.current.y * this.cell_size + 1, this.cell_size - 2, this.cell_size - 2);
			this.check_neighbours();
			if(this.neighbours.length != 0){
				this.previous = this.current;
				this.current = this.neighbours[floor(random(0, this.neighbours.length))];
				this.current.visited = true;
				// rect(this.current.x * this.cell_size + 1, this.current.y * this.cell_size + 1, this.cell_size - 2, this.cell_size - 2);
				this.remove_wall();
				this.travelled.push(this.current);
				return false;
			}
			else{
				this.travelled.pop();
				if(this.travelled.length != 0){
					this.current = this.travelled[this.travelled.length - 1];
				}
				return false;
			}
		}
		else{
			this.count_dead_ends(arr);
			if(this.dead_ends.length != 0){
				let position = this.remove_dead_ends(this.dead_ends[0]);
				this.remove_dead_ends_wall(position, this.dead_ends[0], arr);
				return false;
			}
			else{
				return true;
			}
			// console.log(this.dead_ends.length);
		}
	}

	

	check_neighbours(){
		this.neighbours = []; 
		if(this.current.y > 0 && !arr[this.current.y - 1][this.current.x].visited){
			this.neighbours.push(arr[this.current.y - 1][this.current.x]);
		}
		if(this.current.x < this.col && !arr[this.current.y][this.current.x + 1].visited){
			this.neighbours.push(arr[this.current.y][this.current.x + 1]);
		}
		if(this.current.y < this.row && !arr[this.current.y + 1][this.current.x].visited){
			this.neighbours.push(arr[this.current.y + 1][this.current.x]);
		}
		if(this.current.x > 0 && !arr[this.current.y][this.current.x - 1].visited){
			this.neighbours.push(arr[this.current.y][this.current.x - 1]);
		}
	}

	remove_wall(){
		if((this.current.y - this.previous.y) == -1){
			this.previous.wall[0] = false;
			this.current.wall[2] = false;	
		}
		if((this.current.x - this.previous.x) == 1){
			this.previous.wall[1] = false;
			this.current.wall[3] = false;
		}
		if((this.current.y - this.previous.y) == 1){
			this.previous.wall[2] = false;
			this.current.wall[0] = false;
		}
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


	remove_dead_ends(cell){
		if(cell.y == 0 && cell.x == 0){
			let count_wall = [];
			if(cell.wall[1]){
				count_wall.push(1);
			}
			if(cell.wall[2]){
				count_wall.push(2);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
		else if(cell.y == 0 && cell.x == this.col){
			let count_wall = [];
			if(cell.wall[2]){
				count_wall.push(2);
			}
			if(cell.wall[3]){
				count_wall.push(3);
			}
			return count_wall[floor(random(0, count_wall.length))]; 
		}
		else if(cell.y == this.row && cell.x == 0){
			let count_wall = [];
			if(cell.wall[0]){
				count_wall.push(0);
			}
			if(cell.wall[1]){
				count_wall.push(1);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
		else if(cell.y == this.row && cell.x == this.col){
			let count_wall = [];
			if(cell.wall[0]){
				count_wall.push(0);
			}
			if(cell.wall[3]){
				count_wall.push(3);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
		else if(cell.y == 0){
			let count_wall = [];
			if(cell.wall[1]){
				count_wall.push(1);
			}
			if(cell.wall[2]){
				count_wall.push(2);
			}
			if(cell.wall[3]){
				count_wall.push(3);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
		else if(cell.y == this.row){
			let count_wall = [];
			if(cell.wall[0]){
				count_wall.push(0);
			}
			if(cell.wall[1]){
				count_wall.push(1);
			}
			if(cell.wall[3]){
				count_wall.push(3);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
		else if(cell.x == 0){
			let count_wall = [];
			if(cell.wall[0]){
				count_wall.push(0);
			}
			if(cell.wall[1]){
				count_wall.push(1);
			}
			if(cell.wall[2]){
				count_wall.push(2);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
		else if(cell.x == this.col){
			let count_wall = [];
			if(cell.wall[0]){
				count_wall.push(0);
			}
			if(cell.wall[2]){
				count_wall.push(2);
			}
			if(cell.wall[3]){
				count_wall.push(3);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
		else{
			let count_wall = [];
			if(cell.wall[0]){
				count_wall.push(0);
			}
			if(cell.wall[1]){
				count_wall.push(1);
			}
			if(cell.wall[2]){
				count_wall.push(2);
			}
			if(cell.wall[3]){
				count_wall.push(3);
			}
			return count_wall[floor(random(0, count_wall.length))];
		}
	}

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