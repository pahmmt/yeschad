import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import classNames from 'classnames'
import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const MemeGenerator = ({ className }) => {
  const stickers = [
    '/stickers/1.png',
    '/stickers/2.png',
    '/stickers/3.png',
    '/stickers/4.png',
    '/stickers/5.png',
    '/stickers/6.png',
    '/stickers/7.png',
    '/stickers/8.png',
    '/stickers/9.png',
    '/stickers/10.png',
    '/stickers/11.png',
    '/stickers/12.png',
    '/stickers/13.png',
  ]
  const stageRef = useRef(null)
  const divRef = useRef(null)

  const [backgroundImage, setBackgroundImage] = useState(null)

  // Download image
  const downloadImage = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL()
      const randomName = `meme_${Math.random().toString(36).substr(2, 9)}.png`
      const link = document.createElement('a')
      link.href = dataURL
      link.download = randomName
      link.click()
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result
      setBackgroundImage(e.target.result)
    }

    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  return (
    <div className={classNames('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {/* Tools Column */}
      <div className="px-4 md:px-8 py-8 space-y-4">
        {/* Upload background */}
        <div {...getRootProps()} className="upload-area md:mb-8 px-4 py-8 border-2 border-dashed border-gray-400 rounded text-center text-xl">
          <input {...getInputProps()} />
          <p>Drag/drop your background image here or click to select an image</p>
        </div>

        {/* Carousel cho sticker */}
        <div className="mb-4 md:mb-8 px-4 relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            spaceBetween={30}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {stickers.map((sticker) => (
              <SwiperSlide key={sticker}>
                <div className="flex justify-center items-center w-full h-full border-2 rounded-md p-2">
                  <img src={sticker} alt="Sticker" className="cursor-pointer h-20 pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-prev absolute left-0 inset-y-0 z-10 cursor-pointer outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
          </button>
          <button className="swiper-next absolute right-0 inset-y-0 z-10 cursor-pointer outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Download Button */}
        <div className="mt-4 md:mt-8 space-y-4">
          <button
            className="w-full bg-amber-100 hover:bg-white px-4 py-2 rounded-md font-semibold border-2 border-black [box-shadow:_2px_2px_var(--tw-shadow-color)] shadow-black"
            onClick={downloadImage}
          >
            Download
          </button>
          <button className="w-full bg-amber-100 hover:bg-white px-4 py-2 rounded-md font-semibold border-2 border-black [box-shadow:_2px_2px_var(--tw-shadow-color)] shadow-black">Reset</button>
        </div>
      </div>
      {/* Canvas Column */}
      <div className="flex items-center justify-center px-4 md:px-8 py-8" ref={divRef}>
        {backgroundImage && <img src={backgroundImage} alt="Background" className="w-full h-auto rounded-md" />}
      </div>
    </div>
  )
}

export default MemeGenerator
