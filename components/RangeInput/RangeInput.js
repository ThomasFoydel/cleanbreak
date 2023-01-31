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
  const handleChange = ({ target }) => {
    const { id, value, name } = target
    onChange({ id, value, name })
  }

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
        onChange={handleChange}
      />
    </div>
  )
}

export default RangeInput
