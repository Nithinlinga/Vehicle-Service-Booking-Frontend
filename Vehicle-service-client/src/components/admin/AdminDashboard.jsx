import React from 'react'

const AdminDashboard = () => {
  return (
    <>
      <div className='pt-5 pl-20  w-screen flex space-x-4'>
        <button className=' rounded-sm dark:bg-cyan-500 p-2'>Manage Service Centres</button>
        <button className=' rounded-sm dark:bg-cyan-500 p-2'>Manage Appointments</button>
      </div>
    </>
  )
}

export default AdminDashboard