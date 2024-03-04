import React from 'react'

function Layout({ children }) {
  return (
    <div className='flex flex-col items-center mt-20 z-0'>
        {children}
    </div>
  )
}

export default Layout;