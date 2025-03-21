import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import {useGSAP} from "@gsap/react"
import { heroVideo, smallHeroVideo } from '@/utils'
const Hero = () => {

  useGSAP( () => {
    gsap.to( "#hero" , {
      opacity:1,
      duration:0.5,
      delay:1.5,
    });

    gsap.to( "#cta" , {
      opacity:1,
      duration:0.5,
      delay:4.5,
    });
  } , [])


  const [videoSrc , setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  const handleVideoSrcSet = () => {
    window.innerWidth < 760 ? setVideoSrc(smallHeroVideo) : setVideoSrc(heroVideo);
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);
  
    // Correct cleanup function
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);
  return (
    <section
      className='w-full nav-height bg-black relative'
    >
      <div
        className='h-5/6 w-full flex-center flex-col sm:pt-8'
      >

          <p id='hero' className='hero-title'>
            Iphone 15 Pro
          </p>

          <div
            className='md:w-10/!2 w-9/12'
          >
            <video
              autoPlay
              muted
              playsInline={true}
              key={videoSrc}
>
              <source src={videoSrc}/>
            </video>

          </div>
          <div 
            id='cta'
            className='w-full flex flex-col items-center opacity-0 gap-1'
          >

            <a 
            href='#highlights'
            className='btn'
            >
              Buy
            </a>
            <p className='text-xl font-normal'>From $199/month or $999</p>
          </div>
      </div>
    </section>
  )
}

export default Hero