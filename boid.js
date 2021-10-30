class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();

    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 8;
    this.size = 6;
    this.perceptionRadius = 25;

    this.velocity.setMag(random(2, this.maxSpeed));
  }

  edges(){
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(boids) {
    let steering = createVector();

    for (let other of boids) {
      steering.add(other.velocity); //sums the velocities of all of the boids within perceptionRadius
    }
    if (boids.length > 0) {
      steering.div(boids.length); // works out average velocity vector of group
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity); // works out steering = desired - current
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let steering = createVector();

    for (let other of boids) {
      steering.add(other.position);
    }
    if (boids.length > 0) {
      steering.div(boids.length);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let steering = createVector();
    for (let other of boids) {
      let diff = p5.Vector.sub(this.position, other.position);
      diff.div(diff.mag()/2);
      steering.add(diff);
    }
    if (boids.length > 0) {
      steering.div(boids.length);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let group = [];

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.x,
        other.y
      );
      if (other.data != this) {
        group.push(other.data);
      }
    }
    let alignment = this.align(group);
    let cohesion = this.cohesion(group);
    let separation = this.separation(group);

    separation.mult(separationSlider.value());
    cohesion.mult(cohesionSlider.value());
    alignment.mult(alignSlider.value());

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);

  }

  update() {

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }


  show(){
    strokeWeight(1);
    //stroke(255,0,0);
    //point(this.position.x, this.position.y);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    stroke(255);
    fill(255,50);
    triangle(
      -this.size, -this.size / 2,
      -this.size, this.size / 2,
      this.size, 0
    );
    //fill(255,0);
    //ellipse(0, 0, 25, 25);

    pop();

  }


}
