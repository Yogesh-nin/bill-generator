import React from 'react'
import Sidebar from './Homepage/Sidebar'
import Navbar from './Homepage/Navbar'

const Layout: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
      <div className='flex'>
          <Sidebar />
          <div className='grow'>
              <Navbar />
              <div className=''>
          {children}
                  
              </div>
          </div>
    </div>
  )
}

export default Layout