"use client"
import { useState } from "react";
import { Copy, Check ,Mail } from "lucide-react";

export default function Footer(){
    const [hasCopied,sethasCopied] = useState(false)
    const handlecopy = ()=>{
      navigator.clipboard.writeText('DevendraSuthar@gmail.com')
      sethasCopied(true)
      setTimeout(() => {
        sethasCopied(false);
      }, 5000);
    }
    return (
        <div className="flex flex-col h-[30vh] bg-gradient-to-l from-gray-800 to-gray-900 " >
            <div className="flex justify-center p-4">
                <p className="font-mono text-lg" >Thank you for taking the time to review my portfolio. I look forward to the opportunity to work with you</p>
            </div>
            <div>
            <div className="flex gap-3 items-center justify-start px-10 lg:justify-center" onClick={handlecopy} >
                {<Mail className="text-black"/>}
                    <p className="xl:text-lg md :text-xl font-mono text-cyan-700" >DevendraSuthar@gmail.com</p>
                    {hasCopied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6 text-gray-400" />}
                  </div>
            </div>
        </div>
    )
}