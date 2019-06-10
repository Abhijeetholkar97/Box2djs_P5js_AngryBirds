class Catapult {
  constructor(x, y, w, h,sling,birdImage) {
    this.x = x;     // Number: x-coordinate of the rectangle.
    this.y = y;     // Number: y-coordinate of the rectangle.
    this.w = w;     // Number: width of the rectangle.
    this.h = h;     // Number: height of the rectangle.
    this.sling = sling; // sling1 Image
    this.birdImage = birdImage; // Bird image

  };
  show(){
    image(this.sling,this.x ,this.y , this.w + 150, this.h);
    image(this.birdImage, this.x  + 79, this.y, 50, 45);
  };
};
