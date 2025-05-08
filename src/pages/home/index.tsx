import React from 'react'
import logo from '/logo.png'

const Home = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-[100vh] w-full'>
        <img src={logo} alt='logo' className='' />
        <button onClick={() => window.location.href = '/ar'} className='bg-red-900 text-white px-4 py-2 rounded-lg mt-4'>
          Start
        </button>
      </div>
    </>
  )
}

export default Home