var world;
var boundary;
var ground;
var obstacles = [];
var birdImage, bird;
var backgroundImage;
var slingImage;

// Slingshot Varibales
var startPosition,position,velocity,gravity;


function preload(){

	birdImage = loadImage('assets/angrybird.png'); // Load bird Image
	backgroundImage = loadImage('assets/background1.jpg') // Load background Image
	slingImage = loadImage('assets/sling.png');  // Load sling Image

}


function setup() {
	createCanvas(windowWidth, windowHeight); // Display for game

	// Initialize box2d physics and create the world
	world = createWorld();

	// Create Ground
	ground = new Ground(0,height-90, 8000, 80);

	// Create boundary
	boundary = new Boundary(5, height / 2, 10, height, 0);

	// Creating catapult
  catapult = new Catapult(280,708,40,130,slingImage,birdImage);

	// Create Obstacle
	for(let i = 0; i < 3; i++){
		obstacles[i] = new Obstacles(1300, 600 - i * 70, 84, 100, '#FDBB01');
	};

	// Create Bird
	bird = new Bird(100, 40, 50, 65, birdImage);

	// Create SlingShot
	slingshot = new SlingShot();

};


function draw() {
	background(backgroundImage); // Background Color

	// We must always step through time!
	let timeStep = 1.0 / 60;
	// 2nd and 3rd arguments are velocity and position iterations.
	world.Step(timeStep, 10, 10);

	textSize(50);
	fill('#D80026');
	text('Angry Birds', width/2 - 150, 80);

	ground.show(); // Draw ground

	boundary.show() // Draw boundary

	slingshot.update(mouseX, mouseY);

	catapult.show(); // Draw catapult

	for(let obstacle of obstacles){
		obstacle.show() // Draw obstacle
	};

	bird.show(); // Draw Bird

	slingshot.show(); //  Draw  SlingShot
};


function mousePressed() {
	// Check to see if the mouse was clicked on the box
  if (bird.contains(mouseX, mouseY)) {
    // And if so, bind the mouse position to the box with a spring
    slingshot.bind(mouseX, mouseY, bird);
  };
};


function mouseReleased() {
	slingshot.destroy();
}
