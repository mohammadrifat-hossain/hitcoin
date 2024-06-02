import MainPage from "@/components/MainPage/MainPage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen pt-[70px]">
      <div>
        <MainPage />
      </div>
<div class name="fixed h-screen w-full bg-black text -white flex items-center justify-center text-4xl font-bold">Under Maintenance</div>
    </div>
  );
}
