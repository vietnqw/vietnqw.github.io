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
        "fixed right-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-300",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none",
      )}
    >
      <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-full p-2 shadow-lg">
        <div className="flex flex-col gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "group relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-125",
                activeSection === section.id
                  ? "bg-primary shadow-lg shadow-primary/50"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
              aria-label={`Navigate to ${section.label}`}
            >
              {/* Tooltip */}
              <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
