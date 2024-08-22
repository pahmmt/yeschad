import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Roboto_Condensed } from 'next/font/google'

const font = Roboto_Condensed({ subsets: ['latin'] })

export default function Home() {
  const [buttonText, setButtonText] = useState('Copy')
  const [isDisabled, setIsDisabled] = useState(false)
  const contract_address = '7rdeLkyfmxujFthUNYZM7jWGEKZnT9mkeSGG1c9hpump'
  const handleCopy = () => {
    navigator.clipboard
      .writeText(contract_address)
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
        <title>$chad - Yes Chad Token On Solana | solyeschad</title>
        <meta
          name="description"
          content="$chad - Yes Chad embodies internet culture's power to transform divisive elements into universal symbols of coolness and humor, evolving humanity's collective psyche one 'yes' at a time"
        />
      </Head>
      <div className={`${font.className} bg-[#67D9FD] text-lg`}>
        <div className="bg-[#2B8CAD]">
          <div className="max-w-7xl mx-auto mb-16 md:mb-24 px-4 flex items-center justify-between">
            <div>
              <Image
                src="/chad.gif"
                width={200}
                height={200}
                className="w-20 sm:w-28 md:w-32 h-auto block mx-auto"
                alt=""
                unoptimized
              />
            </div>
            <div className="flex justify-center gap-4 font-semibold flex-wrap mb-4">
              <a
                href="https://t.me/solyeschad"
                className="flex items-center bg-amber-100 hover:bg-cyan-200 px-2 py-1 sm:px-4 sm:py-2 rounded-md outline outline-2 shadow-solid-primary shadow-black"
                target="_blank"
                title="Telegram"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://x.com/solyeschad"
                className="flex items-center bg-amber-100 hover:bg-cyan-200 px-2 py-1 sm:px-4 sm:py-2 rounded-md outline outline-2 shadow-solid-primary shadow-black"
                target="_blank"
                title="X"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                href="https://jup.ag/swap/SOL-7rdeLkyfmxujFthUNYZM7jWGEKZnT9mkeSGG1c9hpump"
                className="flex items-center bg-amber-100 hover:bg-cyan-200 px-2 py-1 sm:px-4 sm:py-2 rounded-md outline outline-2 shadow-solid-primary shadow-black"
                target="_blank"
              >
                BUY $CHAD
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 px-4">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-white text-4xl md:text-7xl font-black mb-6 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-black">
                Welcome, Chad
              </h1>
              <div className="text-xl leading-8 font-semibold mb-6">
                <strong>Yes Chad</strong> has become an emblem of internet
                culture&#39;s ability to take something potentially divisive,
                strip it of its original context, and turn it into a universal
                symbol of internet coolness and humor. It&#39;s like watching
                humanity&#39;s collective psyche evolve in real-time, one
                &ldquo;yes&rdquo; at a time.
              </div>
              <div className="flex items-center space-x-6 justify-center md:justify-start">
                <a
                  href="https://birdeye.so/token/7rdeLkyfmxujFthUNYZM7jWGEKZnT9mkeSGG1c9hpump?chain=solana"
                  className="flex items-center bg-white hover:bg-cyan-200 px-4 py-2 rounded-md outline outline-2 shadow-solid-primary shadow-black"
                  target="_blank"
                  title="Birdeye"
                >
                  <svg
                    viewBox="0 0 96 96"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-7"
                  >
                    <path
                      d="M70.468 32.42c-4.737-2.858-6.792-10.035-4.704-14.917C67.409 13.657 73.334 0 73.334 0H52.782L7 91.666s12.838-8.655 31.786-.353c5.926 2.6 12.164 5.058 19.19 4.64C74.514 94.966 87.738 82.2 89.24 65.684c1.333-14.572-6.929-26.126-18.763-33.271l-.009.008Zm5.444 32.197c-.931 9.41-8.543 17.02-17.953 17.944-12.717 1.26-23.291-9.322-22.047-22.047.931-9.41 8.543-17.022 17.953-17.953 12.726-1.252 23.308 9.33 22.047 22.056Z"
                      fill="#000"
                    />
                    <path
                      d="M65.418 63.534c-.442 4.472-4.063 8.093-8.535 8.526-6.046.602-11.072-4.432-10.478-10.477.442-4.472 4.063-8.094 8.535-8.535a9.553 9.553 0 0 1 10.478 10.486Z"
                      fill="#000"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex items-center bg-white hover:bg-cyan-200 px-4 py-2 rounded-md outline outline-2 shadow-solid-primary shadow-black"
                  target="_blank"
                  title="Coingecko"
                >
                  <svg
                    viewBox="0 0 96 96"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-7"
                  >
                    <g clip-path="url(#a)" fill="#000">
                      <path d="M48.121 0C21.801.12.561 21.706.677 48.216c.12 26.51 21.555 47.9 47.872 47.783 26.321-.12 47.56-21.705 47.444-48.211C95.873 21.275 74.442-.117 48.121 0Zm-6.035 45.647c-4.706 0-8.522-3.84-8.522-8.58s3.816-8.58 8.522-8.58 8.52 3.843 8.52 8.58c0 4.736-3.817 8.58-8.52 8.58Zm6.796 9.276.043-.054.046-.053c2.431 1.578 5.208 2.137 7.981 2.217 2.777.074 5.606-.137 8.39-.702a45.678 45.678 0 0 0 8.153-2.54c1.481-.615 2.956-1.287 4.361-2.076l.027-.017a52.654 52.654 0 0 0 2.564-1.663c.182-.13.358-.267.531-.408l.02.024.073.087c-2.142 1.963-4.693 3.422-7.29 4.71a46.42 46.42 0 0 1-8.187 3c-2.816.733-5.756 1.288-8.732 1.014-2.929-.261-6.014-1.295-7.987-3.536l.007-.004Zm21.867-9.276a1.858 1.858 0 0 1 1.836-1.87 1.856 1.856 0 0 1 1.857 1.85 1.856 1.856 0 0 1-1.837 1.87 1.86 1.86 0 0 1-1.856-1.85ZM56.152 91.684c-1.84-12.988 9.422-25.71 15.772-32.219 1.442-1.475 3.67-3.509 5.743-5.67 8.243-7.764 9.884-17.04-6.988-21.675-3.198-.934-6.513-2.255-9.87-3.59a7.013 7.013 0 0 0-.366-.883c-.386-.669-1.06-1.438-2.08-2.311-2.191-1.917-6.313-1.867-9.87-1.017-3.932-.933-7.812-1.265-11.541-.365-16.318 4.53-18.941 12.544-19.576 22.201-.863 10.437-1.368 18.214-5.29 27.098-4.896-7.111-7.782-15.738-7.822-25.047-.11-24.513 19.532-44.472 43.87-44.583C72.472 3.513 92.29 23.295 92.4 47.808c.1 21.893-15.564 40.16-36.252 43.883l.004-.007Z" />
                      <path d="M48.078 37.144c0 3.335-2.684 6.034-5.992 6.034s-5.995-2.7-5.995-6.034c0-3.335 2.684-6.035 5.995-6.035s5.992 2.7 5.992 6.035Z" />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0h96v96H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  href="https://dexscreener.com/solana/fri5dhtacw7xkcu91pqtvwozgdmdvp8xinbkzcdrrcd9"
                  className="flex items-center bg-white hover:bg-cyan-200 px-4 py-2 rounded-md outline outline-2 shadow-solid-primary shadow-black"
                  target="_blank"
                  title="Dexscreener"
                >
                  <svg
                    fill="#000"
                    fill-rule="evenodd"
                    viewBox="0 0 252 300"
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-7"
                  >
                    <path d="M151.818 106.866c9.177-4.576 20.854-11.312 32.545-20.541 2.465 5.119 2.735 9.586 1.465 13.193-.9 2.542-2.596 4.753-4.826 6.512-2.415 1.901-5.431 3.285-8.765 4.033-6.326 1.425-13.712.593-20.419-3.197m1.591 46.886 12.148 7.017c-24.804 13.902-31.547 39.716-39.557 64.859-8.009-25.143-14.753-50.957-39.556-64.859l12.148-7.017a5.95 5.95 0 0 0 3.84-5.845c-1.113-23.547 5.245-33.96 13.821-40.498 3.076-2.342 6.434-3.518 9.747-3.518s6.671 1.176 9.748 3.518c8.576 6.538 14.934 16.951 13.821 40.498a5.95 5.95 0 0 0 3.84 5.845zM126 0c14.042.377 28.119 3.103 40.336 8.406 8.46 3.677 16.354 8.534 23.502 14.342 3.228 2.622 5.886 5.155 8.814 8.071 7.897.273 19.438-8.5 24.796-16.709-9.221 30.23-51.299 65.929-80.43 79.589-.012-.005-.02-.012-.029-.018-5.228-3.992-11.108-5.988-16.989-5.988s-11.76 1.996-16.988 5.988c-.009.005-.017.014-.029.018-29.132-13.66-71.209-49.359-80.43-79.589 5.357 8.209 16.898 16.982 24.795 16.709 2.929-2.915 5.587-5.449 8.814-8.071C69.31 16.94 77.204 12.083 85.664 8.406 97.882 3.103 111.959.377 126 0m-25.818 106.866c-9.176-4.576-20.854-11.312-32.544-20.541-2.465 5.119-2.735 9.586-1.466 13.193.901 2.542 2.597 4.753 4.826 6.512 2.416 1.901 5.432 3.285 8.766 4.033 6.326 1.425 13.711.593 20.418-3.197" />
                    <path d="M197.167 75.016c6.436-6.495 12.107-13.684 16.667-20.099l2.316 4.359c7.456 14.917 11.33 29.774 11.33 46.494l-.016 26.532.14 13.754c.54 33.766 7.846 67.929 24.396 99.193l-34.627-27.922-24.501 39.759-25.74-24.231L126 299.604l-41.132-66.748-25.739 24.231-24.501-39.759L0 245.25c16.55-31.264 23.856-65.427 24.397-99.193l.14-13.754-.016-26.532c0-16.721 3.873-31.578 11.331-46.494l2.315-4.359c4.56 6.415 10.23 13.603 16.667 20.099l-2.01 4.175c-3.905 8.109-5.198 17.176-2.156 25.799 1.961 5.554 5.54 10.317 10.154 13.953 4.48 3.531 9.782 5.911 15.333 7.161 3.616.814 7.3 1.149 10.96 1.035-.854 4.841-1.227 9.862-1.251 14.978L53.2 160.984l25.206 14.129a41.926 41.926 0 0 1 5.734 3.869c20.781 18.658 33.275 73.855 41.861 100.816 8.587-26.961 21.08-82.158 41.862-100.816a41.865 41.865 0 0 1 5.734-3.869l25.206-14.129-32.665-18.866c-.024-5.116-.397-10.137-1.251-14.978 3.66.114 7.344-.221 10.96-1.035 5.551-1.25 10.854-3.63 15.333-7.161 4.613-3.636 8.193-8.399 10.153-13.953 3.043-8.623 1.749-17.689-2.155-25.799l-2.01-4.175z" />
                  </svg>
                </a>
                <a
                  href="https://www.dextools.io/app/en/solana/pair-explorer/FRi5dHtacw7xkcU91pqTvWoZgDMDvP8XinbkzCDRRCd9"
                  className="flex items-center bg-white hover:bg-cyan-200 px-4 py-2 rounded-md outline outline-2 shadow-solid-primary shadow-black"
                  target="_blank"
                  title="Dextools"
                >
                  <svg
                    fill="none"
                    viewBox="0 -0.058 754.779 867.058"
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-7"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M280.395 49.025c-51.649 26.905-93.905 49.672-93.896 50.598.023 2.39 123.959 65.156 128.358 65.003 2.001-.067 16.517-6.749 32.256-14.847l28.621-14.721 31.258 16.067 31.256 16.07 51.188-23.001c77.13-34.659 85.141-38.457 83.885-39.733-1.666-1.693-29.331-16.555-104.388-56.07-36.274-19.098-71.481-37.823-78.24-41.612-6.758-3.789-13.21-6.837-14.337-6.778s-44.311 22.12-95.961 49.024zM53.863 166.331.097 194.103v121.886c0 67.038.706 121.885 1.572 121.885.863 0 27.316-11.467 58.783-25.482l57.213-25.482V258.434l27.958 15.232a33224.294 33224.294 0 0 0 64.671 35.109l36.712 19.877 16.336-7.387a3822.03 3822.03 0 0 0 30.674-14.056c7.885-3.672 27.241-12.39 43.012-19.377 15.771-6.99 30.37-14.019 32.44-15.621 2.75-2.128-30.782-20.658-124.025-68.54-70.285-36.093-130.046-65.509-132.802-65.368s-29.206 12.752-58.778 28.028zm529.148 7.799c-36.618 16.531-66.604 30.717-66.638 31.526-.032.808 19.926 12.675 44.354 26.367 24.426 13.695 44.412 25.632 44.412 26.531 0 .897-21.615 11.37-48.03 23.278-26.419 11.905-93.194 42.061-148.393 67.014l-184.954 83.602c-46.525 21.032-88.462 39.989-93.193 42.132-95.03 43.019-121.15 54.956-124.737 57.005-3.607 2.063-4.424 14.048-5.066 74.201L0 677.53l48.08 24.498 48.079 24.497 66.669-30.088c36.669-16.547 66.669-30.953 66.669-32.014 0-1.058-6.776-5.473-15.054-9.815-8.282-4.342-25.378-13.954-37.995-21.364-12.616-7.411-25.196-14.21-27.958-15.112-2.761-.899-4.98-2.472-4.935-3.498.046-1.023 29.404-14.968 65.236-30.991 69.597-31.117 122.858-55.1 237.202-106.809a305577.39 305577.39 0 0 1 153.411-69.31c44.948-20.288 97.208-43.983 116.134-52.655l34.41-15.767.765-72.561.769-72.558-48.765-25.03c-26.822-13.765-49.748-24.994-50.95-24.953-1.201.038-32.141 13.595-68.756 30.13zm153.872 261.772c-7.186 3.51-21.38 10.082-31.542 14.603s-29.446 13.222-42.852 19.339l-24.374 11.117-.556 63.702c-.307 35.035-1.597 63.545-2.867 63.36-2.885-.429-48.567-23.857-94.487-48.463-33.143-17.757-35.225-18.463-43.013-14.606-4.502 2.231-31.413 14.3-59.801 26.825-28.389 12.523-52.541 23.587-53.677 24.589-1.133 1 56.002 31.967 126.97 68.819l129.029 67.003 55.119-28.513c30.312-15.68 56.088-29.983 57.275-31.782 2.672-4.045 2.443-242.93-.232-242.607-1.058.127-7.806 3.104-14.992 6.614zM431.656 716.293a25013.26 25013.26 0 0 0-28.675 12.349c-28.856 12.484-23.201 12.898-57.531-4.192-22.865-11.382-32.721-14.894-36.999-13.189-3.209 1.278-30.826 13.703-61.376 27.61-30.548 13.907-56.602 25.285-57.898 25.285-12.817 0 8.491 12.731 90.714 54.207L376.319 867l40.572-20.03c22.315-11.017 67.323-33.078 100.021-49.024 32.695-15.95 59.042-29.413 58.549-29.921-.497-.506-27.893-14.574-60.883-31.262l-59.982-30.338z"
                      fill="#000"
                      fill-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <Image
                src="/chad.png"
                width={306}
                height={320}
                className="w-72 h-auto mx-auto"
                priority="low"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-12 px-4">
          <h2 className="text-white text-4xl md:text-7xl font-black mb-6 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-black text-center">
            Chadonomics
          </h2>
          <div class="grid md:grid-cols-2 gap-4 text-center">
            <div className="bg-white px-4 py-8 rounded-2xl ring-1 ring-cyan-200">
              <h3 className="text-3xl font-semibold mb-4">Contract Address</h3>
              <div class="flex items-center">
                <input
                  type="text"
                  value={contract_address}
                  className="w-full max-w-full border px-2 py-1 rounded-md text-center"
                  readOnly
                />
                <button
                  type="button"
                  className="ml-2 border px-2 py-1 rounded-md text-center hover:bg-cyan-200"
                  onClick={handleCopy}
                  disabled={isDisabled}
                >
                  {buttonText}
                </button>
              </div>
            </div>
            <div className="bg-white px-4 py-8 rounded-2xl ring-1 ring-cyan-200">
              <h3 className="text-3xl font-semibold mb-4">Symbol</h3>
              <div className="font-semibold text-2xl">$chad</div>
            </div>
            <div className="bg-white px-4 py-8 rounded-xl ring-1 ring-cyan-200">
              <h3 className="text-3xl font-semibold mb-4">Network</h3>
              <div>
                <Image
                  src="/solana.png"
                  width={100}
                  height={100}
                  className="size-12 mx-auto"
                  alt=""
                />
              </div>
            </div>
            <div className="bg-white px-4 py-8 rounded-2xl ring-1 ring-cyan-200">
              <h3 className="text-3xl font-semibold mb-4">Supply</h3>
              <div className="font-semibold text-2xl">999,960,379.72</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-12 px-4">
          <div class="grid md:grid-cols-2 gap-4 bg-white rounded-2xl ring-1 ring-cyan-200">
            <div className="px-4 md:px-8 py-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-black mb-4 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-gray-300">
                  ORIGIN & EVOLUTION OF THE MEME
                </h1>
                <div className="text-xl leading-8 space-y-8">
                  <p>
                    The &ldquo;<strong>Yes Chad</strong>&rdquo; or &ldquo;
                    <strong>Nordic Gamer</strong>&rdquo; meme sprouted from the
                    fertile grounds of 4chan&#39;s /pol/ board, where it was
                    initially part of a meme comparing Nordic and Mediterranean
                    archetypes. This character, with his stoic,
                    &ldquo;yes&rdquo;-affirming demeanor, became a symbol of
                    unbothered confidence. Born in August 2019, thanks to a
                    tweet by @yachs_91, it quickly became an internet sensation,
                    embodying hyper-masculine indifference or, in some cases, a
                    satirical take on racial and cultural stereotypes.
                  </p>
                  <p>
                    Over time, <strong>Yes Chad</strong> transcended its
                    controversial roots. It&#39;s now often used to represent a
                    figure of calm in the storm of internet debates, a meme that
                    says, &ldquo;I&#39;m above this fray.&rdquo; It&#39;s been
                    adopted across various platforms for its simplicity and the
                    humorous, often ironic, acknowledgment of life&#39;s
                    absurdities.
                  </p>
                  <p>
                    <a
                      href="https://jup.ag/swap/SOL-7rdeLkyfmxujFthUNYZM7jWGEKZnT9mkeSGG1c9hpump"
                      className="bg-white hover:bg-cyan-200 px-4 py-2 rounded-md outline outline-2 font-semibold shadow-solid-primary shadow-black"
                      target="_blank"
                    >
                      BUY $CHAD ON JUPITER SWAP
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
                priority="low"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-16 px-4">
          <Image
            src="/cover-0.jpg"
            width={945}
            height={652}
            className="w-full h-auto rounded-2xl ring-1 ring-cyan-200"
            priority="low"
            alt=""
          />
        </div>
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 px-4">
          <h2 className="text-white text-4xl md:text-7xl font-black mb-6 [text-shadow:_2px_4px_0_var(--tw-shadow-color)] shadow-black text-center">
            Chart
          </h2>
          <iframe
            width="100%"
            height="600"
            src="https://birdeye.so/tv-widget/7rdeLkyfmxujFthUNYZM7jWGEKZnT9mkeSGG1c9hpump?chain=solana&viewMode=pair&chartInterval=240&chartType=CANDLE&chartTimezone=Etc%2FUTC&chartLeftToolbar=show&theme=light"
            frameborder="0"
            loading="lazy"
            allowFullScreen
            className="rounded-2xl ring-1 ring-cyan-200"
          ></iframe>
        </div>
        <div className="bg-[#2B8CAD]">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center font-semibold">
            Copyright © 2024 Yes Chad
          </div>
        </div>
      </div>
    </>
  )
}
