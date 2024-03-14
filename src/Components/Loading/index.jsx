import React from 'react'
import './styles.css'

function Loading() {
  return (
    <div>
        <svg className='svg-loading' viewBox="25 25 50 50">
            <circle className='circle-loading' r="20" cy="50" cx="50"></circle>
        </svg>
    </div>
  )
}

export default Loading