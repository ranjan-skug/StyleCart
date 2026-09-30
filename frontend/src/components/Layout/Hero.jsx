import React from "react";
import HeroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative w-full">
      <img
        src={HeroImg}
        alt="Rabbit fashion collection"
        className="w-full h-[400px] md:h-[600px] lg:h-[620px] object-cover"
      />

      <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Vacation
          </h1>

          <p className="text-sm tracking-tight md:text-lg mb-6">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>

          <Link
            to="#"
            className="inline-block bg-white text-gray-950 px-6 py-2 rounded-sm text-lg hover:bg-black hover:text-white transition-all transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
