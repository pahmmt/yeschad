import { useState, useMemo } from 'react'
import Image from 'next/image'

export default function Chad() {
  const images = useMemo(
    () => [
      '/Chad/0.png',
      '/Chad/1.png',
      '/Chad/2.png',
      '/Chad/3.png',
      '/Chad/4.png',
      '/Chad/5.png',
      '/Chad/6.png',
      '/Chad/7.png',
      '/Chad/8.png',
      '/Chad/9.png',
      '/Chad/10.png',
      '/Chad/11.png',
      '/Chad/12.png',
      '/Chad/13.png',
    ],
    []
  )
  const [index, setIndex] = useState(0)
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div>
      {images.map((image, i) => (
        <Image
          key={i}
          src={image}
          width={360}
          height={360}
          alt={`Chad ${index + 1}`}
          className={`w-72 h-auto mx-auto ${i == index ? 'block' : 'hidden'}`}
        />
      ))}
      <div className="flex justify-center space-x-6">
        <button onClick={handlePrev} className="bg-amber-100 hover:bg-white p-1 rounded-md outline outline-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={handleNext} className="bg-amber-100 hover:bg-white p-1 rounded-md outline outline-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
