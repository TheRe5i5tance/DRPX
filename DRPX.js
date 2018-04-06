DRPXconfig = {
  pxSize: 2
};

pxCount = 1;

// Math and Helpers
vec2 = function (x, y = undefined) {
  if (Array.isArray(x)) {
    return vec2(x[0], x[1]);
  }
  if (x.x && x.y) {
    return vec2(x.x, x.y);
  }
  return { x: x, y: y };
}

vec2Add = function (a, b) {
  return vec2(
    a.x + b.x,
    a.y + b.y
  );
};

sin = Math.sin;
cos = Math.cos;
abs = Math.abs;
PI = Math.PI;
PI2 = PI * 2;
sqrt = Math.sqrt;
round = Math.round;
floor = Math.floor;
ceil = Math.ceil;

clamp = function (val, min = 0, max = 1) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
};

normalize = function (val, start, end) {
  var length = end - start;
  var n = val - start;
  n = n / length;
  return clamp(n);
};

modulate = function (val, start, end, originStart = 0, originEnd = 1) {
    val = normalize(val, originStart, originEnd);
    var length = end - start;
    var m = val * length + start;
    return m;
};

smoothstep = function (min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
};

distance = function (a, b) {
  var diff = vec2(b.x - a.x, b.y - a.y);
  return sqrt(diff.x * diff.x + diff.y * diff.y);
};

fract = function (n) {
  return n % 1;
};


// Text

// via https://raw.githubusercontent.com/burakcan/jsgs/master/src/OS/font.lib.js

var gliphs = { '_': [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a: [ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, ], b: [ 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, ], c: [ 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, ], d: [ 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, ], e: [ 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, ], f: [ 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, ], g: [ 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, ], h: [ 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, ], i: [ 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, ], j: [ 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, ], k: [ 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, ], l: [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, ], m: [ 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, ], n: [ 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, ], o: [ 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, ], p: [ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, ], q: [ 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, ], r: [ 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, ], s: [ 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, ], t: [ 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, ], u: [ 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, ], v: [ 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, ], w: [ 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, ], x: [ 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, ], y: [ 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, ], z: [ 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, ], "0": [ 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, ], "1": [ 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, ], "2": [ 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, ], "3": [ 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, ], "4": [ 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, ], "5": [ 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, ], "6": [ 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, ], "7": [ 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ], "8": [ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, ], "9": [ 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, ], "!": [ 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, ], '"': [ 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ], "#": [ 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, ], "%": [ 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, ], "'": [ 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ], "(": [ 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, ], ")": [ 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, ], "*": [ 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, ], "+": [ 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, ], ",": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, ], "-": [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, ], ".": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, ], "/": [ 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, ], ":": [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, ], "<": [ 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, ], ">": [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, ], "=": [ 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, ], "?": [ 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, ], "[": [ 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, ], "]": [ 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, ], "^": [ 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ], "~": [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, ], };

var generateTextSprite = (text) => {
  text = text.toLowerCase();
  var sprite = {
    width: text.length * 4,
    height: 5,
    data: []
  };
  text.split('').forEach((char, i) => {
    if (char === ' ') {
      char = '_'
    }
    sprite.data[sprite.width * 0 + i * 4 + 0] = gliphs[char][00];
    sprite.data[sprite.width * 0 + i * 4 + 1] = gliphs[char][01];
    sprite.data[sprite.width * 0 + i * 4 + 2] = gliphs[char][02];
    sprite.data[sprite.width * 1 + i * 4 + 0] = gliphs[char][03];
    sprite.data[sprite.width * 1 + i * 4 + 1] = gliphs[char][04];
    sprite.data[sprite.width * 1 + i * 4 + 2] = gliphs[char][05];
    sprite.data[sprite.width * 2 + i * 4 + 0] = gliphs[char][06];
    sprite.data[sprite.width * 2 + i * 4 + 1] = gliphs[char][07];
    sprite.data[sprite.width * 2 + i * 4 + 2] = gliphs[char][08];
    sprite.data[sprite.width * 3 + i * 4 + 0] = gliphs[char][09];
    sprite.data[sprite.width * 3 + i * 4 + 1] = gliphs[char][10];
    sprite.data[sprite.width * 3 + i * 4 + 2] = gliphs[char][11];
    sprite.data[sprite.width * 4 + i * 4 + 0] = gliphs[char][12];
    sprite.data[sprite.width * 4 + i * 4 + 1] = gliphs[char][13];
    sprite.data[sprite.width * 4 + i * 4 + 2] = gliphs[char][14];

  });
  
  return sprite;
};


var sprite = (sprite, uv, center) => {
  var uvPX = vec2(uv.x, uv.y);
  uvPX.x *= pxCount;
  uvPX.y *= pxCount;
  var centerPX = vec2(center.x, center.y);
  center.x *= pxCount;
  center.y *= pxCount;
  var startX = floor(center.x - sprite.width / 2);
  var startY = floor(center.y - sprite.height / 2);
  if (uvPX.x < startX || uvPX.x >= startX + sprite.width ) {
    return 0;
  }
  if (uvPX.y < startY || uvPX.y >= startY + sprite.height ) {
    return 0;
  }
  var spriteUV = vec2(
    floor(uvPX.x - startX),
    floor(uvPX.y - startY)
  );
  return sprite.data[spriteUV.y * sprite.width + spriteUV.x];
}


// Color

PALETTE = {
  ORANGE: 1,
  GREEN: 2,
  RED: 3,
  BLUE: 4
};

// PICO8 Palette: https://www.romanzolotarev.com/pico-8-color-palette/
colors = [
  '#000000', // 00 black
  '#1D2B53', // 01 dark-blue
  '#7E2553', // 02 dark-purple
  '#008751', // 03 dark-green
  '#AB5236', // 04 brown
  '#5F574F', // 05 dark-gray
  '#C2C3C7', // 06 light-gray
  '#FFF1E8', // 07 white
  '#FF004D', // 08 red
  '#FFA300', // 09 orange
  '#FFEC27', // 10 yellow
  '#00E436', // 11 green
  '#29ADFF', // 12 blue
  '#83769C', // 13 indigo
  '#FF77A8', // 14 pink
  '#FFCCAA'  // 15 peach
];

palettes = [
  [ 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15 ],
  [ 00, 00, 01, 02, 04, 09, 15, 10, 07, 07 ],
  [ 00, 00, 01, 02, 05, 03, 11, 10, 07, 07 ],
  [ 00, 00, 01, 02, 08, 14, 15, 10, 07, 07 ],
  [ 00, 00, 01, 02, 13, 12, 06, 10, 07, 07 ]
];

// given a value and the uv, return a color using the palette and basic dithering
var getColor = function (v, uv, paletteId = 0) {
  var palette = palettes[paletteId];
  v += 1 / (palette.length * 8);
  v = clamp(v);
  var colorId;
  
  var dither = Math.floor((v * (palette.length)) * 4) % 4;
  if (dither < 1) {
    colorId = palette[Math.floor(v * (palette.length))];
  } else if (dither < 2) {
    var uPX = uv.x * pxCount;
    var vPX = uv.y * pxCount;
    var prevColor = palette[Math.floor(v * (palette.length))];
    var nextColor = palette[Math.floor(v * (palette.length)) + 1];
    colorId = (uPX + vPX + uPX) % 4 ? prevColor : nextColor;
  } else if (dither < 3) {
    var uPX = uv.x * pxCount;
    var vPX = uv.y * pxCount;
    var prevColor = palette[Math.floor(v * (palette.length))];
    var nextColor = palette[Math.floor(v * (palette.length)) + 1];
    colorId = (uPX + vPX) % 2 ? prevColor : nextColor;
  } else {
    var uPX = uv.x * pxCount;
    var vPX = uv.y * pxCount;
    var prevColor = palette[Math.floor(v * (palette.length))];
    var nextColor = palette[Math.floor(v * (palette.length)) + 1];
    colorId = (uPX + vPX + uPX) % 4 ? nextColor : prevColor;
  }
  return colors[colorId];
};

// Masks
MASK = {
  CIRCLES_1_FULL:       00,
  CIRCLES_1_HALF:       01,
  CIRCLES_1_HALFS:      02,
  CIRCLES_4_FULL:       03,
  CIRCLES_4_HALF:       04,
  CIRCLES_4_HALFS:      05,
  SQUARES_1_FULL:       06,
  SQUARES_1_HALF:       07,
  SQUARES_1_HALFS:      08,
  SQUARES_4_FULL:       09,
  SQUARES_4_HALF:       10,
  SQUARES_4_HALFS:      11,
};

var maskMargin = 5/180;
var drawMask = {};

// CIRCLES_1_FULL
drawMask[00] = function (ctx, size, clipping) {
  ctx.fillStyle = 'black';
  if (clipping) {
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, PI2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
};

// CIRCLES_1_HALF
drawMask[01] = function (ctx, size, clipping) {
  ctx.fillStyle = 'black';
  if (clipping) {
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, PI);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
};

// CIRCLES_1_HALFS
drawMask[02] = function (ctx, size, clipping) {
  ctx.fillStyle = 'black';
  if (clipping) {
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size / 2, 0, size / 2, 0, PI);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
};

// CIRCLES_4_FULL
drawMask[03] = function (ctx, size, clipping) {
  ctx.fillStyle = 'black';
  if (clipping) {
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.beginPath();
  ctx.arc(size * 0.25, size * 0.25, size / 4, 0, PI2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size * 0.75, size * 0.25, size / 4, 0, PI2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size * 0.25, size * 0.75, size / 4, 0, PI2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size * 0.75, size * 0.75, size / 4, 0, PI2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
};

// SQUARES_1_HALF
drawMask[07] = function (ctx, size, clipping) {
  ctx.fillStyle = 'black';
  if (clipping) {
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.beginPath();
  ctx.moveTo(size*maskMargin, size*maskMargin);
  ctx.lineTo(size*(1-maskMargin), size*(1-maskMargin));
  ctx.lineTo(size*maskMargin, size*(1-maskMargin));
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
};

// SQUARES_4_FULL
drawMask[09] = function (ctx, size, clipping) {
  var s = size*(1-2*maskMargin);
  ctx.fillStyle = 'black';
  if (clipping) {
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.fillRect(size*maskMargin, size*maskMargin, s/2, s/2);
  ctx.fillRect(size*maskMargin+s/2, size*maskMargin+s/2, s/2, s/2);
  ctx.globalCompositeOperation = 'source-over';
};

// SQUARES_4_HALFS
drawMask[11] = function (ctx, size, clipping) {
  var s = size*(1-2*maskMargin);
  ctx.fillStyle = 'black';
  if (clipping) {
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-out';
  }
  ctx.beginPath();
  ctx.moveTo(size*maskMargin, size*maskMargin);
  ctx.lineTo(size*maskMargin+s/2, size*maskMargin+s/2);
  ctx.lineTo(size*maskMargin, size*maskMargin+s/2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(size*maskMargin+s/2, size*maskMargin);
  ctx.lineTo(size*maskMargin+s, size*maskMargin+s/2);
  ctx.lineTo(size*maskMargin+s/2, size*maskMargin+s/2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(size*maskMargin, size*maskMargin+s/2);
  ctx.lineTo(size*maskMargin+s/2, size*maskMargin+s);
  ctx.lineTo(size*maskMargin, size*maskMargin+s);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(size*maskMargin+s/2, size*maskMargin+s/2);
  ctx.lineTo(size*maskMargin+s, size*maskMargin+s);
  ctx.lineTo(size*maskMargin+s/2, size*maskMargin+s);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
};

// Rect
class DRPX {
  constructor (ctx, size, paletteId, templates, frag) {
    this.ctx = ctx;
    if (typeof templates[0] === 'number') {
      this.templates = [templates];
    } else {
      this.templates = templates;
    }
    this.size = size;
    this.paletteId = paletteId;
    this.frag = frag;
    this.playing = false;
    this.loop = this.loop.bind(this);
    this.preRenderMasks();
  }
  preRenderMasks () {
    var ctx = this.ctx;
    var size = this.size;
    var canvasSize = {
      w: ctx.canvas.width,
      h: ctx.canvas.height
    };
    this.templates.forEach(function (template) {
      if (typeof template[2] === 'number') {
        var image = new Image();
        ctx.clearRect(0, 0, size, size);
        ctx.canvas.width = size;
        ctx.canvas.height = size;
        if (template[4]) {
          ctx.save();
          ctx.translate(size/2, size/2);
          ctx.rotate(template[4] * PI/2);
          ctx.translate(-size/2, -size/2);
        }
        drawMask[template[2]](ctx, size, template[3]);
        if (template[4]) {
          ctx.restore();
        }
        image.src= ctx.canvas.toDataURL('image/png');
        template.maskImage = image;
      }
    });
    ctx.canvas.width = canvasSize.w;
    ctx.canvas.height = canvasSize.h;
    ctx.clearRect(0, 0, size, size);
  }
  start () {
    if (this.playing) return;
    this.playing = true;
    this.loop();
    return this;
  }
  stop () {
    this.playing = false;
    return this;
  }
  loop (ms) {
    this.paint(ms);
    if (this.playing) {
      requestAnimationFrame(this.loop);
    }
  }
  paint (time) {
    var pxSize = DRPXconfig.pxSize;
    pxCount = this.size / pxSize;
    var ctx = this.ctx;

    for (var u = 0; u < pxCount; u++) {
      for (var v = 0; v < pxCount; v++) {
        var uv = vec2(u / pxCount, v / pxCount);
        var value = this.frag(uv, time / 1000);
        var color = getColor(value, uv, this.paletteId);
        this.ctx.fillStyle = color;
        this.templates.forEach(function (template) {
          var center = vec2(template[0], template[1]);
          ctx.fillRect(
            center.x + u * pxSize,
            center.y + v * pxSize,
            pxSize,
            pxSize
          );
        });
      }
    }
    this.templates.forEach(function (template) {
      if (!template.maskImage) return;
      ctx.drawImage(template.maskImage, template[0], template[1]);

      //ctx.putImageData(template.maskData, template[0], template[1]);
      //drawMask[template[2]](ctx, vec2(template[0], template[1]), size, template[3]);
    });
  }
}
