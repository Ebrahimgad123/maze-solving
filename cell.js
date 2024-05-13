class Cell {
    // Each cell has two axes -----> x,y
    constructor(y, x, cell_size) {
        this.x = x; 
        this.y = y; 
        this.cell_size = cell_size; // Size of the cell
        this.wall = [true, true, true, true]; // List representing walls: [Top, Right, Bottom, Left]
        this.visited = false; // Variable indicating whether this cell has been visited or not
        this.previous; // Previous cell in the path to solve the maze
        this.f = 0; // Total cost value (heuristic) in the A* algorithm
        this.g = 0; // Actual cost value from the start to this cell
        this.h = 0; // Estimated cost value from this cell to the end in A* algorithm
    }
 // دالة لرسم الجدران المحيطة بالخلية
    generate_wall() {
       
        let x = this.x * this.cell_size; 
        let y = this.y * this.cell_size; 

       // draw above wall if its exists
        if (this.wall[0]) {
            line(x, y, x + this.cell_size, y);
        }
       // draw right wall if its exists
        if (this.wall[1]) {
            line(x + this.cell_size, y, x + this.cell_size, y + this.cell_size);
        }
       // draw down wall if its exists
        if (this.wall[2]) {
            line(x, y + this.cell_size, x + this.cell_size, y + this.cell_size);
        }
       // draw left wall if its exists
        if (this.wall[3]) {
            line(x, y, x, y + this.cell_size);
        }
    }
}
