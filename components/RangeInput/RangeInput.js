import React from 'react'

const RangeInput = ({ id, step, name, min, max, value, onChange }) => {
  return (
    <div className='input-container'>
      <input
        className='range-input'
        type='range'
        id={id}
        step={step || 1}
        name={name}
        min={min || 0}
        max={max || 100}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default RangeInput
