import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import data from '../../data.json'

export default function Header() {
  return (
    <div className="w-full h-screen bg-cover flex flex-col font-popin text-sm"
      style={{ backgroundImage: "url('home1.webp')" }}>
      <div className="w-full h-[15%] px-[10%] flex items-center justify-between">
        <div className="flex items-center ">
          <div>
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>

          <div className="text-2xl font-bold">{data.data.title}</div>
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
  )
}
