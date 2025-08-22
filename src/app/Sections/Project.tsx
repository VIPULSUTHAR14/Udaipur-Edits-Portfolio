"use client";
import videoList from "@/app/components/video-list.js";

export default function Project() {
  return (
    <div
      id="projects"
      className=" flex flex-col gap-3 justify-start items-center"
    >
      <div className="flex justify-center ">
        <p className="font-mono font-bold text-5xl ">My Work</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5">
        {videoList.map((e, idx) => {
          // Check for required properties in each video object
          if (!e ||!e.VideoUrl || !e.Thumbnail) {
            return (
              <div key={idx} className="p-5 border rounded bg-red-100">
                <p className="text-red-500 font-mono">Error: Missing video data.</p>
              </div>
            );
          }
          return (
            <div key={idx} className="bg-gray-900 p-6 rounded-2xl">
              
              <a href={e.VideoUrl}>
                <div
                  className=" h-[25vh] md:h-[35vh] w-[70vw] md:w-[35vw] p-5 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${e.Thumbnail})` }}
                ></div>
              </a>
              <div className="flex justify-center items-center pt-7" >
              <p className="font-mono text-md">{e.Title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
