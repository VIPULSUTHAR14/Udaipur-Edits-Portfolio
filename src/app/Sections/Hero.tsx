"use client"
import Link from "next/link";
import { GalleryHorizontal, GalleryVertical, TvMinimalPlay } from "lucide-react";

export default function Hero() {
    return (
        <div id="Hero" className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b-2 border-gray-400/10 bg-[url('/dev1.jpg')] bg-cover bg-center bg-no-repeat backdrop-blur-3xl" >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div className="relative z-10 flex flex-col w-full max-w-7xl gap-8 sm:gap-12 md:gap-16 justify-center items-center rounded-2xl py-12 sm:py-16" >
                <div className="flex  sm:flex-row gap-6 sm:gap-12 md:gap-20 items-center justify-center" >
                    <img src="/NorexLogo.jpg" alt="Norex Logo" className="size-32 sm:size-44 md:size-56 rounded-full border-2 border-white/20 shadow-lg drop-shadow-xl drop-shadow-amber-300" />
                    <img src="/UdaipurEditz.png" alt="Udaipur Edits Logo" className="size-32 sm:size-44 md:size-56 drop-shadow-xl drop-shadow-amber-300 object-contain" />
                </div>
                <div className="flex flex-col justify-center items-center gap-y-4 text-center max-w-3xl" >
                    <h1 className="text-4xl sm:text-5xl font-bold font-mono text-white tracking-wider" >Norex</h1>
                    <h1 className="text-amber-400 text-xl sm:text-2xl font-bold font-mono">Powered by UdaipurEditz</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light font-mono max-w-2xl mx-auto leading-relaxed px-4">
                        Elevating narrative through precision-driven cinematic craft. Where every frame finds its purpose.
                    </p>
                </div>
                {/* <div>
                    <Link href="project">
                        <button className="bg-white text-black hover:bg-neutral-200 transition-colors font-mono text-xl px-10 py-3 font-semibold rounded-sm cursor-pointer shadow-md" >
                            EXPLORE OUR WORK
                        </button>
                    </Link>
                </div> */}
            </div>
        </div>
    )
}