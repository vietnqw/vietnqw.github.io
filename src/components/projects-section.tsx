"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Filter } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import content from "@/data/projects.json"

const { projects, categories, githubAllUrl } = content

const statusColors: { [key: string]: string } = {
  Planned: "bg-slate-400 text-slate-900 border-slate-500",
  InProgress: "bg-cyan-400 text-cyan-900 border-cyan-500",
  Demo: "bg-blue-400 text-blue-900 border-blue-500",
  Live: "bg-green-400 text-green-900 border-green-500",
  Completed: "bg-purple-400 text-purple-900 border-purple-500",
  Archived: "bg-zinc-500 text-zinc-100 border-zinc-600",
}

const statusOrder = [
  "Live",
  "Demo",
  "Completed",
  "InProgress",
  "Planned",
  "Archived",
]

export function ProjectsSection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const isAllActive = selectedCategories.length === 0

  const handleAllClick = () => {
    // Selecting "All" always clears other selections and cannot be de-selected directly
    setSelectedCategories([])
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // De-select the category; if none left, "All" becomes active implicitly
        return prev.filter((c) => c !== category)
      }
      // Select the category and automatically de-select "All"
      return [...prev, category]
    })
  }

  const sortedProjects = [...projects].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  )

  const filteredProjects = sortedProjects.filter(
    (project) => isAllActive || selectedCategories.includes(project.category)
  )

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const regularProjects = filteredProjects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-12 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-6 text-balance">My Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my latest work in software development
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const isSelected =
              category === "All"
                ? isAllActive
                : selectedCategories.includes(category)
            const handleClick = () => {
              if (category === "All") return handleAllClick()
              return handleCategoryToggle(category)
            }
            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "outline"}
                onClick={handleClick}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "border-primary/30 text-primary hover:bg-primary/10 hover-glow"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            )
          })}
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="font-space-grotesk text-2xl font-bold mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Featured Projects
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden glass border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 hover-lift"
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge
                      className={`absolute top-4 right-4 transition-all duration-300 ${
                        statusColors[project.status as keyof typeof statusColors]
                      } ${hoveredProject === project.title ? "scale-110" : ""}`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <h4 className="font-space-grotesk text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.liveUrl !== "#" ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <GradientButton size="sm" className="w-full">
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </GradientButton>
                        </a>
                      ) : (
                        <GradientButton size="sm" className="w-full" disabled>
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </GradientButton>
                      )}
                      {project.githubUrl !== "#" ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-primary/30 hover:bg-primary/10 bg-transparent hover-glow"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        </a>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary/30 hover:bg-primary/10 bg-transparent hover-glow"
                          disabled
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects Grid */}
        {regularProjects.length > 0 && (
          <div>
            <h3 className="font-space-grotesk text-2xl font-bold mb-8">All Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden glass border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover-lift"
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <Badge
                      className={`absolute top-3 right-3 text-xs transition-all duration-300 ${
                        statusColors[project.status as keyof typeof statusColors]
                      } ${
                        hoveredProject === project.title
                          ? "animate-pulse scale-110"
                          : ""
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="p-5">
                    <h4 className="font-space-grotesk font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="text-xs">
                                +{project.tech.length - 3}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {project.tech.slice(3).join(", ")}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {project.liveUrl !== "#" ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <GradientButton size="sm" className="w-full text-xs">
                            <ExternalLink className="w-3 h-3" />
                            <span>Demo</span>
                          </GradientButton>
                        </a>
                      ) : (
                        <GradientButton size="sm" className="w-full text-xs" disabled>
                          <ExternalLink className="w-3 h-3" />
                          <span>Demo</span>
                        </GradientButton>
                      )}
                      {project.githubUrl !== "#" ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-primary/30 hover:bg-primary/10 bg-transparent hover-glow"
                          >
                            <Github className="w-3 h-3" />
                          </Button>
                        </a>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary/30 hover:bg-primary/10 bg-transparent hover-glow"
                          disabled
                        >
                          <Github className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Want to see more of my work?</p>
          <a
            href={githubAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-3 rounded-xl bg-transparent hover-lift hover-glow"
            >
              <Github className="w-5 h-5 mr-2" />
              View All on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
