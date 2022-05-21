import React from "react";

interface getNonceResponseType {
  public_address: string;
  nonce: string;
}

const Navbar: () => JSX.Element = () => {
  const toHex: (text: string) => string = (text) => {
    return (
      "0x" +
      text
        .split("")
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const login: () => void = async () => {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const public_address = (
        (await ethereum.request({
          method: "eth_requestAccounts",
        })) as Array<string>
      )[0]; // requests public address of wallet

      const getNonceResponse: getNonceResponseType = await fetch(
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
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: public_address,
          password: signed_payload,
        }),
      });
    }
  };

  return (
    <nav className="bg-dark-navy shadow-lg">
      <div className="px-1">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-300 text-lg">
                  Desi NFT
                </span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <a href="" className="py-4 px-2 text-gray-300 font-semibold ">
              Home
            </a>
            <a
              href=""
              className="py-4 px-2 text-gray-300 font-semibold hover:text-white transition duration-300"
            >
              Services
            </a>
            <a
              href=""
              className="py-4 px-2 text-gray-300 font-semibold hover:text-white transition duration-300"
            >
              About
            </a>
            <button
              className="py-4 px-2 text-gray-300 font-semibold hover:text-white transition duration-300"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
