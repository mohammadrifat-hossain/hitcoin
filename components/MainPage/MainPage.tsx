"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Logo from "@/public/assets/logo.png";
import { RiCoinsFill } from "react-icons/ri";
import League from "./League";
import { useSession } from "next-auth/react";
import { IUser } from "@/lib/utils";

const MainPage = () => {
  const [trophy, setTrophy] = useState(0);
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
      if (res.success) {
        setUserInfo(res.userInfo);
        setTrophy(res.userInfo?.balance)
      }
    }
  };

  useEffect(() => {
    FetchUser();
  }, [data?.user?.email]);

  const handleMine = async () => {
    try {
      if (userInfo?._id) {
        const data = await fetch("/api/mine", {
          method: "POST",
          body: JSON.stringify({ id: userInfo?._id, balance: userInfo?.balance + 1 }),
        });
        const res = await data.json();
        if(res.success){
          FetchUser()
        }
      }
    } catch (error) {}
  };

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
