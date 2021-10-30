let flock;
let alignSlider, cohesionSlider, separationSlider;

let qt;
let bound;
let points;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(51);


	alignSlider = createSlider(0, 2, 1.5, 0.1);
	cohesionSlider = createSlider(0, 2, 1, 0.1);
	separationSlider = createSlider(0, 2, 2, 0.1);


	flock = new Flock(700);

/*
 	bound = new Boundary(width / 2, height / 2, width / 2, height / 2);
	qt = new QuadTree(bound, 4);
	points = []
	for (let i = 0; i < 1000; i++){
		points.push(new Point(random(width), random(height)));
	}
	for (let p of points) {
		qt.insert(p);
	}
*/

//console.log(qt);

}

function draw() {
	background(51);

	bound = new Boundary(width / 2, height / 2, width / 2, height / 2);
	qt = new QuadTree(bound, 4);

	flock.update();

	let fr = frameRate();
	if (fr >= 25) {
		fill(0, 255, 0);
	} else {
		fill(255, 0, 0);
	}
	text('framerate: ' + frameRate(), 10, 20);
	//qt.show();
	/*
	qt.show();

	stroke(0, 255, 0);
	fill(0, 255, 0, 20);

	if (mouseX < width && mouseY < height) {
		//let range = new Boundary(mouseX, mouseY, 50, 50 );
		//rectMode(CENTER);
		//rect(range.centerX, range.centerY, range.halfWidth * 2, range.halfHeight * 2);

		let range = new Circle(mouseX, mouseY, 50);
		ellipse(range.x, range.y, range.r * 2);

		let points = qt.query(range);
		for (let p of points) {
			strokeWeight (2);
			point(p.x, p.y);
		}

	}
*/


}
