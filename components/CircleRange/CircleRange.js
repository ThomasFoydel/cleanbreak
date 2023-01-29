import React from 'react';
import { CircleSlider } from 'react-circle-slider';
import styles from './CircleRange.module.scss';

const CircleRange = ({ min, max, size, value, onChange, tag, step }) => {
  size = 70;

  const handleChange = (e) => {
    onChange(e, tag);
  };

  return (
    <div className={styles.circleRange}>
      <CircleSlider
        stepSize={step || 5}
        size={size}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        circleWidth='10'
        progressWidth='10'
        knobRadius='8'
        progressColor='#333'
        circleColor='#ddd'
        knobColor='fff'
      ></CircleSlider>
    </div>
  );
};

export default CircleRange;
