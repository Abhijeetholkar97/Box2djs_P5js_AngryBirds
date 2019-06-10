class Bird {
  constructor(pos_x, pos_y, width, height, birdImage) {
    this.w = width;
    this.h = height;
    this.birdImage = birdImage;

    // Define Fixtures
    var fixture  = new box2d.b2FixtureDef();
    fixture.shape = new box2d.b2PolygonShape();
    fixture.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));
    // Some physics
    fixture.density = 1.0;
    fixture.friction = 1.0;
    fixture.restitution  = 0.2;

    // Define Body
    var bd = new  box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(pos_x, pos_y);

    // Create the body
    this.body  = world.CreateBody(bd);
    this.body.CreateFixture(fixture);

    // Some additional Stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  };

  contains(x, y) {
    var worldPoint = scaleToWorld(x, y);
    var f = this.body.GetFixtureList();
    var inside = f.TestPoint(worldPoint);
    return inside;
  };

  KillBody(){
    world.Destroy(this.body)
  }

  // Is the particle ready for deletion?
done() {
  // Let's find the screen position of the particle
  let pos = scaleToPixels(this.body.GetPosition());
  // Is it off the bottom of the screen?
  if (pos.y > height + this.w * this.h) {
    this.KillBody();
    return true;
  }
  return false;
}

  show() {
    var pos = scaleToPixels(this.body.GetPosition());
    var angle = this.body.GetAngleRadians();

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.birdImage, 0, 0, this.w, this.h);
    pop();
  };
};
