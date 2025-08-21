export default function Project(){
    return(
        <div id="projects" className=" flex flex-col gap-3 justify-start items-center">
            <div className="flex justify-center ">
                <p className="font-mono font-bold text-5xl " >My Work</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5" >
                <div className="h-[35vh] w-[90vw] md:w-[35vw] p-5  rounded-2xl ring-1 ring-white " >

                </div>
                <div className="h-[35vh] w-[90vw] md:w-[35vw] p-5   rounded-2xl ring-1 ring-white " >

                </div>
                <div className="h-[35vh] w-[90vw] md:w-[35vw] p-5  rounded-2xl ring-1 ring-white " >

                </div>
                <div className="h-[35vh] w-[90vw] md:w-[35vw] p-5   rounded-2xl ring-1 ring-white " >

                </div>
            </div>
        </div>
    )
}