import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';
import { distance, isCorner, parsePoint } from './helper';
import SHAPE_FIELD_OPTIONS from '../constant';

const ShapeCalculator = ({ shape, setResult }) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [circleData, setCircleData] = useState({ center: '', radius: '' });
  const [triangleData, setTriangleData] = useState({
    point1: '',
    point2: '',
    point3: '',
  });

  useEffect(() => {
    setField1('');
    setField2('');
    setValue1('');
    setValue2('');
    setCircleData({ center: '', radius: '' });
    setTriangleData({ point1: '', point2: '', point3: '' });
  }, [shape]);

  const handleSubmit = () => {
    let area = null;
    let perimeter = null;

    if (shape === 'Square') {
      if (field1 === 'Side' || field2 === 'Side') {
        const side = parseFloat(field1 === 'Side' ? value1 : value2);
        if (!isNaN(side)) {
          area = side ** 2;
          perimeter = 4 * side;
        }
      } else if (isCorner(field1) && isCorner(field2)) {
        const p1 = parsePoint(value1);
        const p2 = parsePoint(value2);
        if (p1 && p2) {
          const dx = Math.abs(p1.x - p2.x);
          const dy = Math.abs(p1.y - p2.y);

          const sameY = p1.y === p2.y;
          const sameX = p1.x === p2.x;

          if (sameY && dx > 0) {
            const side = dx;
            area = side * side;
            perimeter = 4 * side;
          } else if (sameX && dy > 0) {
            const side = dy;
            area = side * side;
            perimeter = 4 * side;
          } else if (dx === dy) {
            const side = dx;
            area = side * side;
            perimeter = 4 * side;
          } else {
            return;
          }
        }
      }
    } else if (shape === 'Rectangle') {
      if ((field1 === 'Width' && field2 === 'Height') || (field1 === 'Height' && field2 === 'Width')) {
        const width = parseFloat(field1 === 'Width' ? value1 : value2);
        const height = parseFloat(field1 === 'Height' ? value1 : value2);
        if (!isNaN(width) && !isNaN(height)) {
          area = width * height;
          perimeter = 2 * (width + height);
        }
      } else if (isCorner(field1) && isCorner(field2)) {
        const p1 = parsePoint(value1);
        const p2 = parsePoint(value2);
        if (p1 && p2) {
          const width = Math.abs(p1.x - p2.x);
          const height = Math.abs(p1.y - p2.y);
          area = width * height;
          perimeter = 2 * (width + height);
        }
      }
    } else if (shape === 'Circle') {
      const radius = parseFloat(circleData.radius);
      if (!isNaN(radius)) {
        area = Math.PI * radius * radius;
        perimeter = 2 * Math.PI * radius;
      }
    } else if (shape === 'Triangle') {
      const p1 = parsePoint(triangleData.point1);
      const p2 = parsePoint(triangleData.point2);
      const p3 = parsePoint(triangleData.point3);
      if (p1 && p2 && p3) {
        const a = distance(p1, p2);
        const b = distance(p2, p3);
        const c = distance(p3, p1);
        perimeter = a + b + c;
        const s = perimeter / 2;
        area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      }
    }

    if (area !== null && perimeter !== null) {
      setResult({
        area: area.toFixed(1),
        perimeter: perimeter.toFixed(1),
      });
    } else {
      alert('Unable to calculate. Please check input.');
    }
  };

  return (
    <Box>
      {(shape === 'Square' || shape === 'Rectangle') && (
        <Box sx={{ mt: 2 }}>
          <Box className={styles.customBox}>
            <FormControl className={styles.minWidthBig}>
              <InputLabel id="field1-label" htmlFor="field1-select">
                Field 1
              </InputLabel>
              <Select
                id="field1-select"
                labelId="field1-label"
                label="Field 1"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
              >
                {SHAPE_FIELD_OPTIONS[shape].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Value 1"
              helperText="Please enter coordinates in the format x,y (e.g. 3.5,4.2)"
              fullWidth
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
          </Box>

          <Box className={styles.customBox}>
            <FormControl className={styles.minWidthBig}>
              <InputLabel id="field2-label" htmlFor="field2-select">
                Field 2
              </InputLabel>
              <Select
                id="field2-select"
                value={field2}
                labelId="field2-label"
                label="Field 2"
                onChange={(e) => setField2(e.target.value)}
              >
                {SHAPE_FIELD_OPTIONS[shape]
                  .filter((option) => option !== field1)
                  .map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Value 2"
              helperText="Please enter coordinates in the format x,y (e.g. 3.5,4.2)"
              fullWidth
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
          </Box>
        </Box>
      )}

      {shape === 'Circle' && (
        <Box sx={{ mt: 2 }}>
          <Box className={`${styles.customBox} ${styles.circle}`}>
            <Typography variant="body1" className={styles.minWidthSmall}>
              Center
            </Typography>
            <TextField
              fullWidth
              label="Center"
              value={circleData.center}
              onChange={(e) => setCircleData({ ...circleData, center: e.target.value })}
            />
          </Box>
          <Box className={`${styles.customBox} ${styles.circle}`}>
            <Typography variant="body1" className={styles.minWidthSmall}>
              Radius
            </Typography>
            <TextField
              fullWidth
              label="Radius"
              value={circleData.radius}
              onChange={(e) => setCircleData({ ...circleData, radius: e.target.value })}
              className={styles.customBox}
            />
          </Box>
        </Box>
      )}

      {shape === 'Triangle' && (
        <Box sx={{ mt: 2 }}>
          <Box className={styles.customBox}>
            <Typography variant="body1" className={`${styles.minWidthSmall} ${styles.triangleText}`}>
              Point 1
            </Typography>
            <TextField
              fullWidth
              label="Point 1"
              helperText="Please enter coordinates in the format x,y (e.g. 3.5,4.2)"
              value={triangleData.point1}
              onChange={(e) => setTriangleData({ ...triangleData, point1: e.target.value })}
            />
          </Box>

          <Box className={styles.customBox}>
            <Typography variant="body1" className={`${styles.minWidthSmall} ${styles.triangleText}`}>
              Point 2
            </Typography>
            <TextField
              fullWidth
              label="Point 2"
              helperText="Please enter coordinates in the format x,y (e.g. 3.5,4.2)"
              value={triangleData.point2}
              onChange={(e) => setTriangleData({ ...triangleData, point2: e.target.value })}
            />
          </Box>

          <Box className={styles.customBox}>
            <Typography variant="body1" className={`${styles.minWidthSmall} ${styles.triangleText}`}>
              Point 3
            </Typography>
            <TextField
              fullWidth
              label="Point 3"
              helperText="Please enter coordinates in the format x,y (e.g. 3.5,4.2)"
              value={triangleData.point3}
              onChange={(e) => setTriangleData({ ...triangleData, point3: e.target.value })}
            />
          </Box>
        </Box>
      )}

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit} disabled={!shape}>
        Calculate
      </Button>
    </Box>
  );
};

export default ShapeCalculator;
