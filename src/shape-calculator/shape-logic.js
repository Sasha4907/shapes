import {
  getAreaRectangle,
  getAreaSquare,
  getDimensions,
  getPerimeterRectangle,
  getPerimeterSquare,
  isCorner,
  parsePoint,
} from './helper';

const getSquareResult = (field1, field2, value1, value2) => {
  let area = null;
  let perimeter = null;

  if (field1 === 'Side' || field2 === 'Side') {
    const side = parseFloat(field1 === 'Side' ? value1 : value2);
    if (!isNaN(side)) {
      area = getAreaSquare(side);
      perimeter = getPerimeterSquare(side);
    }
  } else if (isCorner(field1) && isCorner(field2)) {
    const p1 = parsePoint(value1);
    const p2 = parsePoint(value2);
    if (p1 && p2) {
      const [dx, dy] = getDimensions(p1, p2);

      const sameY = p1.y === p2.y;
      const sameX = p1.x === p2.x;

      if (sameY && dx > 0) {
        const side = dx;
        area = getAreaSquare(side);
        perimeter = getPerimeterSquare(side);
      } else if (sameX && dy > 0) {
        const side = dy;
        area = getAreaSquare(side);
        perimeter = getPerimeterSquare(side);
      } else if (dx === dy) {
        const side = dx;
        area = getAreaSquare(side);
        perimeter = getPerimeterSquare(side);
      } else {
        return;
      }
    }
  }
  return [area, perimeter];
};

const getRectangleResult = (field1, field2, value1, value2) => {
  let area = null;
  let perimeter = null;

  if ((field1 === 'Width' && field2 === 'Height') || (field1 === 'Height' && field2 === 'Width')) {
    const width = parseFloat(field1 === 'Width' ? value1 : value2);
    const height = parseFloat(field1 === 'Height' ? value1 : value2);
    if (!isNaN(width) && !isNaN(height)) {
      area = getAreaRectangle(width, height);
      perimeter = getPerimeterRectangle(width, height);
    }
  } else if (isCorner(field1) && isCorner(field2)) {
    const p1 = parsePoint(value1);
    const p2 = parsePoint(value2);
    if (p1 && p2) {
      const [width, height] = getDimensions(p1, p2);
      area = getAreaRectangle(width, height);
      perimeter = getPerimeterRectangle(width, height);
    }
  }
  return [area, perimeter];
};

export { getSquareResult, getRectangleResult };
