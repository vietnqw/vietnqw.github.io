"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />

      {/* Animated Particles */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold mb-6 text-balance animate-slide-in-up">
            Hi, I'm <span className="text-primary animate-glow">Viet</span> 👋
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
          <Button
            size="lg"
            /* Made gradient fading more subtle from 80% to 90% opacity */
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 hover-lift"
            onClick={() => scrollToSection("projects")}
          >
            View My Projects
          </Button>

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
