class Matrix {
  public fullPath!: string;
  public matrix: string[][];
  public pathCoordinates: { x: number; y: number }[] = [];
  public letters!: string;

  constructor(matrix: string[][]) {
    this.matrix = matrix;
  }

  print() {
    for (let i = 0, len = this.matrix.length; i < len; i++) {
      const row = this.matrix[i];
      console.log(row.join(" "));
    }
  }

  static createEmptyMatrix(columns: number, rows: number) {
    const matrix: string[][] = [];
    for (let i = 0, len = rows; i < len; i++) {
      const row = [];
      for (let y = 0, len = columns; y < len; y++) {
        row.push("");
      }

      matrix.push(row);
    }
    return new Matrix(matrix);
  }
  findLetters() {
    this.fullPath ?? this.getFullPath();
    const letters = this.fullPath.match(/[A-Z]/g);

    this.letters = letters?.join("") || "";

    return this.letters;
  }
  getFullPath(): string {
    this.matrix;
    let x = 0;
    let y = 0;
    let dimension: "Vertical" | "Horizontal" = "Horizontal";
    let path = "";
    let index = this.matrix[x][y];
    let direction = "right";

    const verticalRegEx = /[^\s-]/;
    const horizontalRegEx = /[^\s|]/;

    while (true) {
      const topNeighbor = this.matrix[x - 1]?.[y];
      const bottomNeighbor = this.matrix[x + 1]?.[y];
      const leftNeighbor = this.matrix[x]?.[y - 1];
      const rightNeighbor = this.matrix[x]?.[y + 1];
      path += index;

      this.pathCoordinates.push({ x, y });
      if (index === "s") {
        break;
      }

      // check if the index is a turn or start point
      if (index === "+" || index.match(/[A-Z>]/) || index === ">") {
        if (dimension === "Horizontal") {
          if (bottomNeighbor?.match(verticalRegEx)) {
            direction = "bottom";

            dimension = "Vertical";
          }

          if (topNeighbor?.match(verticalRegEx)) {
            direction = "top";

            dimension = "Vertical";
          }
        } else if (dimension === "Vertical") {
          if (rightNeighbor?.match(horizontalRegEx)) {
            direction = "right";

            dimension = "Horizontal";
          }
          if (leftNeighbor?.match(horizontalRegEx)) {
            direction = "left";

            dimension = "Horizontal";
          }
        }
      }

      // check if we move horizontally
      if (dimension === "Horizontal") {
        if (leftNeighbor?.match(horizontalRegEx) && direction === "left") {
          index = leftNeighbor;
          direction = "left";
          y--;
        } else if (
          rightNeighbor?.match(horizontalRegEx) &&
          direction === "right"
        ) {
          index = rightNeighbor;
          direction = "right";
          y++;
        }
      }

      //  check if we move vertically
      if (dimension === "Vertical") {
        if (topNeighbor?.match(verticalRegEx) && direction === "top") {
          index = topNeighbor;
          x--;
          direction = "top";
        } else if (
          bottomNeighbor?.match(verticalRegEx) &&
          direction === "bottom"
        ) {
          index = bottomNeighbor;
          direction = "bottom";
          x++;
        }
      }
    }

    this.fullPath = path;
    return path;
  }
}

export default Matrix;
