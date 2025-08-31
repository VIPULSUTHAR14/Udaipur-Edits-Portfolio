"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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
      <section id="projects" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
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
      <section id="projects" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
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
    <section id="projects" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
          My Projects
        </h2>
        
        {projectData.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-cyan-400 font-mono text-xl">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project) => (
              <div key={project._id} className="bg-gray-900 rounded-2xl p-6 ring-1 ring-white/10 hover:ring-cyan-500/50 transition-all">
                <div className="mb-4">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-mono text-center">
                  {project.title}
                </h3>
                <div className="flex justify-center">
                  <a 
                    href={project.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-mono hover:bg-red-500 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}