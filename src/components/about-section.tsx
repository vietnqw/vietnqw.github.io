"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Coffee,
  Zap,
  GraduationCap,
  Building2,
  BookOpen,
} from "lucide-react"
import content from "@/data/about.json"

const icons: { [key: string]: React.ReactNode } = {
  Zap: <Zap className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
}

export function AboutSection() {
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null)
  const [profilePictureExists, setProfilePictureExists] = useState(false)

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch("/profile-picture.jpeg")
        if (response.ok) {
          setProfilePictureExists(true)
        }
      } catch (error) {
        console.error("Failed to fetch profile picture:", error)
      }
    }

    checkImage()
  }, [])

  const fullJourney = useMemo(() => {
    const workExperience = content.journey.milestones.map((item) => ({
      ...item,
      type: "work",
    }))

    const educationHistory = (content.education || []).map((item) => ({
      year: item.year,
      title: item.degree,
      description: `${item.institution} - ${item.description}`,
      icon: "GraduationCap",
      type: "education",
    }))

    const combined = [...workExperience, ...educationHistory]

    // Sort by the starting year (descending)
    combined.sort((a, b) => {
      const yearA = parseInt(a.year.substring(0, 4), 10)
      const yearB = parseInt(b.year.substring(0, 4), 10)
      return yearB - yearA
    })

    return combined
  }, [])

  return (
    <section id="about" className="py-12 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-6 text-balance">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div>
          {/* Restructured Profile Section */}
          <div className="grid lg:grid-cols-3 gap-12 items-center mb-24 animate-on-scroll">
            {/* Avatar */}
            <div className="lg:col-span-1">
              <div className="relative w-56 h-56 mx-auto">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-glow animate-pulse-glow">
                  {profilePictureExists ? (
                    <Image
                      src="/profile-picture.jpeg"
                      alt="Profile Picture"
                      width={208}
                      height={208}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-52 h-52 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl font-bold text-primary-foreground">
                      V
                    </div>
                  )}
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-float" />
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/30 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                />
              </div>
            </div>

            {/* Bio and Info */}
            <div className="lg:col-span-2 space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {content.bio}
              </p>
              <Card className="glass p-6 border-primary/20 hover-lift hover-glow">
                <div className="flex items-center gap-3 mb-0">
                  <Coffee className="w-5 h-5 text-primary" />
                  <h3 className="font-space-grotesk font-semibold">
                    Fun Fact
                  </h3>
                </div>
                <p className="text-muted-foreground">{content.funFact.text}</p>
              </Card>
              <div className="flex flex-wrap gap-2">
                {content.keyTraits.map((trait, index) => (
                  <Badge
                    key={trait}
                    variant="secondary"
                    className="bg-primary/10 text-primary border border-primary/30 font-medium hover:bg-primary/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Journey Section - Now displayed below the profile */}
          <div className="animate-on-scroll animate-delay-200">
            <div className="text-center mb-12">
              <h3 className="font-space-grotesk text-3xl font-bold mb-4">
                My Journey
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {fullJourney.map((milestone, index) => (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-all duration-300 border-l-4 hover-lift animate-slide-in-right ${
                    hoveredMilestone === index
                      ? "border-l-primary bg-primary/5 scale-105 shadow-lg shadow-primary/10"
                      : "border-l-muted hover:border-l-primary/50 hover:bg-primary/2"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredMilestone(index)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        hoveredMilestone === index
                          ? "bg-primary text-primary-foreground animate-pulse-glow"
                          : "bg-muted"
                      }`}
                    >
                      {icons[milestone.icon]}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-sm font-mono">
                          {milestone.year}
                        </Badge>
                        <h4 className="font-space-grotesk font-semibold">
                          {milestone.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
