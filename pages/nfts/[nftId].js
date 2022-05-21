import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
  background: "h-screen w-screen bg-[#b8b8b8] fixed flex justify-center items-center",
    textBox: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
    label: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
}

const Nft = () => {
  const [selectedNft, setSelectedNft] = useState()
  const [isListed, setListed] = useState([])
  const [listings, setListings] = useState()
  const router = useRouter()
  const item_id = router.query.nftId;

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {

    const fetchData = async () => {
       const productsResponse = await fetch(`http://localhost:3000/products/nft/${item_id}`, {
        method: "GET",
        cache: "no-cache",
        mode: 'cors',
        credentials: 'include',
          })
        
        const data = await productsResponse.json();
        const nft = data[0]
      setSelectedNft(nft)
      setListed(nft.is_listed)
    }
         
    fetchData()
  }, [])

  const createListing = async () => {

    const price = document.getElementById('price').value
    data = {
      item_id: item_id,
      price: price
    }
    
       const response = await fetch(`localhost:3000/payments/create-listing`, {
        method: "POST",
        cache: "no-cache",
        mode: 'cors',
         credentials: 'include',
        body: data
          })
        
    if (response.status === 200) {
      setListed(true)
    }        
  }

  return (
    <div>
      <Header />
      {openModal && <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-gray-600 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create Listing
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                        <label for="price" className={ style.label }>Price:</label>
                        <input type="text" id="price" className={style.textBox}/>
                        <br />
                        
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setOpenModal(false)}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {createListing()}}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>}
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                setOpenModal = {setOpenModal}
                isListed={selectedNft?.is_listed}
                selectedNft={selectedNft}
                listings={listings}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
