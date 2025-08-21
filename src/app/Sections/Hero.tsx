"use client"
import {GalleryHorizontal, GalleryVertical, TvMinimalPlay} from "lucide-react";

export default function Hero(){
    return (
        <div id="Hero" className=" min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8" >
            <div className="flex flex-col w-full max-w-7xl gap-10 sm:gap-12 md:gap-16 justify-center items-center rounded-2xl py-10 sm:py-12 md:py-16" >
                <p className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl drop-shadow-gray-400 bg-clip-text text-transparent bg-gradient-to-l from-cyan-700 to-red-700" > Hi, I am Devendra Suthar</p>
                <p className="font-mono text-base sm:text-lg md:text-xl font-light text-cyan-400 text-center" >I may not have the right words, but my edits will say it all</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full" >
                    <div className="flex flex-col justify-center items-center gap-6 rounded-2xl ring-1 ring-white p-6 w-full min-h-[240px] " >
                        <TvMinimalPlay className="text-red-700 size-10 md:size-12 md:hover:size-14 hover:size-12 transition-all"/>
                        <p className="font-mono text-lg md:text-xl text-center text-transparent bg-clip-text bg-gradient-to-l from-red-700 via-white to-red-700 hover:animate-pulse " >Youtube Videos</p>
                        <p className="font-mono text-sm font-light text-center px-2 sm:px-4">High-quality post-production services designed for YouTube creators & storytellers</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6 rounded-2xl ring-1 ring-white p-6 w-full min-h-[240px]" >
                        <GalleryHorizontal className="text-pink-400 size-10 md:size-12 md:hover:size-14 hover:size-12 transition-all"/>
                        <p className="font-mono text-lg md:text-xl text-center text-transparent bg-clip-text bg-gradient-to-l from-pink-500 via-orange-300 to-pink-700 hover:animate-pulse" >Instagram Reels</p>
                        <p className="font-mono text-sm font-light text-center px-2 sm:px-4">Short-form content editor | High-quality Reels & trendy edits for IG</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6 rounded-2xl ring-1 ring-white p-6 w-full min-h-[240px]" >
                        <GalleryVertical className="size-10 md:size-12 text-red-400 md:hover:size-14 hover:size-12 transition-all" />
                        <p className="font-mono text-lg md:text-xl text-center text-transparent bg-clip-text bg-gradient-to-l from-red-700 via-white to-red-700 hover:animate-pulse " >YouTube Shorts</p>
                        <p className="font-mono text-sm font-light text-center px-2 sm:px-4">Transforming raw clips into viral-worthy YouTube Shorts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}