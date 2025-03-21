import { rightImg, watchImg } from '@/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {

  useGSAP( () => {
    gsap.to('#title' , {opacity:1, y:0});
    gsap.to('.link' , {
      opacity:1, 
      y:0 , 
      duration:1,
      stagger:{
        amount:0.25
    }})

  }, [])
  return (
    <section
      id='highlights'
      className='w-screen  h-full common-padding bg-zinc'
    >

      <div
        className='screen-max-width'
      >

        <div className='mb-12 w-full  justify-between items-end md:flex'>
            <h1 
              id='title'
              className='section-heading'>
              Get the highlights.
            </h1>



            <div className="flex flex-wrap items-end gap-5">
              <p className='link'>Watch the film  <img  className='ml-2' alt='watch' src={watchImg}/></p>
              <p className='link'>Watch the event  <img className='ml-2' alt='right'  src={rightImg}/></p>

            </div>
        </div>

        <VideoCarousel/>

      </div>

    </section>
  )
}

export default Highlights