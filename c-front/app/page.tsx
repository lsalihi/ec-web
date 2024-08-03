"use client"
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector, UseSelector } from "react-redux";




export default function Home() {
  const data = useSelector((state: RootState) => state.home.DataInfo);
  return (
    <>
      <div className="w-full h-screen bg-cover flex flex-col font-popin text-sm"
        style={{ backgroundImage: "url('home1.webp')" }}>
        <div className="w-full h-[15%] px-[10%] flex items-center justify-between">
          <div className="flex items-center ">
            <div>
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </div>

            <div className="text-2xl font-bold">{data.title}</div>
          </div>
          <div className="w-maxcontent px-[10px] h-11 bg-white flex items-center justify-center rounded-xl"> <Link rel="stylesheet" href="/map"> {data.newPoint} </Link></div>
          <div className="w-maxcontent px-[10px] h-11 bg-white flex items-center justify-center rounded-xl"> <Link rel="stylesheet" href="/map"> {data.addPoint} </Link></div>
          <div>
            <Link rel="stylesheet" href="/map"> hello </Link>
          </div>
          <div>pos</div>
          <div>langue</div>
          <div><Link rel="stylesheet" href="/SignIn">Hello,it's me</Link></div>
          {/* <div>
            <Link rel="stylesheet" href="/SignIn">SignIn</Link>
          </div>
          <div>
            <Link rel="stylesheet" href="/SignUp">SignUp</Link>
          </div> */}
        </div>
        <div className="w-full h-[50%] px-[10%] flex flex-col gap-20 justify-center text-white">
          <div className="text-5xl text-[#D6D6D6] font-bold">Discover,reserve, charge and Share Power</div>
          <div className="text-xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea quod neque dolores ad quo nam eius eum est natus nisi porro nobis aliquid tempore illo corporis, totam officia dolor!</div>
        </div>
      </div>
      <div className="w-full h-screen bg-cover"
        style={{ backgroundImage: "url('secondp.webp')" }}>
        <div className="flex flex-col justify-end items-end h-screen p-4">
          <div className="space-x-2 ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {/* <image src="/apple.png" alt="applestore" width={100} height={100} /> */}
              {/* <Image src="android.png" alt="logo" width={100} height={100} /> */}
              App Store</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Play Store</button>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-cover"
        style={{ backgroundImage: "url('mapsection.webp')" }}>
        <div className="flex h-full items-center justify-center">
          <div className="bg-white h-[30%] w-[40%] flex flex-col ">
            <p>find a Charging Point

              Power Charge Spot makes it easy to keep you electric vehicle charged and ready to go.
              with our platform, you can.

              Discover Nearby Chargers: Locate charging points conveniently close to your location.
              Reserve in Advance: Secure your charging slot to avoid waiting times.
              Get Real-Time Availability: See which charging points are available right now.

              Start you journey with a fully charged battery. Find your nearest charging point today!</p>
            <div className="w-maxcontent px-[10px] h-11 bg-white flex items-center justify-center rounded-xl"> <Link rel="stylesheet" href="/map"> found a charge point </Link></div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-cover"
        style={{ backgroundImage: "url('addstation.webp')" }}>
        seconde section
      </div>
      <div className="w-full h-screen bg-white">
        third one section
        <div><p>testmonial</p></div>
        <div>
          <p>
            What Our Clients says About Us
          </p>
        </div>
      </div>
      <div className="w-full h-[50vh] bg-green-300">
        footer here
      </div>
    </>
  );
}
