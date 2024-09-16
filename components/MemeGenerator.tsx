import {
  Canvas as FabricCanvas,
  FabricImage,
  FabricObject,
  FabricText,
  Group,
  InteractiveFabricObject,
  Rect,
} from 'fabric'
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
  // React Ref
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricRef = useRef<FabricCanvas | null>(null)
  const watermarkRef = useRef<FabricObject | null>(null)
  // React State
  const [isActiveObject, setIsActiveObject] = useState<boolean>(false)
  const [bgDimensions, setBgDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  // Update dimension
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
      // Add watermark if it doesn't already exist
      if (!watermarkRef.current) {
        const text = new FabricText(' @solyeschad ', {
          fontFamily: 'Arial',
          fontSize: 18,
          fill: '#ffffff',
          originX: 'center',
          originY: 'center',
        })

        const rect = new Rect({
          width: text.width + 6,
          height: text.height + 6,
          fill: '#448ea7',
          rx: 4,
          ry: 4,
          originX: 'center',
          originY: 'center',
          stroke: 'rgba(255,255,255,0.2)',
          strokeWidth: 2,
        })

        const group = new Group([rect, text], {
          top: 2,
          left: width - rect.width - 3,
          selectable: false,
        })

        fabric.add(group)
        watermarkRef.current = group // Store reference to the watermark
      } else {
        // Update watermark position if it already exists
        const watermark = watermarkRef.current
        watermark.set({
          top: 2,
          left: width - watermark.width - 3,
        })
      }
    }
    // Update canvas and image dimensions
    fabric.setDimensions({ width, height })
    const displayWrapper = width === 0 && height === 0 ? 'none' : 'block'
    fabric.wrapperEl.style.display = displayWrapper
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
            fabric.backgroundImage = img
            const dimensions = {
              width: img.width,
              height: img.height,
            }
            setBgDimensions(dimensions)
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

  const addSticker = (sticker: string) => {
    const fabric = fabricRef.current
    if (fabric && fabric.backgroundImage) {
      FabricImage.fromURL(sticker).then((img) => {
        fabric.add(img)
      })
    }
  }

  const handleStickerAction = (action: 'flip' | 'delete') => {
    const fabric = fabricRef.current
    if (!fabric) return

    fabric.getActiveObjects().forEach((obj) => {
      if (action === 'flip') obj.set('flipX', !obj.flipX)
      if (action === 'delete') fabric.remove(obj)
    })

    fabric.discardActiveObject()
    fabric.renderAll()
  }

  // Download image
  const downloadImage = useCallback(() => {
    const fabric = fabricRef.current
    if (fabric) {
      fabric.discardActiveObject()
      fabric.renderAll()
      setTimeout(() => {
        const scale = bgDimensions.width / fabric.width
        const dataURL = fabric.toDataURL({
          format: 'png',
          multiplier: scale,
        })
        const randomName = `meme_${Date.now()}.png`
        const link = document.createElement('a')
        link.href = dataURL
        link.download = randomName
        link.click()
      }, 1000)
    }
  }, [bgDimensions])

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
    InteractiveFabricObject.ownDefaults = {
      ...InteractiveFabricObject.ownDefaults,
      borderColor: 'white',
      cornerColor: 'white',
      cornerStyle: 'circle',
      cornerSize: 8,
      transparentCorners: false,
    }
    fabricRef.current = new FabricCanvas(canvasRef.current!)
    window.addEventListener('resize', updateDimensions)
    fabricRef.current.on('selection:created', () => setIsActiveObject(true))
    fabricRef.current.on('selection:updated', () => setIsActiveObject(true))
    fabricRef.current.on('selection:cleared', () => setIsActiveObject(false))
    fabricRef.current.on('object:moving', () => {
      if (fabricRef.current && watermarkRef.current) {
        fabricRef.current.bringObjectToFront(watermarkRef.current)
      }
    })
    updateDimensions()
    return () => {
      window.removeEventListener('resize', updateDimensions)
      if (fabricRef.current) {
        fabricRef.current.dispose()
      }
    }
  }, [])

  return (
    <div className={`p-4 md:p-8 space-y-8 md:space-y-4 ${className}`}>
      {/* Tools Column */}
      <div className="space-y-4">
        {/* Upload background */}
        <div
          {...getRootProps()}
          className="upload-area md:mb-8 px-4 py-8 border-2 border-dashed border-gray-500 rounded text-center text-xl"
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
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 40 },
            }}
          >
            {stickers.map((sticker) => (
              <SwiperSlide key={sticker}>
                <div
                  className="flex justify-center items-center w-full h-full border-2 border-gray-500 rounded-md p-2 hover:border-black hover:bg-amber-100 cursor-pointer"
                  onClick={() => addSticker(sticker)}
                >
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
      <div className="relative">
        {isActiveObject && (
          <div className="absolute -top-[30px] left-1/2 transform -translate-x-1/2 m-2 flex items-center justify-center gap-2 z-10">
            <button
              className="px-2 py-1 border-2 border-gray-500 outline-none bg-white rounded-md"
              onClick={() => handleStickerAction('flip')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
            <button
              className="px-2 py-1 border-2 border-gray-500 outline-none bg-red-500 text-white rounded-md"
              onClick={() => handleStickerAction('delete')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="flex items-center justify-center" ref={containerRef}>
          <canvas className="border-2 border-gray-500 rounded-md" ref={canvasRef} />
        </div>
      </div>
    </div>
  )
}

export default MemeGenerator
