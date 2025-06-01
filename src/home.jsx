import { Box, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { useState } from 'react';
import ShapeCalculator from './shape-calculator/shape-calculator';

const Home = () => {
  const [shape, setShape] = useState('');
  const [result, setResult] = useState({ area: '', perimeter: '' });

  const handleShapeChange = (event) => {
    setShape(event.target.value);
    setResult({ area: '', perimeter: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5">Geometry Calculator</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="shape-label">Select Shape</InputLabel>
        <Select labelId="shape-label" id="shape" value={shape} label="Select Shape" onChange={handleShapeChange}>
          <MenuItem value="">Select Shape</MenuItem>
          <MenuItem value="Square">Square</MenuItem>
          <MenuItem value="Rectangle">Rectangle</MenuItem>
          <MenuItem value="Circle">Circle</MenuItem>
          <MenuItem value="Triangle">Triangle</MenuItem>
        </Select>
      </FormControl>

      {shape && <ShapeCalculator shape={shape} setResult={setResult} />}

      {result.area && result.perimeter && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Area: {result.area}</Typography>
          <Typography variant="h6">Perimeter: {result.perimeter}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Home;
