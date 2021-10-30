class Flock {
  constructor (numBoids) {
    this.boids = [];

    for (let i = 0; i < numBoids; i++) {
      this.boids.push(new Boid());
    }
    //console.log(this.boids);
  }

  update() {

    for (let boid of this.boids) {
      let  p = new Point (boid.position.x, boid.position.y, boid);
      qt.insert(p);
    }

    for (let boid of this.boids) {
      let range = new Circle(boid.position.x, boid.position.y, boid.perceptionRadius);
      //console.log(range);
      //range.show();
      //debugger;
      let group = qt.query(range);
      //console.log(group);

      boid.flock(group);
    }

    for (let boid of this.boids) {
      boid.update();
      boid.edges();
      boid.show();
    }

  }


}
