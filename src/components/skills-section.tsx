"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Terminal, Layers } from "lucide-react"
import content from "@/data/skills.json"

const { skillCategories } = content

const icons: { [key: string]: React.ReactNode } = {
  Code2: <Code2 className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
}

const levelConfig = {
  beginner: {
    label: "Beginner",
    color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    width: "w-1/6",
    gradient: "from-gray-500 to-gray-400",
  },
  exploring: {
    label: "Exploring",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    width: "w-2/6",
    gradient: "from-purple-500 to-purple-400",
  },
  proficient: {
    label: "Proficient",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    width: "w-3/6",
    gradient: "from-blue-500 to-blue-400",
  },
  fluent: {
    label: "Fluent",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    width: "w-4/6",
    gradient: "from-green-500 to-green-400",
  },
  advanced: {
    label: "Advanced",
    color: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    width: "w-5/6",
    gradient: "from-teal-500 to-teal-400",
  },
  expert: {
    label: "Expert",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    width: "w-full",
    gradient: "from-yellow-500 to-yellow-400",
  },
}

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-12 px-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(59,130,246,0.3)_1px,_transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-6 text-balance">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Only 3 tabs: Languages, Frameworks, Tools */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.slice(0, 3).map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="p-6 glass border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover-lift hover-glow animate-on-scroll"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary animate-pulse-glow">
                  {icons[category.icon]}
                </div>
                <h3 className="font-space-grotesk font-bold text-lg">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group cursor-pointer"
                    onMouseEnter={() =>
                      setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                    }
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg transition-transform duration-300 group-hover:scale-125">
                          {skill.icon}
                        </span>
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r transition-all duration-500 ${
                            levelConfig[skill.level as keyof typeof levelConfig]
                              ?.gradient
                          } ${
                            levelConfig[skill.level as keyof typeof levelConfig]
                              ?.width
                          } ${
                            hoveredSkill === `${categoryIndex}-${skillIndex}`
                              ? "animate-shimmer"
                              : ""
                          }`}
                        />
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs transition-all duration-300 ${
                          levelConfig[skill.level as keyof typeof levelConfig]
                            ?.color
                        } ${
                          hoveredSkill === `${categoryIndex}-${skillIndex}`
                            ? "scale-110"
                            : ""
                        }`}
                      >
                        {
                          levelConfig[skill.level as keyof typeof levelConfig]
                            ?.label
                        }
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <div className="mt-16 text-center animate-on-scroll">
          <h3 className="font-space-grotesk text-2xl font-bold mb-8">
            Also Familiar With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {content.additionalSkills.skills.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tech.icon} {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
