class Cell{

	constructor(y, x, cell_size){
		this.x = x;
		this.y = y;
		this.cell_size = cell_size;
		this.wall = [true, true, true, true];
		this.visited = false;
		this.previous;
		this.f = 0;
		this.g = 0;
		this.h = 0;
	}

	generate_wall(){
		let x = this.x * this.cell_size;
		let y = this.y * this.cell_size;
		if(this.wall[0]){
			line(x, y, x + this.cell_size, y);
		}
		if(this.wall[1]){
			line(x + this.cell_size, y, x + this.cell_size, y + this.cell_size);
		}
		if(this.wall[2]){
			line(x, y + this.cell_size, x + this.cell_size, y + this.cell_size);
		}
		if(this.wall[3]){
			line(x, y, x, y + this.cell_size);
		}
	}

}