import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import nftlogo from '../assets/nft.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { BiPowerOff } from 'react-icons/bi'
import AuthContext from '../contexts/AuthProvider'
import {BsFillPersonFill} from 'react-icons/bs'
import { useRouter } from 'next/router'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center rounded-[0.8rem]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = ({ setOpenModal }) => {
  
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    const logoutResponse = await fetch(`http://localhost:3000/auth/logout`, {
        method: "POST",
        cache: "no-cache",
        mode: 'cors',
        credentials: 'include',
      });
      if (logoutResponse.status === 200) {
        try {
           setAuth({
            user: undefined
          })
        }
        catch (err) {
          console.log(err)
        }
      }
  }

  const openModal = async () => {
    if (!auth.user)
      await login();
    setOpenModal(true);
  }

  const toHex = (text) => {
    return (
      "0x" +
      text
        .split("")
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const login = async () => {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const public_address = (
        (await ethereum.request({
          method: "eth_requestAccounts",
        }))
      )[0]; // requests public address of wallet

      const getNonceResponse = await fetch(
        `http://localhost:3000/auth/getnonce?public_address=${public_address}`
      ).then((getNonceResponse) => getNonceResponse.json());

      const nonce = getNonceResponse.nonce;
      const payload_for_signature = toHex(
        `I am signing my one-time nonce: ${nonce}`
      );

      const signed_payload = await ethereum.request({
        method: "personal_sign",
        params: [payload_for_signature, public_address],
      });

      const loginResponse = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        cache: "no-cache",
        mode: 'cors',
        credentials: 'include',
        headers: { "content-type": "application/json", },
        body: JSON.stringify({
          username: public_address,
          password: signed_payload,
        }),
      });
      if (loginResponse.status === 200) {
        try {
           setAuth({
            user: public_address
          })
        }
        catch (err) {
          console.log(err)
        }
      }
    }
  };
  
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={nftlogo} height={40} width={40} />
          <div className={style.logoText}>Desi NFT</div>
        </div>
      </Link>
      <div className={style.searchBar}>
      </div>
      <div className={style.headerItems}>
        <div className={style.headerItem} onClick={() => openModal()}> Create </div>
        {
          auth.user ?
            <>
            <div className={style.headerIcon} onClick={()=>{router.push('/account')}}>
              <BsFillPersonFill />
            </div>
            <div className={style.headerIcon} onClick={logout}>
              <BiPowerOff />
            </div></>
          :
            <div className={style.headerIcon} onClick={login}>
              <MdOutlineAccountBalanceWallet />
            </div>
        }
      </div>
    </div>
  )
}

export default Header
