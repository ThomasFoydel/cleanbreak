import React from 'react'

const RangeInput = ({
  id,
  name,
  step = 1,
  min = 0,
  max = 100,
  value,
  onChange
}) => {
  return (
    <div className='input-container'>
      <input
        className='range-input'
        type='range'
        id={id}
        name={name}
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default RangeInput
