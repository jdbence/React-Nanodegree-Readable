import React from 'react'
import styled from 'styled-components'
import radioIcon from 'static/icon/radio.svg'
import radioCheckedIcon from 'static/icon/radio-checked.svg'

const RadioHoc = ({ label, checked, children, onChange }) => {
  const Radio = styled.div`
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    & input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      padding: 0;
    }
    & img {
      width: 20px;
      padding: 10px;
    }
  `
  const icon = checked ? radioCheckedIcon : radioIcon
  const value = label || children
  return (
    <Radio>
      <img src={icon} alt="radio" />
      <label>
        <input type="radio" value={value} checked={checked} onChange={() => onChange(value)} />
        {value}
      </label>
    </Radio>
  )
}
export default RadioHoc
