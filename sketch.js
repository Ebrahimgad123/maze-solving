let size; 
let cell_size; 
let arr = []; 
let canvas_size = 650; 
let row; 
let col; 
let g;   // object from class generator
let maze_solve; 
let algorithm; 
let solve; 
let s;   // object from class solver
let generated = false; 
let solved = false; 
let play = false; 
let playbutton; 
let p;     // object from class play
let generateButton; 

function setup() {
	canvas = createCanvas(canvas_size, canvas_size);  
	canvas.position(900, 170);  
	background(245);     
	strokeWeight(5);   // سمك الجدران
	size = select("#maze_size");   // input
	maze_solve = select("#maze_solve");  // dropdown list
	solve = select("#button2");
	solve.mousePressed(solve_maze); 
	playbutton = select("#button3"); // play button
	playbutton.mousePressed(play_maze); 
	generateButton = select("#button4"); //generate button
	generateButton.mousePressed(generate_maze); 
	generate_maze(); // by defualt
}

     // a function that exists in p5.js
function draw() {

    if(generated){
        // background of canvas
        background(245);
        
        generated = g.no_dead_end_maze(arr);
        //  a function to draw start and last of maze
        maze_start_end();
        
        for(let i = 0; i < row; i ++){
            for(let j = 0; j < col; j ++){
                arr[i][j].generate_wall();
            }
        }   
    }


if (algorithm == 1 && !solved) {
    noStroke(); // no lines for walls 
    solved = s.depth_first_search(); 
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // show walls after solving maze
            stroke(0); 
            arr[i][j].generate_wall(); 
        }
    }
}


if (algorithm == 2 && !solved) {
    noStroke(); // no lines for walls 
    solved = s.breadth_first_search(); 
  
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // show walls after solving maze
            stroke(0); 
            arr[i][j].generate_wall(); 
        }
    }
    maze_start_end(); 
}


if (algorithm == 3 && !solved) {
    background(255); 
    noStroke(); // no lines for walls 
    solved = s.astar(); 
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // show walls after solving maze
            stroke(0); 
            arr[i][j].generate_wall(); 
        }
    }
    maze_start_end(); 
}


if (algorithm == 4 && !solved) {
    background(255); 
    noStroke(); // no lines for walls
    solved = s.greedy(); 
      // show walls after solving maze
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            stroke(0);
            arr[i][j].generate_wall(); 
        }
    }
    maze_start_end(); 
}


		
	
}


function generate_maze() {
    
    algorithm = 0;
    play = false; 
    let generated = false; 
    arr = []; 
    cell_size = canvas_size / size.value(); 
    row = size.value(); // number of row in maze
    col = size.value(); // number of colmn in maze


    for (let i = 0; i < row; i++) {
        arr[i] = [];
        for (let j = 0; j < col; j++) {
            cell = new Cell(i, j, cell_size); 
            arr[i][j] = cell; 
        }
    }

    g = new Generate(arr, row, col, cell_size); 

    
    while (!generated) {
        generated = g.no_dead_end_maze(arr); 
    }

    background(245); // canvas background
    maze_start_end(); // start end maze

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            arr[i][j].generate_wall(); // build wall around every cell in maze
        }
    }
}

function maze_start_end() {
    noStroke();     
    fill(255);   
    rect(0, 0, cell_size, cell_size); //rectangle
    fill(165, 42, 42, 200); // brown color
    rect(0, 0, cell_size, cell_size); // rectangle
    fill(165, 42, 42, 200); // brown color
    rect((row - 1) * cell_size, (col - 1) * cell_size, cell_size, cell_size); // رسم مستطيل بني شفاف للنقطة النهائية في المتاهة 
	// الابعاد
    stroke(0); // walls
    noFill(); // no fill
	
}

function solve_maze(){
    solved = false; 
    play = false; 
    background(245); // clear the current draw
    maze_start_end(); // maze start end
        // re assign to cells ---> false
    for(let i = 0; i < row; i ++){
        for(let j = 0; j < col; j ++){
            arr[i][j].visited = false;
        }
    }
      // maze_solve --->dropdown list
    algorithm = maze_solve.value();

    s = new Solver(arr, row, col, cell_size);
}


function play_maze(){
    play = true; 
    algorithm = 0; 
    background(245); // clear current draw
    // re assign to cells ---> false
    for(let i = 0; i < row; i ++){
        for(let j = 0; j < col; j ++){
            arr[i][j].visited = false;
        }
    }  
    
    p = new Play(arr, row, col, cell_size);
    maze_start_end(); 
    draw_wall(); // draw the previous visited and the current
}
    // function in p5.js
function keyTyped(){
    if(play){
        if(key == 'w'){
            play = p.check_wall(0);   // check above
			//p -----> class play
        }
		if(key == 'd'){
			play = p.check_wall(1);   // check right
		
		}
		if(key == 's'){
			play = p.check_wall(2);  // check down
		
		}
		if(key == 'a'){
			play = p.check_wall(3);  // check left
			
		}
        
        background(245); 
        p.display_path(); //  display path in class play
        maze_start_end(); 
        draw_wall(); 
    }
}

// this function draw wall depends on class cell
function draw_wall(){
    for(let i = 0; i < row; i ++){
        for(let j = 0;j < col; j ++){
            stroke(0); 
            arr[i][j].generate_wall(); 
        }
    }
}
