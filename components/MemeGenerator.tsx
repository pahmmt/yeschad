import { Canvas as FabricCanvas, FabricImage } from 'fabric'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useCallback, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

interface MemeProps {
  className: string
}

const MemeGenerator = ({ className }: MemeProps) => {
  const stickers: Array<string> = [
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

  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricRef = useRef<FabricCanvas | null>(null) // Ref to store the Fabric canvas instance

  const updateDimensions = () => {
    const container = containerRef.current
    const fabric = fabricRef.current

    if (container && fabric) {
      const {
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        borderLeftWidth,
        borderRightWidth,
        borderTopWidth,
        borderBottomWidth,
      } = getComputedStyle(container)
      const paddingX = parseFloat(paddingLeft) + parseFloat(paddingRight)
      const paddingY = parseFloat(paddingTop) + parseFloat(paddingBottom)
      const borderX = parseFloat(borderLeftWidth) + parseFloat(borderRightWidth)
      const borderY = parseFloat(borderTopWidth) + parseFloat(borderBottomWidth)
      const containerWidth = container.offsetWidth - paddingX - borderX
      const containerHeight = container.offsetHeight - paddingY - borderY
      const bgImage = fabric.backgroundImage
      if (bgImage) {
        // Scale the background image to fit the container width and maintain aspect ratio
        const width = Math.min(containerWidth, bgImage.width)
        const height = (bgImage.height * width) / bgImage.width
        // Update canvas and image dimensions
        fabric.setDimensions({ width, height })
        bgImage.scaleToWidth(width)
        bgImage.scaleToHeight(height)
      } else {
        fabric.setDimensions({ width: containerWidth, height: containerHeight })
      }
      fabric.calcOffset()
      fabric.renderAll()
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = (event: any) => {
        const data = event.target.result
        const fabric = fabricRef.current
        if (fabric) {
          FabricImage.fromURL(data).then((img) => {
            const aspectRatio = img.width / img.height
            const width = Math.min(fabric.width, img.width)
            const height = width / aspectRatio
            img.set({
              width: img.width,
              height: img.height,
              scaleX: width / img.width,
              scaleY: height / img.height,
            })
            fabric.backgroundImage = img
            updateDimensions()
          })
        }
      }
      reader.readAsDataURL(file)
    }, []),
    accept: {
      'image/*': [],
    },
  })

  // Download image
  const downloadImage = useCallback(() => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL()
      const randomName = `meme_${Math.random().toString(36).substr(2, 9)}.png`
      const link = document.createElement('a')
      link.href = dataURL
      link.download = randomName
      link.click()
    }
  }, [])

  // Reset canvas
  const resetCanvas = useCallback(() => {
    const fabric = fabricRef.current
    if (fabric) {
      fabric.clear()
      fabric.wrapperEl.style.width = '0'
      fabric.wrapperEl.style.height = '0'
      updateDimensions()
    }
  }, [])

  useEffect(() => {
    fabricRef.current = new FabricCanvas(canvasRef.current!)
    // Handle resize event
    window.addEventListener('resize', updateDimensions)
    updateDimensions()
    return () => {
      window.removeEventListener('resize', updateDimensions)
      if (fabricRef.current) {
        fabricRef.current.dispose()
      }
    }
  }, [])

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 ${className}`}>
      {/* Tools Column */}
      <div className="space-y-4">
        {/* Upload background */}
        <div
          {...getRootProps()}
          className="upload-area md:mb-8 px-4 py-8 border-2 border-dashed border-gray-400 rounded text-center text-xl"
        >
          <input {...getInputProps()} />
          <p>Drag/drop your background image here or click to select an image</p>
        </div>

        {/* Sticker Carousel */}
        <div className="mb-4 md:mb-8 px-4 relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              480: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 40 },
            }}
          >
            {stickers.map((sticker) => (
              <SwiperSlide key={sticker}>
                <div className="flex justify-center items-center w-full h-full border-2 border-gray-400 rounded-md p-2 hover:border-black hover:bg-amber-100 cursor-pointer">
                  <img src={sticker} alt="Sticker" className="h-20 pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-prev absolute left-0 inset-y-0 z-10 cursor-pointer outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
          </button>
          <button className="swiper-next absolute right-0 inset-y-0 z-10 cursor-pointer outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 md:mt-8 space-y-4">
          <button
            className="w-full bg-amber-100 hover:bg-white px-4 py-2 rounded-md font-semibold border-2 border-black shadow-md"
            onClick={downloadImage}
          >
            Download
          </button>
          <button
            className="w-full bg-amber-100 hover:bg-white px-4 py-2 rounded-md font-semibold border-2 border-black shadow-md"
            onClick={resetCanvas}
          >
            Reset
          </button>
        </div>
      </div>
      {/* Canvas Column */}
      <div className="flex items-center justify-center" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

export default MemeGenerator
