let colors = [];

function boxColor(box) {
  const p = box.y / dim;
  return colors[Math.floor(p * colors.length)];
}

function hitPixel(p, x, y) {
  const c = p.get(x, y);
  return (p.brightness(c) < 254);
}

class Box {
  constructor(p, dim) {
    this.chaste = true;
    this.reset(p, dim);
  }

  reset(p, dim) {
    this.okToDraw = false;
    this.x = p.random(dim);
    this.y = p.random(dim);
    this.d = 0;
  }

  draw(p) {
    if (this.okToDraw) {
      p.fill(this.color);
      p.rect(this.x, this.y, this.d, this.d);
    }
  }
}

export default function sketch(p) {
  window.processing = p;

  const image = p.loadImage('/img/mushi_sakura.png', 'png');
  const dim = 600;
  const numBoxesMax = 1000;
  const paletteSize = 256;
  
  let boxes = [];

  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      const color = p.get(x, y);

      let exists = false;
      for (let c in colors) {
        if (color == c) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        if (colors.length < paletteSize) {
          colors.push(color);
        } else {
          return;
        }
      }
    }
  }

  p.setup = () => {
    p.size(600, 600, p.OPENGL);
    p.rectMode(p.CENTER);
    p.frameRate(30);
    p.background(255);
    p.noStroke();

    boxes.push(new Box(p, dim));
    boxes.push(new Box(p, dim));
    boxes.push(new Box(p, dim));
  };
  
  p.draw = () => {
    p.image(image, 0, 0);
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      box.d += 2;

      let obstructions = 0;
      for (let j = Math.floor(box.x - box.d / 2 - 1); j < Math.floor(j < box.x + box.d / 2); j++) {
        let k = Math.floor(box.y - box.d / 2 - 1);
        if (hitPixel(p, j, k)) {
          obstructions += 1;
        }
        k = (box.y + box.d / 2);
        if (hitPixel(p, j, k)) {
          obstructions += 1;
        }
      }
      for (let k = Math.floor(box.y - box.d / 2 - 1); k < Math.floor(box.y + box.d / 2); k++) {
        let j = Math.floor(box.x - box.d / 2 - 1);
        if (hitPixel(p, j, k)) {
          obstructions += 1;
        }
        j = Math.floor(box.x + box.d / 2);
        if (hitPixel(p, j, k)) {
          obstructions += 1;
        }
      }

      if (obstructions > 0) {
        box.reset(p, dim);
        if (box.chaste) {
          boxes.push(new Box(p, dim));
          box.chaste = false;
        }
      } else {
        box.okToDraw = true;
      }
      
      box.draw(p);
    }
  };
}
