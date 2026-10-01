import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

export default function TopBar() {
  return (
    <div className="bg-[#ffe51fff] text-[#1744bc]">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="hidden md:flex items-center gap-2">
          <a href="tel:+880123456789" className="flex items-center gap-1">
            <TbBrandMeta className="text-2xl" />
          </a>
          <a href="tel:+880123456789" className="flex items-center gap-1">
            <IoLogoInstagram className="text-2xl text-[#1744bc]" />
          </a>
          <a href="tel:+880123456789" className="flex items-center gap-1">
            <RiTwitterXLine className="text-2xl" />
          </a>
        </div>
        <div className="text-sm items-center flex-grow text-center">
          <span>We Ship worldwide - Fast and Reliable! </span>
        </div>
        <div className="hidden md:block items-center gap-2">
          <span>Call us: +880123456789</span>
        </div>
      </div>
    </div>
  );
}
