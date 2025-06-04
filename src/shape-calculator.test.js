import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShapeCalculator from './shape-calculator/shape-calculator';

describe('ShapeCalculator', () => {
  it('renders inputs for Square with Side', () => {
    render(<ShapeCalculator shape="Square" setResult={jest.fn()} />);
    expect(screen.getByRole('textbox', { name: /Value 1/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Value 2/i })).toBeInTheDocument();
  });

  it('renders inputs for Circle', () => {
    render(<ShapeCalculator shape="Circle" setResult={jest.fn()} />);
    expect(screen.getByRole('textbox', { name: /Center/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Radius/i })).toBeInTheDocument();
  });

  it('renders inputs for Triangle', () => {
    render(<ShapeCalculator shape="Triangle" setResult={jest.fn()} />);
    expect(screen.getByRole('textbox', { name: /Point 1/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Point 2/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Point 3/i })).toBeInTheDocument();
  });

  it('calculates Square area by Side', async () => {
    const mockSetResult = jest.fn();
    render(<ShapeCalculator shape="Square" setResult={mockSetResult} />);

    fireEvent.mouseDown(screen.getByLabelText('Field 1'));
    const listbox = await screen.findByRole('listbox');
    fireEvent.click(within(listbox).getByText('Side'));

    fireEvent.change(screen.getByLabelText(/Value 1/i), { target: { value: '4' } });

    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(mockSetResult).toHaveBeenCalledWith({
      area: '16.0',
      perimeter: '16.0',
    });
  });

  it('calculates Square area by Coordinate', async () => {
    const mockSetResult = jest.fn();
    render(<ShapeCalculator shape="Square" setResult={mockSetResult} />);

    fireEvent.mouseDown(screen.getByLabelText('Field 1'));
    const listbox1 = await screen.findByRole('listbox');
    fireEvent.click(within(listbox1).getByText('TopRight'));

    fireEvent.change(screen.getByLabelText(/Value 1/i), { target: { value: '1,1' } });

    fireEvent.mouseDown(screen.getByLabelText('Field 2'));
    const listbox2 = await screen.findByRole('listbox');
    fireEvent.click(within(listbox2).getByText('BottomLeft'));

    fireEvent.change(screen.getByLabelText(/Value 2/i), { target: { value: '3,3' } });

    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(mockSetResult).toHaveBeenCalledWith({
      area: '4.0',
      perimeter: '8.0',
    });
  });

  it('calculates area and perimeter for Circle', () => {
    const mockSetResult = jest.fn();
    render(<ShapeCalculator shape="Circle" setResult={mockSetResult} />);

    fireEvent.change(screen.getByLabelText(/Radius/i), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(mockSetResult).toHaveBeenCalledWith({
      area: '78.5',
      perimeter: '31.4',
    });
  });

  it('calculates area and perimeter for Triangle', () => {
    const mockSetResult = jest.fn();
    render(<ShapeCalculator shape="Triangle" setResult={mockSetResult} />);

    fireEvent.change(screen.getByLabelText(/Point 1/i), { target: { value: '0,0' } });
    fireEvent.change(screen.getByLabelText(/Point 2/i), { target: { value: '2,0' } });
    fireEvent.change(screen.getByLabelText(/Point 3/i), { target: { value: '1,2' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(mockSetResult).toHaveBeenCalledWith({
      area: '2.0',
      perimeter: '6.5',
    });
  });
});
