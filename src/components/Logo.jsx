import React from 'react'
import images from '../assets/images.png'
function Logo({width='10px'}) {
  return (
    <div>
      <img src={images} alt="" width={width} />
    </div>
  )
}

export default Logo
