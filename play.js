class Play {
  constructor(arr, row, col, size) {
    this.move = arr[0][0]; 
    this.move.visited = true; 
    this.size = size; 
    this.row = row - 1; 
    this.col = col - 1; 
    this.previous = [];
  }

  check_wall(input) {
    // if you not at end 
    if (this.move != arr[this.row][this.col]) {
      // if you can move above and no wall
      if (input == 0 && !this.move.wall[0]) {
        // if you not already visited above
        if (!arr[this.move.y - 1][this.move.x].visited) {
          this.previous.push(this.move);     // put the above cell in previous array
          this.move = arr[this.move.y - 1][this.move.x]; // put the above cell in previous array
        } else if (
          arr[this.move.y - 1][this.move.x] ==
          this.previous[this.previous.length - 1]
        ) {
               // if it was already visited
          this.move.visited = false; 
          this.move = this.previous[this.previous.length - 1]; // return back
          this.previous.pop();    //delete it from previous array
        }
      }

      // if you can move right and no wall
      if (input == 1 && !this.move.wall[1]) {
         //if not already visited the right neighbour 
        if (!arr[this.move.y][this.move.x + 1].visited) {
          
          this.previous.push(this.move);   // put the right cell in previous array
          this.move = arr[this.move.y][this.move.x + 1]; // put the right cell in previous array
          // if already visited
        } else if (
          arr[this.move.y][this.move.x + 1] ==
          this.previous[this.previous.length - 1]
        ) {
         
          this.move.visited = false; 
          this.move = this.previous[this.previous.length - 1]; // return back
          this.previous.pop();  //delete it from previous array
        }
      }
        // if you can move down and no wall
      if (input == 2 && !this.move.wall[2]) {
           //if not already visited the down neighbour 
        if (!arr[this.move.y + 1][this.move.x].visited) {
          
          this.previous.push(this.move);     // put the down cell in previous array
          this.move = arr[this.move.y + 1][this.move.x];  // put the down cell in previous array
             // if already visited
        } else if (
          arr[this.move.y + 1][this.move.x] ==
          this.previous[this.previous.length - 1]
        ) {
    
          this.move.visited = false; 
          this.move = this.previous[this.previous.length - 1]; //return back
          this.previous.pop();   //delete it from previous array
        }
      }

      // if you can move left and no wall
      if (input == 3 && !this.move.wall[3]) {
           //if not already visited the left neighbour 
        if (!arr[this.move.y][this.move.x - 1].visited) {
          
          this.previous.push(this.move);
          this.move = arr[this.move.y][this.move.x - 1];
        }
        // if already visited
        else if (
          arr[this.move.y][this.move.x - 1] ==
          this.previous[this.previous.length - 1]
        ) {
         
          this.move.visited = false;
          this.move = this.previous[this.previous.length - 1];  //return back
          this.previous.pop();   //delete it from previous array
        }
      }

       // at the last one -----> you won
      if (this.move == arr[this.row][this.col]) {
        alert("You won !!!");
        return false; // already finished no way to move
      }
       // else
      this.move.visited = true; 
      return true;   // already not at finished continue
    }
  }


  display_path() {
       noStroke()
    for (let i = 0; i < this.previous.length; i++) {
      
      fill(0, 255, 0); //  green color to all that visited
      //axis to previous cells
      rect(
        this.previous[i].x * this.size, 
        this.previous[i].y * this.size,
        this.size,
        this.size
      );
    }
    fill(0, 0, 255); //  blue color to the current
     //axis to current cells
    rect(
      this.move.x * this.size + 1, 
      this.move.y * this.size + 1,
      this.size - 2,
      this.size - 2
    );
  }
}
