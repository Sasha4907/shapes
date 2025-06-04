const parsePoint = (str) => {
  const trimmed = str.trim();
  const parts = trimmed.split(',');

  if (parts.length !== 2) return null;

  const x = parseFloat(parts[0]);
  const y = parseFloat(parts[1]);

  if (isNaN(x) || isNaN(y)) return null;

  return { x, y };
};

const distance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const isCorner = (field) => ['TopRight', 'TopLeft', 'BottomLeft', 'BottomRight'].includes(field);

const getAreaSquare = (side) => {
  return side * side;
};

const getPerimeterSquare = (side) => {
  return 4 * side;
};

const getAreaRectangle = (width, height) => {
  return width * height;
};

const getPerimeterRectangle = (width, height) => {
  return 2 * (width + height);
};

const getDimensions = (p1, p2) => {
  const dx = Math.abs(p1.x - p2.x);
  const dy = Math.abs(p1.y - p2.y);

  return {dx, dy}
};

export { parsePoint, distance, isCorner, getAreaSquare, getPerimeterSquare, getAreaRectangle, getPerimeterRectangle, getDimensions };
