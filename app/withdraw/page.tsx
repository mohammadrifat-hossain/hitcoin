"use client";
import { IUser } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SiBinance } from "react-icons/si";
import { MdOutlineSendToMobile } from "react-icons/md";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import toast from "react-hot-toast";

const WithDrawPage = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>();
  const { data } = useSession();
  const [amount, setAmount] = useState(0)

  const FetchUser = async () => {
    if (data?.user?.email) {
      const result = await fetch("/api/getuser", {
        method: "POST",
        body: JSON.stringify({
          email: data?.user?.email,
        }),
      });
      const res = await result.json();
      if (res.success) {
        setUserInfo(res.userInfo);
      }
    }
  };

  useEffect(() => {
    FetchUser();
  }, [data?.user?.email]);


  const handleAmoutChange = (e:any) =>{
    if(e.target.value <= userInfo?.balance!){
      setAmount(e.target.value)
    }else{
      setAmount(userInfo?.balance!)
    }
  }

  const handleWithdraw = () =>{
    toast.success("Coming soon!")
  }

  useEffect(()=>{
    if(!data?.user?.email){
      signIn("google")
    }
  },[])
  return (
    <div className="h-screen pt-[70px] ">
      <div className="max-w-[700px] mx-auto w-full p-3 bg-white rounded">
        <p className=" text-sm opacity-70">
          Minimum withdraw 2$ and 1$ = 100,000 HitCoin
        </p>
        <p className="flex items-center justify-center font-bold text-2xl">
          <Image src={Logo} alt="logo" height={50} width={50} />{" "}
          {userInfo?.balance}
        </p>
        <p className="text-xl font-bold flex items-center justify-center border-b pb-2">
          Your Balance: {userInfo?.balance! / 1000000}$
        </p>
        <div className="mt-4">
          <p className="flex items-center justify-center gap-1 text-3xl">
            Add wallet:
          </p>
          <p className="uppercase flex items-center justify-center text-2xl text-orange-400 my-2">
            <SiBinance /> Binance
          </p>
          <div className="flex items-center justify-between">

            <input
              type="number"
              value={amount}
              onChange={handleAmoutChange}
              className="px-4 py-2 rounded-[50px] transition focus:border-indigo-500  outline-none border w-full"
              placeholder="HitCoin Amount"
            />
            <p className="w-[20%] ml-2"> = {amount!/100000}$</p>
          </div>
          <input
            type="text"
            className="px-4 py-2 rounded-[50px] transition focus:border-indigo-500  outline-none border w-full mt-4"
            placeholder="Wallet Link"
          />
          <button disabled={amount < 200000} onClick={handleWithdraw} className={`uppercase px-5 py-2 rounded-3xl bg-indigo-500 text-white mx-auto my-3 flex items-center gap-1 ${amount <= 200000 && 'pointer-events-none opacity-60'}`}>
            <MdOutlineSendToMobile />
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithDrawPage;
