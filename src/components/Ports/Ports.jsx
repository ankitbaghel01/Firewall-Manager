import React from 'react'
import SideIcons from '../SideIcons/SideIcons'
import DotsTopLeft from '../Dots/Dots'
import PortTable from './PortTable'

const Ports = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-800 min-h-screen overflow-x-hidden">
      
    {/* Sidebar for Icons */}
    <div className="w-full md:w-16 bg-gray-900 md:fixed md:h-screen">
      <SideIcons />
    </div>

    {/* Main content */}
    <div className="flex-1 p-4 md:ml-16">
      <DotsTopLeft/>
<div className='p-5'>

     <PortTable/>
</div>

    </div>
    
  </div>
  )
}

export default Ports




