import React from "react";
import axios from 'axios';

const styles = {
    background: "h-screen w-screen bg-[#b8b8b8] fixed flex justify-center items-center",
    container: "w-500 h-500 rounded-xl bg-white flex flex-col p-25",
    textBox: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
    label: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
}

const modal = ({setOpenModal}) => {
    const createNft = async () => {

        const ethereum = window.ethereum;

        const name = document.getElementById("name").value
        const desc = document.getElementById("desc").value
        const file = document.getElementById("media").files[0]

        const response = await fetch(`http://localhost:3000/products/create-nft`, {
        method: "POST",
        cache: "no-cache",
        mode: 'cors',
        credentials: 'include',
        headers: { "content-type": "application/json", },
            body: JSON.stringify({
                metadata: {
                    name: name,
                    description: desc,
            }
        }),
        });
        
        const data = await response.json();
        const tx = data.tx;
        const token_id = data.token_id;

        var form_data = new FormData();
        form_data.append('file', file);

        await fetch(`http://localhost:3000/products/create-nft/${token_id}`, {
            body: form_data,
            method: "PUT",
            mode: 'cors',
            credentials: 'include',
        });

        const tx_hash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });

        console.log(tx_hash);
        setOpenModal(false)
    } 
    return (<>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-gray-600 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create Non Fungible Token
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpenModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                        <input type="file" id="media" accept="image/png, image/jpeg"/>
                        <br/>
                        <label for="name" className={ styles.label }>Name:</label>
                        <input type="text" id="name" className={styles.textBox}/>
                        <br />
                        <label for="desc" className={ styles.label}>Description:</label>
                        <textarea id="desc" className={ styles.textBox }/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createNft}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

}

export default modal;