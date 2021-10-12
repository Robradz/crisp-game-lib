title = "Solar Flare";

description = `
[Tap]
Teleport
to purple
`;

// (l: black, r: red, g: green, b: blue
//  y: yellow, p: purple, c: cyan
//  L: light_black, R: light_red, G: light_green, B: light_blue
//  Y: light_yellow, P: light_purple, C: light_cyan)
characters = [
`
 GGbb
GGbbbG
GGGbbb
bGGbbG
bbGbbb
 bCCb
`
,`
YYyyYY
YyyyyY
yyyyyy
yyyyyy
YyyyyY
YYyyYY
`
,`



y   y
 yYyY
YYYYYy
`
,`
Y y
Yy
YY
Yy 
YYy
y
`
,`
     y
   yYY
    yY
    YY
    yY
   y Y
`
,`
yYYYYY
 YyYy
 y   y



`
,`
pp
pp
`
,`
 YY
YyyY
YyyY
 YY
`
];

options = {
  theme: 'crt'
};

class flare {
  constructor(x, y, deltaX, deltaY) {
    this.x = x;
    this.y = y;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
  }

  move(){
    this.x += this.deltaX;
    this.y += this.deltaY;
    char("h", this.x, this.y);
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.deltaX = Math.random() - 0.5;
    this.deltaY = Math.random() - 0.5;
  }

  checkScreen() {
    if (this.x > 100 || this.x < 0 ||
      this.y > 100 || this.y < 0) {
      this.reset();
      score++;
    }
  }
}

let clockwise = true;
let x,x2 = 1;
let y,y2 = 0;


let earth;
let myTicks = 0;
let flares = [];

function update() {
  // initial
  if (!ticks) {
    earth = {
      av:0
    };
  }

  char("b", 50, 50)
  char("c", 50, 44)
  char("d", 54, 50)
  char("e", 44, 50)
  char("f", 50, 56)

  if (input.isJustReleased) {
    clockwise = !clockwise;
    if ((x > 0 && y < 0) || (y > 0 && x < 0)) {
      myTicks -= 180;
    }
  }

  if (clockwise) {
    x = 40 * cos(myTicks * PI / 180);
    y = 45 * sin(myTicks * PI / 180);
    if ((x > 0 && y >= 0) || (x < 0 && y <= 0)) {
      x2 = 40 * sin(myTicks * PI / 180);
      y2 = 45 * cos(myTicks * PI / 180);
    } else if (x > 0 && y <= 0 || x < 0 && y >= 0) {
      x2 = -40 * sin(myTicks * PI / 180);
      y2 = -45 * cos(myTicks * PI / 180);
    }
    myTicks += 1;
  } else {
    x = 40 * sin(myTicks * PI / 180);
    y = 45 * cos(myTicks * PI / 180);
    if ((x > 0 && y >= 0) || (x < 0 && y <= 0)) {
      x2 = 40 * cos(myTicks * PI / 180);
      y2 = 45 * sin(myTicks * PI / 180);
    } else if (x > 0 && y <= 0 || x < 0 && y >= 0) {
      x2 = -40 * cos(myTicks * PI / 180);
      y2 = -45 * sin(myTicks * PI / 180);
    }
    myTicks += 1;
  }
  
  // check if flares are on screen
  flares.forEach(f => f.checkScreen());

  // if there aren't 5 flares, add more
  if (flares.length < difficulty * 5) {
    let newFlare = new flare(50, 50, 
      Math.random() - 0.5, Math.random() - 0.5);
    flares.push(newFlare);
  }

  flares.forEach(f => f.move());

  char("g", x2+50, y2+50);
  const heatDeath = char("a", x+50, y+50).isColliding.char.h;
  if (heatDeath) {
    flares.forEach(f => f.reset());
    end();
  }
}
