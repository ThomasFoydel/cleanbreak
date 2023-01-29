import React from 'react';
import { useSpring, config, animated } from 'react-spring';
import './Square.scss';

const Square = ({ handleClick, instrument, step, value, handleMouseEnter }) => {
  let color;
  let size;
  if (value === 0) {
    color = 'rgb(182, 182, 182)';
    size = 0.6;
  } else if (value === 1) {
    color = 'rgb(23, 23, 23)';
    size = 0.85;
  } else if (value === 2) {
    color = 'rgb(150, 8, 8)';
    size = 1;
  }
  const animationProps = useSpring({
    backgroundColor: color,
    transform: `scale(${size})`,
    config: config.wobbly,
  });

  const handleSquareClick = (e) => {
    handleClick({ instrument, step, value });
  };
  const handleSquareMouseEnter = (e) => {
    handleMouseEnter({ instrument, step, value });
  };
  return (
    <animated.div
      style={animationProps}
      onMouseDown={handleSquareClick}
      className='square'
      onMouseEnter={handleSquareMouseEnter}
    ></animated.div>
  );
};

export default Square;
