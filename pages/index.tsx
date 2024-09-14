import dynamic from 'next/dynamic'
import { Oswald } from 'next/font/google'
import Head from 'next/head'
import Image from 'next/image'

import React, { useState } from 'react'

import config from '@/config/config'

const font = Oswald({ subsets: ['latin'] })
const MemeGenerator = dynamic(() => import('@/components/MemeGenerator'), {
  ssr: false,
})

export default function Home() {
  const {
    title,
    description,
    url,
    ogImage,
    googleSiteVerification,
    tokenAddress,
    tokenSymbol,
    tokenSupply,
    swapUrl,
    links,
  } = config

  const [buttonText, setButtonText] = useState<string>('Copy')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(tokenAddress)
      .then(() => {
        setButtonText('Copied!')
        setIsDisabled(true)
        setTimeout(() => {
          setButtonText('Copy')
          setIsDisabled(false)
        }, 3000)
      })
      .catch((error) => {
        console.error('Error copying text:', error)
      })
  }

  return (
    <>
      <Head>
        <title>{title || 'Default Title'}</title>
        {description && <meta name="description" content={description} />}
        {url && <link rel="canonical" href={url} />}
        {/* Open Graph */}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {url && <meta property="og:url" content={url} />}
        {/* Google Site Verification */}
        {googleSiteVerification && <meta name="google-site-verification" content={googleSiteVerification} />}
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#67D9FD" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#67D9FD" />
      </Head>
      <div className={`${font.className} bg-[#67D9FD] text-lg`}>
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 px-4 flex items-center justify-between">
          <Image
            src="/chad.png"
            width={256}
            height={256}
            className="w-14 md:w-16 h-auto block py-4"
            alt="Yes Chad Logo"
          />
          <div className="flex justify-center gap-4 font-semibold flex-wrap">
            <a
              href="#memes-maker"
              className="flex items-center bg-amber-100 hover:bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-md border-2 border-black [box-shadow:_2px_2px_var(--tw-shadow-color)] shadow-black uppercase"
            >
              Make Memes
            </a>
            <a
              href={swapUrl}
              className="flex items-center bg-amber-100 hover:bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-md border-2 border-black [box-shadow:_2px_2px_var(--tw-shadow-color)] shadow-black uppercase"
              target="_blank"
            >
              Buy $chad
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-white text-4xl md:text-7xl font-black mb-6 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-black">
                Welcome, Chad
              </h1>
              <div className="text-xl leading-8 font-semibold mb-6">
                <strong>Yes Chad</strong> has become an emblem of internet culture&#39;s ability to take something
                potentially divisive, strip it of its original context, and turn it into a universal symbol of internet
                coolness and humor. It&#39;s like watching humanity&#39;s collective psyche evolve in real-time, one
                &ldquo;yes&rdquo; at a time.
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                {links.map(
                  ({ url, title, icon }) =>
                    url && (
                      <a
                        key={title}
                        href={url}
                        title={title}
                        className="flex items-center bg-amber-100 hover:bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-md border-2 border-black [box-shadow:_2px_2px_var(--tw-shadow-color)] shadow-black"
                      >
                        {icon}
                      </a>
                    )
                )}
              </div>
            </div>
            <Image
              src="/chad.gif"
              width={445}
              height={480}
              alt="Yes. Chad"
              className="w-80 h-auto mx-auto block"
              unoptimized
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-12 px-4">
          <h2 className="text-white text-4xl md:text-7xl font-black mb-6 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-black text-center">
            Chadnomics
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-center">
            <div className="bg-white px-4 py-8 rounded-2xl border-2 border-black">
              <h3 className="text-3xl font-semibold mb-4">Contract Address</h3>
              <div className="flex items-center">
                <input
                  type="text"
                  value={tokenAddress}
                  className="h-10 flex items-center w-full max-w-full border-2 border-black px-2 py-1 rounded-md text-center focus:outline-none"
                  readOnly
                />
                <button
                  type="button"
                  className="h-10 flex items-center ml-2 px-2 py-1 rounded-md bg-white  border-2 border-black text-center"
                  onClick={handleCopy}
                  disabled={isDisabled}
                >
                  {buttonText}
                </button>
              </div>
            </div>
            <div className="bg-white px-4 py-8 rounded-2xl border-2 border-black">
              <h3 className="text-3xl font-semibold mb-4">Symbol</h3>
              <div className="font-semibold text-2xl">{tokenSymbol}</div>
            </div>
            <div className="bg-white px-4 py-8 rounded-xl border-2 border-black">
              <h3 className="text-3xl font-semibold mb-4">Network</h3>
              <div>
                <Image src="/solana.png" width={100} height={100} className="size-12 mx-auto" alt="" />
              </div>
            </div>
            <div className="bg-white px-4 py-8 rounded-2xl border-2 border-black">
              <h3 className="text-3xl font-semibold mb-4">Supply</h3>
              <div className="font-semibold text-2xl">{tokenSupply}</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-12 px-4">
          <div className="grid md:grid-cols-2 gap-4 bg-white rounded-2xl border-2 border-black">
            <div className="px-4 md:px-8 py-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-black mb-4 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-gray-300">
                  ORIGIN & EVOLUTION OF THE MEME
                </h1>
                <div className="text-xl leading-8 space-y-8">
                  <p>
                    The &ldquo;<strong>Yes Chad</strong>&rdquo; or &ldquo;
                    <strong>Nordic Gamer</strong>&rdquo; meme sprouted from the fertile grounds of 4chan&#39;s /pol/
                    board, where it was initially part of a meme comparing Nordic and Mediterranean archetypes. This
                    character, with his stoic, &ldquo;yes&rdquo;-affirming demeanor, became a symbol of unbothered
                    confidence. Born in August 2019, thanks to a tweet by @yachs_91, it quickly became an internet
                    sensation, embodying hyper-masculine indifference or, in some cases, a satirical take on racial and
                    cultural stereotypes.
                  </p>
                  <p>
                    Over time, <strong>Yes Chad</strong> transcended its controversial roots. It&#39;s now often used to
                    represent a figure of calm in the storm of internet debates, a meme that says, &ldquo;I&#39;m above
                    this fray.&rdquo; It&#39;s been adopted across various platforms for its simplicity and the
                    humorous, often ironic, acknowledgment of life&#39;s absurdities.
                  </p>
                  <p>
                    <a
                      href={swapUrl}
                      className="bg-amber-100 hover:bg-white px-4 py-2 rounded-md font-semibold border-2 border-black [box-shadow:_2px_2px_var(--tw-shadow-color)] shadow-black uppercase"
                      target="_blank"
                    >
                      Buy $chad on Jupiter Swap
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-8">
              <Image
                src="/cover-1.jpg"
                width={605}
                height={700}
                className="w-auto h-auto mx-auto"
                alt="Yes Chad Meme"
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-12 px-4" id="memes-maker">
          <h2 className="text-white text-4xl md:text-7xl font-black mb-6 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-black text-center">
            Meme Generator
          </h2>
          <MemeGenerator className="rounded-2xl border-2 border-black bg-white" />
        </div>
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 px-4">
          <h2 className="text-white text-4xl md:text-7xl font-black mb-6 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-black text-center">
            Chart
          </h2>
          <iframe
            width="100%"
            height="600"
            src="https://birdeye.so/tv-widget/7rdeLkyfmxujFthUNYZM7jWGEKZnT9mkeSGG1c9hpump?chain=solana&viewMode=pair&chartInterval=240&chartType=CANDLE&chartTimezone=Etc%2FUTC&chartLeftToolbar=show&theme=light"
            loading="lazy"
            allowFullScreen
            className="rounded-2xl border-2 border-black"
          ></iframe>
        </div>
        <div>
          <div className="max-w-7xl mx-auto px-4 py-4 text-center font-semibold">Copyright © 2024 Yes Chad</div>
        </div>
      </div>
    </>
  )
}
