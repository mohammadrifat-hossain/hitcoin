"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Logo from "@/public/assets/logo.png";
import { RiCoinsFill } from "react-icons/ri";
import League from "./League";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import {  useSession } from "next-auth/react";
import { IUser } from "@/lib/utils";

const MainPage = () => {
  const [trophy, setTrophy] = useState(0);
  const [balance, setBalance] = useState(0)
  const [userInfo, setUserInfo] = useState<IUser | null>();
  const { data } = useSession();

  const FetchUser = async () => {
    if (data?.user?.email) {
      const result = await fetch("/api/getuser", {
        method: "POST",
        body: JSON.stringify({
          email: data?.user?.email,
        }),
      });
      const res = await result.json();
      if(res.success){
        setUserInfo(res.userInfo)
      }
    }
  }

  useEffect(() => {
    FetchUser();
  }, [data?.user?.email]);

  const postToken = useMutation(api.todos.postToken);
  const getBalanceByEmail = useMutation(api.todos.getBalanceByEmail);

  const handleMine = async () => {
    try {
      if (data?.user?.email) {
        await postToken({
          email: data?.user?.email,
          balance: balance + 1,
        });
        
        setTrophy(balance + 1);
      }
    } catch (error) {
      console.log("mining error", error);
    }
  };

  const getBalance = async () =>{
    try {
      if(userInfo?.email){
        const data = await getBalanceByEmail({email:userInfo?.email})
        setBalance(data.balance)
        setTrophy(data.balance)
      }
    } catch (error) {
      console.log("get mining error", error);
    }
  }

  useEffect(()=>{
    getBalance()
  })

  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <League trophy={trophy} />

      <p className="text-5xl text-white font-bold  flex items-center justify-center gap-2">
        <RiCoinsFill className="text-yellow-400" />
        {trophy}
      </p>
      <button
        onClick={handleMine}
        className="h-[400px] w-[400px] rounded-full mainbtn transition"
      >
        <Image
          src={Logo}
          alt="Logo"
          height={1000}
          width={1000}
          className=" pointer-events-none"
        />
      </button>
    </div>
  );
};

export default MainPage;
