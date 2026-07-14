"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Play,
    X,
    MapPin,
    Calendar,
    Search,
    SlidersHorizontal,
    ArrowLeft,
    Clock,
    Video,
    ExternalLink
} from "lucide-react";

interface Project {
    _id: string;
    title: string;
    imageUrl: string;
    videoUrl: string;
    category: string;
    subCategory: string;
    location: string;
    date: string;
    createdAt?: string;
}

// Categories and subcategories configuration
const CATEGORIES_CONFIG = [
    {
        id: "Social Media",
        label: "Social Media",
        icon: "🎬",
        subCategories: ["Instagram Reels", "YouTube Shorts", "TikTok", "Facebook"]
    },
    {
        id: "YouTube",
        label: "YouTube",
        icon: "▶️",
        subCategories: ["Long-form videos", "Podcasts", "Vlogs", "Gaming"]
    },
    {
        id: "Corporate & Commercial",
        label: "Corporate & Commercial",
        icon: "🏢",
        subCategories: ["Brand films", "Ads", "Company profiles"]
    },
    {
        id: "Real Estate",
        label: "Real Estate",
        icon: "🏠",
        subCategories: ["Property tours", "Builder promotions", "Drone videos"]
    },
    {
        id: "Travel & Lifestyle",
        label: "Travel & Lifestyle",
        icon: "✈️",
        subCategories: ["Travel films", "Hotels", "Tourism", "Lifestyle content"]
    }
];

// Helper to determine if the video is vertical
function isVerticalVideo(category: string, subCategory: string): boolean {
    const cat = (category || "").toLowerCase();
    const sub = (subCategory || "").toLowerCase();

    return (
        cat === "social media" &&
        (sub.includes("reel") || sub.includes("short") || sub.includes("tiktok") || sub.includes("facebook"))
    );
}

// Helper to extract YouTube video ID
function getYouTubeEmbedUrl(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export default function MainProject() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showRecentOnly, setShowRecentOnly] = useState(false);

    // Selected project for modal
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    // Fetch projects from MainProject collection
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                if (!response.ok) {
                    throw new Error("Failed to fetch project list");
                }
                const data = await response.json();
                setProjects(data.projects || []);
            } catch (err) {
                console.error("Error loading projects:", err);
                setError("Unable to load projects. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...projects];

        // 1. Category Filter
        if (selectedCategory) {
            result = result.filter(
                (p) => (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // 2. Sub-Category Filter
        if (selectedSubCategory) {
            result = result.filter(
                (p) => (p.subCategory || "").toLowerCase() === selectedSubCategory.toLowerCase()
            );
        }

        // 3. Search query (title or location)
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    (p.title || "").toLowerCase().includes(query) ||
                    (p.location || "").toLowerCase().includes(query)
            );
        }

        // 4. Recent Filter (data close to today - within 30 days)
        if (showRecentOnly) {
            const today = new Date();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 30);

            result = result.filter((p) => {
                if (!p.date) return false;
                const projectDate = new Date(p.date);
                const timeDiff = Math.abs(today.getTime() - projectDate.getTime());
                const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return diffDays <= 30;
            });
        }

        setFilteredProjects(result);
    }, [projects, selectedCategory, selectedSubCategory, searchQuery, showRecentOnly]);

    const handleCategoryChange = (categoryId: string | null) => {
        setSelectedCategory(categoryId);
        setSelectedSubCategory(null);
    };

    const getSubcategories = () => {
        if (!selectedCategory) return [];
        const catObj = CATEGORIES_CONFIG.find(c => c.id === selectedCategory);
        return catObj ? catObj.subCategories : [];
    };

    const resetAllFilters = () => {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSearchQuery("");
        setShowRecentOnly(false);
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        try {
            const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
            return new Date(dateStr).toLocaleDateString("en-US", options);
        } catch {
            return dateStr;
        }
    };

    return (
        <main className="min-h-screen bg-[#fafafa] text-neutral-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div id="projects" className="max-w-7xl mx-auto">

                {/* Back Link & Header */}
                <div className="flex flex-col gap-4 mb-8">
                    {/* <Link
                        href="/"
                        className="inline-flex items-center text-sm font-mono text-neutral-600 hover:text-black transition-colors group w-fit"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link> */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-black">
                            EXPLORE OUR WORK
                        </h1>
                        <p className="text-neutral-600 mt-2 font-mono text-sm max-w-2xl">
                            Elevating narrative through precision-driven cinematic craft. Browse our portfolio by categories, formats, or recency.
                        </p>
                    </div>
                </div>

                {/* Filters Controls Panel */}
                <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-6 mb-10 flex flex-col gap-6 shadow-sm shadow-neutral-100">

                    {/* Main Category Tabs */}
                    <div>
                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono block mb-3 font-semibold">
                            Filter by Category
                        </span>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleCategoryChange(null)}
                                className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-200 cursor-pointer ${selectedCategory === null
                                    ? "bg-black text-white border-black font-semibold"
                                    : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-400"
                                    }`}
                            >
                                🌐 All Work
                            </button>
                            {CATEGORIES_CONFIG.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-200 flex items-center gap-2 cursor-pointer ${selectedCategory === cat.id
                                        ? "bg-black text-white border-black font-semibold"
                                        : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-400"
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sub-Category tags (Visible only if category selected) */}
                    {selectedCategory && (
                        <div className="border-t border-neutral-100 pt-4 animate-fadeIn">
                            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono block mb-3 font-semibold">
                                Video Formats & Sub-types
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedSubCategory(null)}
                                    className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-all duration-200 cursor-pointer ${selectedSubCategory === null
                                        ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                        : "bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-400"
                                        }`}
                                >
                                    All {selectedCategory}
                                </button>
                                {getSubcategories().map((sub) => (
                                    <button
                                        key={sub}
                                        onClick={() => setSelectedSubCategory(sub)}
                                        className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-all duration-200 cursor-pointer ${selectedSubCategory === sub
                                            ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                                            : "bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-400"
                                            }`}
                                    >
                                        {sub}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search, Recent Toggle, Reset Row */}
                    <div className="border-t border-neutral-100 pt-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects by title or location..."
                                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500 text-black placeholder-neutral-400 font-mono"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-3 flex items-center text-neutral-400 hover:text-black cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Extra filters (Recent toggle & Reset) */}
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Recent Toggle */}
                            <button
                                onClick={() => setShowRecentOnly(!showRecentOnly)}
                                className={`px-4 py-2 text-xs font-mono rounded-lg border flex items-center gap-2 cursor-pointer transition-all duration-200 ${showRecentOnly
                                    ? "bg-amber-400 text-black border-amber-400 font-semibold shadow-md shadow-amber-405/20"
                                    : "bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-350"
                                    }`}
                                title="Show projects created or dated within the last 30 days"
                            >
                                <Clock className="w-3.5 h-3.5" />
                                <span>Recent Projects (Last 30 Days)</span>
                                {showRecentOnly && (
                                    <span className="w-2 h-2 rounded-full bg-black animate-ping inline-block ml-1"></span>
                                )}
                            </button>

                            {/* Reset Button */}
                            {(selectedCategory || selectedSubCategory || searchQuery || showRecentOnly) && (
                                <button
                                    onClick={resetAllFilters}
                                    className="px-4 py-2 text-xs font-mono text-neutral-500 hover:text-black flex items-center gap-2 cursor-pointer hover:underline"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    <span>Reset Filters</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center h-80 gap-4">
                        <div className="w-12 h-12 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
                        <p className="text-neutral-500 font-mono text-sm">Loading projects database...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-lg mx-auto">
                        <h3 className="text-red-600 text-lg font-mono font-semibold mb-2">Error Loading Projects</h3>
                        <p className="text-neutral-600 font-mono text-sm mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-neutral-900 text-white font-mono text-xs px-4 py-2 rounded hover:bg-neutral-800 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-neutral-200 max-w-xl mx-auto px-6">
                        <Video className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-lg font-mono font-semibold text-neutral-800 mb-2">No Projects Found</h3>
                        <p className="text-neutral-500 font-mono text-sm mb-6">
                            There are no projects matching the active filters. Try clearing some selections.
                        </p>
                        <button
                            onClick={resetAllFilters}
                            className="px-6 py-2.5 bg-black text-white font-semibold font-mono text-sm rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                            Show All Work
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* Results Count */}
                        <div className="text-xs font-mono text-neutral-500 mb-6 flex justify-between items-center">
                            <span>Showing {filteredProjects.length} projects</span>
                            {showRecentOnly && <span className="text-amber-600 font-semibold">📅 Recent Filter Active</span>}
                        </div>

                        {/* Grid layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                            {filteredProjects.map((project) => {
                                const vertical = isVerticalVideo(project.category, project.subCategory);

                                return (
                                    <div
                                        key={project._id}
                                        onClick={() => setActiveProject(project)}
                                        className="group bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xl rounded-xl overflow-hidden shadow-sm transition-all duration-305 flex flex-col cursor-pointer"
                                    >
                                        {/* Thumbnail Wrapper */}
                                        <div
                                            className={`relative w-full overflow-hidden bg-neutral-100 ${vertical ? "aspect-[9/16]" : "aspect-video"
                                                }`}
                                        >
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500"
                                                loading="lazy"
                                            />

                                            {/* Dark overlay & Play Button on Hover */}
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                                    <Play className="w-8 h-8 text-white fill-white" />
                                                </div>
                                            </div>

                                            {/* Floating Category Tag */}
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-neutral-200 rounded text-[10px] font-mono text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
                                                    {project.category}
                                                </span>
                                                {project.subCategory && (
                                                    <span className="px-2.5 py-1 bg-neutral-100/90 backdrop-blur-md border border-neutral-200/50 rounded text-[10px] font-mono text-neutral-600 font-medium">
                                                        {project.subCategory}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Aspect Ratio Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className="px-2 py-0.5 bg-white/85 backdrop-blur-md rounded text-[9px] font-mono text-neutral-500 shadow-sm">
                                                    {vertical ? "Vertical (9:16)" : "Landscape (16:9)"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Meta details */}
                                        <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white">
                                            <h3 className="text-base sm:text-lg font-semibold line-clamp-2 leading-snug text-neutral-900 group-hover:text-black transition-colors flex-grow">
                                                {project.title}
                                            </h3>

                                            {/* Meta Footer details */}
                                            <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-500">
                                                <div className="flex items-center justify-between">
                                                    {project.location && (
                                                        <span className="flex items-center text-cyan-700 font-semibold">
                                                            <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-500" />
                                                            {project.location}
                                                        </span>
                                                    )}
                                                    {project.date && (
                                                        <span className="flex items-center text-neutral-500">
                                                            <Calendar className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                                                            {formatDate(project.date)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>

            {/* Video Preview Modal overlay */}
            {activeProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="bg-white border border-neutral-200 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative text-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setActiveProject(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-neutral-100 rounded-full border border-neutral-200 text-neutral-850 cursor-pointer transition-colors shadow-md"
                            aria-label="Close details"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left: Video Player Embed or image placeholder */}
                        <div className="w-full md:w-3/5 bg-black flex items-center justify-center">
                            {getYouTubeEmbedUrl(activeProject.videoUrl) ? (
                                <div className="w-full aspect-video">
                                    <iframe
                                        src={`${getYouTubeEmbedUrl(activeProject.videoUrl)}?autoplay=1`}
                                        title={activeProject.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full border-0"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="relative w-full aspect-video md:h-full md:aspect-auto flex flex-col justify-center items-center">
                                    <img
                                        src={activeProject.imageUrl}
                                        alt={activeProject.title}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="w-16 h-16 bg-neutral-900/90 border border-neutral-800 rounded-full flex items-center justify-center mb-4">
                                            <Video className="w-8 h-8 text-cyan-400" />
                                        </div>
                                        <span className="text-xs uppercase tracking-widest font-mono text-neutral-300 block mb-2 font-bold">
                                            External Platform Video
                                        </span>
                                        <p className="text-sm text-neutral-200 font-mono mb-4 max-w-sm">
                                            This video is hosted on Instagram or another platform and cannot be embedded directly.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Meta Content */}
                        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                            <div>
                                {/* Labels */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded text-[10px] font-mono text-neutral-700 uppercase font-semibold">
                                        {activeProject.category}
                                    </span>
                                    {activeProject.subCategory && (
                                        <span className="px-2.5 py-1 bg-cyan-50 border border-cyan-100 rounded text-[10px] font-mono text-cyan-700 font-semibold">
                                            {activeProject.subCategory}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-4 text-neutral-900">
                                    {activeProject.title}
                                </h2>

                                {/* Grid details */}
                                <div className="space-y-3 pt-4 border-t border-neutral-100 text-sm font-mono text-neutral-800">
                                    {activeProject.location && (
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Location</span>
                                                <span className="text-neutral-900 font-semibold">{activeProject.location}</span>
                                            </div>
                                        </div>
                                    )}

                                    {activeProject.date && (
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
                                            <div>
                                                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Production Date</span>
                                                <span className="text-neutral-900">{formatDate(activeProject.date)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Watch CTA Button */}
                            <div className="mt-8 pt-4 border-t border-neutral-100">
                                <a
                                    href={activeProject.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-mono text-sm font-bold transition-all ${activeProject.videoUrl.includes("instagram.com")
                                        ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white shadow-md shadow-pink-500/20"
                                        : activeProject.videoUrl.includes("youtube.com") || activeProject.videoUrl.includes("youtu.be")
                                            ? "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
                                            : "bg-black hover:bg-neutral-800 text-white shadow-md"
                                        }`}
                                >
                                    <span>Watch Video</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </main>
    );
}
