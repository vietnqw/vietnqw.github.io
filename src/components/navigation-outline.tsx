"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

export function NavigationOutline() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past hero section
      setIsVisible(window.scrollY > 100)

      // Update active section based on scroll position
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      let newActiveSection: string | null = null

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        newActiveSection = currentSection.id
      }

      // Special case for the last section when at the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
      if (isBottom) {
        newActiveSection = sections[sections.length - 1].id
      }

      if (newActiveSection) {
        setActiveSection(newActiveSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed right-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none",
      )}
    >
      <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-full p-3 shadow-xl">
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <div key={section.id} className="relative flex items-center justify-center">
              {/* Background highlight effect */}
              <div 
                className={cn(
                  "absolute w-3 h-3 bg-primary/10 rounded-full transition-all duration-300 ease-out",
                  hoveredSection === section.id ? "opacity-100 scale-200" : "opacity-0 scale-100"
                )}
              />
              
              <button
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={cn(
                  "relative w-3 h-3 rounded-full transition-all duration-300 ease-out transform z-10 group",
                  activeSection === section.id
                    ? "bg-primary shadow-lg shadow-primary/50 animate-pulse-slow"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
                  hoveredSection === section.id ? "scale-150" : "scale-100",
                  "cursor-pointer"
                )}
                aria-label={`Navigate to ${section.label}`}
                type="button"
              >
                {/* Inner glow for active item */}
                {activeSection === section.id && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                )}
                
                {/* Tooltip with arrow, only visible on hover */}
                {hoveredSection === section.id && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center transition-opacity duration-300 ease-out pointer-events-none opacity-100">
                    <div className="w-2 h-2 bg-background/90 border-t border-r border-border/50 transform rotate-45 -mr-1" />
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border/50 rounded text-xs font-medium text-foreground whitespace-nowrap">
                      {section.label}
                    </span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add custom animation to global CSS */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </nav>
  )
}