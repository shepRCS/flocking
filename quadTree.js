class Point {
  constructor(x, y, data){
    this.x = x;
    this.y = y;
    this.data = data;
    this.inQT = false;
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 5, 5);
    }

}

class Boundary {
  constructor(x, y, w, h) {
    this.centerX = x;
    this.centerY = y;
    this.halfWidth = w;
    this.halfHeight = h;

    //this.show();
  }

  containsPoint(point) {
    if (
      point.x < this.centerX + this.halfWidth &&
      point.x >= this.centerX  - this.halfWidth &&
      point.y > this.centerY - this.halfHeight &&
      point.y <= this.centerY + this.halfHeight
    ) {
      return true;
    }
    return false
  }

  intersects(range) {
    return !(range.centerX - range.halfWidth > this.centerX + this.halfWidth ||
      range.centerX + range.halfWidth < this.centerX - this.halfWidth ||
      range.centerY - range.halfHeight > this.centerY + this.halfHeight ||
      range.centerY + range.halfHeight < this.centerY - this.halfHeight
    )
  }

  show(){
    rectMode(CENTER);
    stroke(255);
    strokeWeight(1);
    noFill();
    rect(this.centerX, this.centerY, this.halfWidth * 2, this.halfHeight * 2);
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  containsPoint(point) {
    let centerDist = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2)

    return centerDist <= this.rSquared;
  }

  intersects(range) {
    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);

    let radius = this.r;
    let width = range.halfWidth;
    let height = range.halfHeight;

    if (xDist > (radius + width) || yDist > (radius + height)) {
      return false;
    }

    if (xDist <= width || yDist <= height) {
      return true;
    }

    let edges = math.pow((xDist - width), 2) + Math.pow((yDist - height), 2);
    return edges <= this.rSquared;
  }

  show () {
    strokeWeight(1);
    stroke(0, 255, 0);
    noFill();
    ellipse(this.x, this.y, this.r *2);
  }
}


class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.contents = [];

    this.northWest = null;
    this.northEast = null;
    this.southWest = null;
    this.southEast = null;

  }

  subDivide() {
    let offsetX = this.boundary.halfWidth / 2;
    let offsetY = this.boundary.halfHeight / 2;
    let nw = new Boundary(
      this.boundary.centerX - offsetX,
      this.boundary.centerY - offsetY,
      offsetX,
      offsetY);
    let ne = new Boundary(
      this.boundary.centerX + offsetX,
      this.boundary.centerY - offsetY,
      offsetX,
      offsetY);
    let sw = new Boundary(
      this.boundary.centerX - offsetX,
      this.boundary.centerY + offsetY,
      offsetX,
      offsetY);
    let se = new Boundary(
      this.boundary.centerX + offsetX,
      this.boundary.centerY + offsetY,
      offsetX,
      offsetY);
    this.northWest = new QuadTree(nw, this.capacity);
    this.northEast = new QuadTree(ne, this.capacity);
    this.southWest = new QuadTree(sw, this.capacity);
    this.southEast = new QuadTree(se, this.capacity);

    for (let p of this.contents) {
      if (this.northWest.insert(p)) {

      } else if (this.northEast.insert(p)) {

      } else if (this.southWest.insert(p)) {

      } else if (this.southEast.insert(p)) {

      }
    }
    this.contents = [];

  }

  insert(point) {
    if (!this.boundary.containsPoint(point)){
      //console.log(point);
      //point.show();
      return false;
    }

    if(this.contents.length < this.capacity && this.northWest == null) {
      //console.log("Insert");
      this.contents.push(point);
      point.inQT = true;
      //point.show();
      return true;
    }

    if(this.northWest == null){
      //console.log("subdivide");
      this.subDivide();
    }

    if (this.northWest.insert(point)){
      return true;
    }
    if (this.northEast.insert(point)){
      return true;
    }
    if (this.southWest.insert(point)){
      return true;
    }
    if (this.southEast.insert(point)){
      return true;
    }
    //point.show();
    return false;
  }


  query(range, found) {
    if (!found) {
      found = []; //if found is empty then create array
    }

    if (!this.boundary.intersects(range)) {
      return found;
    }

    for (let item of this.contents) {
      if (range.containsPoint(item)){
        found.push(item);
      }
    }

    if (this.northWest == null) {
      return found;
    }

    this.northWest.query(range, found);
    this.northEast.query(range, found);
    this.southWest.query(range, found);
    this.southEast.query(range, found);

    return found;

  }

  show() {
    this.boundary.show()

    for (let p of this.contents) {
      strokeWeight(1);
      point(p.x, p.y);
    }

    if (this.northWest == null) {
      return;
    } else {
      this.northWest.show();
      this.northEast.show();
      this.southWest.show();
      this.southEast.show();
    }
  }

}
