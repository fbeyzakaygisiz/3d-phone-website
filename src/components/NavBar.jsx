import { navLists } from '@/constants'
import { appleImg, bagImg, searchImg } from '@/utils'
import React from 'react'

const NavBar = () => {
  return (
    <header
      className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'
    >

        <nav
          className='flex w-full screen-max-width justify-between'
        >
                <img 
        src={appleImg} 
        width={14}
        height={18}
        />

        <div className='flex flex-1 gap-5 justify-center max-sm:hidden'>
          {
              navLists.map(
                (nav) => <div

                  className=' px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'
                  key={nav}
                >
                  {nav}
                </div>
              )
            }
        </div>


        </nav>
        <div className='flex justify-end items-center gap-7 '>
          <img 
            src={searchImg}
            alt='search'
            width={18}
            height={18}
          />
          <img 
            src={bagImg}
            alt='bag'
            width={18}
            height={18}
          />
        </div>


    </header>
  )
}

export default NavBar