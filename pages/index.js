import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
// import { useWeb3 } from '@3rdweb/hooks'
import { useEffect, useState } from 'react'
// import { client } from '../lib/sanityClient'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export default function Home() {
  const { address, setAddress } = useState();

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!address) return
    ;(async () => {
      welcomeUser(result.userName)
    })()
  }, [address])

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
        <>
        <Header setOpenModal={ setOpenModal }/>
        <Hero openModal={openModal} setOpenModal={setOpenModal}/>
        </>
    </div>
  )
}
