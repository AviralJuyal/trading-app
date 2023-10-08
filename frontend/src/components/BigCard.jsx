import React from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxReload } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import { BiWallet, BiSolidWallet } from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";
import Select from "react-select";
import { apiEndPoint } from "../utils/apiEndPoint";

const BigCard = ({
  tokens,
  selectedToken,
  setSelectedToken,
  quotedPrice,
  account,
  connectToMetaMask,
  loading,
  setLoading,
}) => {
  // List of tokens
  const options = tokens.map((e) => ({
    value: e.address,
    label: e.name,
    image: e.logoURI,
    symbol: e.symbol,
  }));

  // console.log(account, "acc");

  const CustomOption = ({ innerProps, label, data }) => (
    <div
      {...innerProps}
      className="w-full flex gap-y-2 items-start align-start justify-center p-4"
      style={{ maxHeight: "25px" }}
    >
      <img src={data.image} className="m-2" alt={""} width={20} height={10} />
      {data.symbol}
    </div>
  );

  const swap = async () => {
    console.log("swapping");
    setLoading(true);
    const response = await fetch(
      `${apiEndPoint}/swap?src=${selectedToken.src}&dst=${selectedToken.dst}&amount=${selectedToken.amount}&from=${account}&slippage=1`
    );
    const data = await response.json();
    console.log(data);
    setLoading(false);
  };

  // console.log(tokens);
  return (
    <>
      {!loading ? (
        <div className="absolute top-10 shadow-xl sm:w-full md:w-[60%] lg:w-[50%] xl:w-[45%] flex flex-col items-center justify-center bg-white rounded-xl px-6 pb-8">
          <div className="relative top-52 flex items-center justify-center bg-white shadow-xl rounded-full h-10 w-10">
            <FiArrowDown
              className="text-2xl text-blue-500 font-bold cursor-pointer"
              onClick={() => swap()}
            />
          </div>

          <div className="w-full flex items-start justify-between">
            <div className="flex items-center justify-center gap-x-4">
              <p className="text-lg font-bold cursor-pointer">Swap</p>
              <p className="text-lg font-bold text-gray-400 cursor-pointer">
                Limit
              </p>
            </div>

            <div className="flex items-center justify-center gap-x-4">
              <RxReload className="font-bold text-2xl cursor-pointer" />
              <AiOutlinePlus className="font-bold text-2xl cursor-pointer" />
              <TbAdjustmentsHorizontal className="font-bold text-2xl cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end w-full justify-between bg-[#f4f6fc] rounded-xl my-1 p-4">
            <div className="w-full sm:w-[60%] flex flex-col items-start justify-start gap-y-2">
              <p className="text-lg text-gray-500">You sell</p>
              <Select
                value={options.find(
                  (option) => option.value === selectedToken.src
                )}
                closeMenuOnSelect={true}
                className="w-full rounded-lg text-lg flex items-start justify-start align-start cursor-pointer"
                options={options}
                components={{ Option: CustomOption }}
                onChange={(option) =>
                  setSelectedToken({
                    ...selectedToken,
                    src: option.value,
                    srcName: option.label,
                  })
                }
              />
              <p className="text-lg text-gray-500">{selectedToken?.srcName}</p>
            </div>

            <div className="w-full sm:w-auto flex flex-col items-end justify-end gap-y-2">
              <input
                className="w-1/4 flex items-center justify-center p-2 text-lg rounded-lg border border-gray-400 outline-none"
                type="number"
                value={selectedToken.amount}
                onChange={(e) =>
                  setSelectedToken({ ...selectedToken, amount: e.target.value })
                }
              />
              <p className="text-lg text-gray-500">~$5.4737</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end w-full justify-between border bg-white border-[#f4f6fc] rounded-xl my-1 p-4">
            <div className="w-full sm:w-[60%] flex flex-col items-start justify-start gap-y-2">
              <p className="text-lg text-gray-500">You buy</p>
              <Select
                value={options.find(
                  (option) => option.value === selectedToken.dst
                )}
                closeMenuOnSelect={true}
                className="w-full rounded-lg text-lg flex items-start justify-start align-start cursor-pointer"
                options={options}
                components={{ Option: CustomOption }}
                onChange={(option) =>
                  setSelectedToken({
                    ...selectedToken,
                    dst: option.value,
                    dstName: option.label,
                  })
                }
              />
              <p className="text-lg text-gray-500">{selectedToken?.dstName}</p>
            </div>

            <div className="w-full sm:w-auto flex flex-col items-end justify-end gap-y-2">
              <p className="text-2xl">{quotedPrice}</p>
              <p className="text-lg text-gray-500">~$5.47333667(-0.01%)</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end w-full justify-between bg-[#f4f6fc] rounded-xl my-1 p-3">
            <div className="w-full sm:w-auto flex items-center justify-start gap-y-2">
              <GrCircleInformation className="mr-2 text-gray-500" />
              <p className="text-lg">
                1 MATIC = 0.573675 USDT
                <span className="text-lg text-gray-500">(~$0.57)</span>
              </p>
            </div>

            <div className="w-full sm:w-auto flex items-end justify-end gap-y-2">
              <p className="text-lg text-gray-500">~$0.01</p>
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center w-full justify-center border ${
              account ? "bg-green-100" : "bg-blue-100"
            } rounded-xl my-1 p-3 cursor-pointer`}
          >
            {account ? (
              <>
                <BiSolidWallet className="text-3xl text-green-500 font-bold mx-2" />
                <p className="text-2xl text-green-500 font-bold">Connected!</p>
              </>
            ) : (
              <div onClick={connectToMetaMask} className="flex">
                <BiWallet className="text-3xl text-blue-500 font-bold mx-2" />
                <p className="text-2xl text-blue-500 font-bold">
                  Connect Wallet
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default BigCard;
