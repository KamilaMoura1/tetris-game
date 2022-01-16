function createBaseTetriminos() {
    tetriminosBase = {
      Z: {
        color: "red",
        mapa: [
          createVector(),
          createVector(-1, -1),
          createVector(0, -1),
          createVector(1, 0),
        ],
      },
      S: {
        color: "lime",
        mapa: [
          createVector(),
          createVector(1, -1),
          createVector(0, -1),
          createVector(-1, 0),
        ],
      },
      J: {
        color: "orange",
        mapa: [
          createVector(),
          createVector(-1, 0),
          createVector(-1, -1),
          createVector(1, 0),
        ],
      },
      L: {
        color: "dodgerblue",
        mapa: [
          createVector(),
          createVector(-1, 0),
          createVector(1, -1),
          createVector(1, 0),
        ],
      },
      T: {
        color: "magenta",
        mapa: [
          createVector(),
          createVector(-1, 0),
          createVector(1, 0),
          createVector(0, -1),
        ],
      },
      O: {
        color: "yellow",
        mapa: [
          createVector(),
          createVector(0, -1),
          createVector(1, -1),
          createVector(1, 0),
        ],
      },
      I: {
        color: "cyan",
        mapa: [
          createVector(),
          createVector(-1, 0),
          createVector(1, 0),
          createVector(2, 0),
        ],
      },
    };
  }
