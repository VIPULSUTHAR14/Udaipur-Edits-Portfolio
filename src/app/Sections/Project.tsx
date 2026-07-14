"use client";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
}

export default function Projects() {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Make a GET request to our API endpoint
        const response = await fetch('/api/data', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }

        const data = await response.json();
        setProjectData(data.projects || []); // Store the project data in state

      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoading(false); // Stop loading, whether it succeeded or failed
      }
    };

    fetchProjectData();
  }, []);

  if (isLoading) {
    return (
      <section id="projects" className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
            My Projects
          </h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-cyan-400 font-mono text-xl">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
            My Projects
          </h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-400 font-mono text-xl">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="max-w-full h-auto flex flex-col bg-gray-400/40 gap-10 items-center justify-between py-10">
      <div className="flex flex-col items-center" >
        <h1 className="text-3xl font-sans  font-semibold text-black " >FEATURED WORK</h1>
      </div>
      <div className="flex flex-col items-center justify-between gap-20 " >
        {
          projectData.map((e) => (
            <div key={e._id} className=" max-w-3/6 flex flex-col items-center items-start gap-10" >
              <a href={e.videoUrl} className=" flex flex-col items-center"><img src={e.imageUrl} alt="" className=" border-2 border-amber-300" /></a>
              <div className="flex " >
                <h1 className="text-black font-mono font-bold text-xl" >{`${'||'}`}</h1>
                <h1 className="text-xl font-mono font-semibold text-gray-700" >{e.title}</h1>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}