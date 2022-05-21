import { useContext, useEffect, useState } from 'react'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import AuthContext from '../../contexts/AuthProvider'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ isListed, selectedNft, listings, setOpenModal }) => {
  const {auth} = useContext(AuthContext);

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
    
  const buyItem = async (
    quantityDesired = 1,
  ) => {
    
    confirmPurchase()
  }

  const cancelListing = () => {
    console.log('Listing Cancelled')
  }

  var button;
  console.log(isListed)
  if (auth?.user === selectedNft?.owner) {

      button = <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
        <IoMdWallet className={style.buttonIcon} />
        <div className={style.buttonText} onClick={ isListed?cancelListing:setOpenModal}>{isListed ? 'Cancel Listing' : 'List Item'} </div>
      </div>;
  }
  else
    button = <div
            onClick={() => {
              buyItem(selectedMarketNft.id, 1)
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {button}
    </div>
  )
}

export default MakeOffer
