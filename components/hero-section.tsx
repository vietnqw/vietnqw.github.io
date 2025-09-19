"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "AI Engineer | Tech Explorer | Creator"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="hexagonal-tech-background">
        {/* Hexagonal network pattern */}
        <div className="hex-network" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-96 h-96 border border-cyan-500/20 rounded-full animate-spin"
            style={{ animationDuration: "30s" }}
          />
          <div
            className="absolute w-80 h-80 border border-purple-500/15 rounded-full animate-spin"
            style={{ animationDuration: "25s", animationDirection: "reverse" }}
          />
          <div
            className="absolute w-64 h-64 border border-cyan-500/10 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          />
        </div>

        {/* Network connection lines */}
        <div className="network-lines">
          <div className="connection-line" />
          <div className="connection-line" />
          <div className="connection-line" />
          <div className="connection-line" />
        </div>

        {/* Particle network nodes */}
        <div className="particle-network">
          <div className="network-node" />
          <div className="network-node" />
          <div className="network-node" />
          <div className="network-node" />
          <div className="network-node" />
        </div>

        {/* Enhanced scanning beams */}
        <div className="scanning-beam" />
        <div className="scanning-beam" />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-blue-900/10" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold mb-6 text-balance animate-slide-in-up">
            Hi, I'm <span className="text-primary animate-glow">Việt</span> 👋
          </h1>

          <div className="h-16 flex items-center justify-center animate-slide-in-up animate-delay-200">
            <p className="font-space-grotesk text-xl md:text-2xl text-muted-foreground font-medium">
              {displayText}
              <span className="animate-pulse text-primary">|</span>
            </p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in-up animate-delay-400">
          <GradientButton size="lg" onClick={() => scrollToSection("projects")}>
            View My Projects
          </GradientButton>

          <Button
            variant="outline"
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 bg-transparent hover-glow"
            onClick={() => scrollToSection("contact")}
          >
            Get in Touch
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center animate-slide-in-up animate-delay-600">
          <div className="animate-bounce">
            <ChevronDown
              className="w-8 h-8 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
              onClick={() => scrollToSection("about")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
