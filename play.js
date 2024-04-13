class Play{

	constructor(arr, row, col, size){
		this.move = arr[0][0];
		this.move.visited = true;
		this.size = size;
		this.row = row - 1;
		this.col = col - 1;
		this.previous = [];
	}

	check_wall(input){
		if(this.move != arr[this.row][this.col]){
			if(input == 0 && !this.move.wall[0]){
				if(!arr[this.move.y - 1][this.move.x].visited){
					this.previous.push(this.move);
					this.move = arr[this.move.y - 1][this.move.x];
				}
				else if(arr[this.move.y - 1][this.move.x] == this.previous[this.previous.length - 1]){
					this.move.visited = false;
					this.move = this.previous[this.previous.length - 1];
					this.previous.pop();
				}
			}
			if(input == 1 && !this.move.wall[1]){
				if(!arr[this.move.y][this.move.x + 1].visited){
					this.previous.push(this.move);
					this.move = arr[this.move.y][this.move.x + 1];
				}
				else if(arr[this.move.y][this.move.x + 1] == this.previous[this.previous.length - 1]){
					this.move.visited = false;
					this.move = this.previous[this.previous.length - 1];
					this.previous.pop();
				}
			}
			if(input == 2 && !this.move.wall[2]){
				if(!arr[this.move.y + 1][this.move.x].visited){
					this.previous.push(this.move);
					this.move = arr[this.move.y + 1][this.move.x];
				}
				else if(arr[this.move.y + 1][this.move.x] == this.previous[this.previous.length - 1]){
					this.move.visited = false;
					this.move = this.previous[this.previous.length - 1];
					this.previous.pop();
				}
			}
			if(input == 3 && !this.move.wall[3]){
				if(!arr[this.move.y][this.move.x - 1].visited){
					this.previous.push(this.move);
					this.move = arr[this.move.y][this.move.x - 1];
				}
				else if(arr[this.move.y][this.move.x - 1] == this.previous[this.previous.length - 1]){
					this.move.visited = false;
					this.move = this.previous[this.previous.length - 1];
					this.previous.pop();
				}
			}
			if(this.move == arr[this.row][this.col]){
				alert("You won !!!");
				return false;
			}

			this.move.visited = true;
			return true;
		}

	}

	display_path(){
		noStroke();
		for(let i = 0; i < this.previous.length; i ++){
			fill(0, 255, 0);
			rect(this.previous[i].x * this.size, this.previous[i].y * this.size, this.size, this.size);
		}
		fill(0, 0, 255);
		rect(this.move.x * this.size + 1, this.move.y * this.size + 1, this.size - 2, this.size - 2);
	}

}