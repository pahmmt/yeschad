import { Canvas as FabricCanvas, FabricImage, FabricText, Group, Rect } from 'fabric'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useCallback, useEffect, useRef, useState } from 'react'
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

    if (!container || !fabric) return

    const { paddingLeft, paddingRight, borderLeftWidth, borderRightWidth } = getComputedStyle(container)

    // Parse and calculate total padding and border dimensions
    const parseAndSum = (...values: string[]) => values.reduce((sum, val) => sum + parseFloat(val), 0)
    const paddingX = parseAndSum(paddingLeft, paddingRight)
    const borderX = parseAndSum(borderLeftWidth, borderRightWidth)
    const containerWidth = container.offsetWidth - paddingX - borderX
    const bgImage = fabric.backgroundImage
    let width = 0
    let height = 0
    if (bgImage) {
      const ratio = bgImage.width / bgImage.height
      width = Math.min(containerWidth, bgImage.width)
      height = width / ratio
      bgImage.scaleToWidth(width)
      bgImage.scaleToHeight(height)

      // Add watermark
      const text = new FabricText(' @solyeschad ', {
        fontFamily: 'Tahoma',
        fontSize: width / 25,
        fill: 'white',
        originX: 'center',
        originY: 'center',
      })
      const rect = new Rect({
        width: text.width + 5,
        height: text.height + 5,
        fill: '#448ea7',
        rx: 4,
        ry: 4,
        originX: 'center',
        originY: 'center',
      })
      const group = new Group([rect, text], {
        top: 2,
        left: width - rect.width - 3,
        selectable: false,
      })
      fabric.add(group)
    }
    // Update canvas and image dimensions
    fabric.setDimensions({ width, height })
    fabric.calcOffset()
    fabric.renderAll()
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      resetCanvas()
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = (event: any) => {
        const data = event.target.result
        const fabric = fabricRef.current
        if (data && fabric) {
          FabricImage.fromURL(data).then((img) => {
            console.log(img)
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
            className="flex items-center justify-center w-full bg-amber-100 hover:bg-white px-4 py-2 rounded-md font-semibold border-2 border-black shadow-md uppercase"
            onClick={downloadImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download
          </button>
          <button
            className="flex items-center justify-center w-full bg-amber-100 hover:bg-white px-4 py-2 rounded-md font-semibold border-2 border-black shadow-md uppercase"
            onClick={resetCanvas}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
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
