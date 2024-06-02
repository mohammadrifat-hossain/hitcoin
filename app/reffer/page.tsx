"use client";
import { IUser } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaClipboard, FaCheckCircle } from "react-icons/fa";

const RefferPage = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>();
  const { data } = useSession();
  const [copied, setCopied] = useState(false);

  const FetchUser = useCallback(async()=>{
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
  },[data?.user?.email])

  useEffect(() => {
    FetchUser();
  }, [data?.user?.email, FetchUser]);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(userInfo?.userId!)
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(()=>{
    if(!data?.user?.email){
      signIn("google")
    }
  },[data?.user?.email])

  return (
    <div className="h-screen pt-[70px] ">
      <div className="max-w-[700px] mx-auto w-full p-3 bg-white rounded">
        <p className="text-center my-3">Your Referral code:</p>
        <div className="flex items-center justify-center gap-4 ">
          {userInfo?.userId
            .split("")
            .map((item, i) => (
              <div key={i} className="text-4xl h-[60px] w-[60px] border flex items-center justify-center rounded">
                {item}
              </div>
            ))}
        </div>
        <button
          onClick={handleCopy}
          className={`uppercase w-[130px] transition ${copied && "bg-green-500"} px-5 py-2 rounded-3xl bg-indigo-500 text-white mx-auto my-3 flex items-center justify-center gap-1`}
        >
          {copied ? <FaCheckCircle /> : <FaClipboard />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default RefferPage;
