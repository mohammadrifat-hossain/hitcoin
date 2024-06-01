"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/logo.png";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const { data } = useSession();

  const handleLogin = () => {
    signIn("google");
  };
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-2 md:px-5 bg-transparent">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" height={80} width={80} />
        <Link href={"/"}>
          <p className="text-2xl font-extrabold text-white">HitCoin</p>
        </Link>
      </div>
      <div>
        {!data?.user ? (
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-[50px] bg-white text-black flex items-center justify-center gap-2"
          >
            Login
          </button>
        ) : (
          <button
            onClick={()=> signOut()}
            className="px-4 py-2 rounded-[50px] bg-white text-black flex items-center justify-center gap-2"
          >
            <LuLogOut className="text-slate-400" />
            LogOut
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
