"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Heart, Moon, Sun, Zap } from "lucide-react"
import { useTheme } from "next-themes"

const socialLinks = [
  { name: "GitHub", icon: <Github className="w-4 h-4" />, url: "https://github.com/viet" },
  { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com/in/viet" },
  { name: "Twitter", icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com/viet" },
  { name: "Email", icon: <Mail className="w-4 h-4" />, url: "mailto:viet@example.com" },
]

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  const { theme, setTheme } = useTheme()
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1)
    if (clickCount + 1 >= 5) {
      setShowEasterEgg(true)
      setTimeout(() => {
        setShowEasterEgg(false)
        setClickCount(0)
      }, 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-16 px-4 border-t border-primary/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg cursor-pointer transition-transform hover:scale-110"
                onClick={handleLogoClick}
              >
                V
              </div>
              <div>
                <h3 className="font-space-grotesk font-bold text-lg">Viet</h3>
                <p className="text-sm text-muted-foreground">AI Engineer & Tech Explorer</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Building intelligent systems and exploring the intersection of AI and web technologies. Always excited
              about new challenges and innovative solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass border border-primary/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover:scale-110"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-space-grotesk font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle & Info */}
          <div>
            <h4 className="font-space-grotesk font-bold mb-4">Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="border-primary/30 hover:bg-primary/10 bg-transparent"
                >
                  {mounted ? (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />) : null}
                  <span className="ml-2 text-xs">{mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}</span>
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="border-primary/30 hover:bg-primary/10 bg-transparent w-full"
              >
                Back to Top
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 Viet. Built with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>using React + Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Powered by</span>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-primary" />
              <span>Next.js</span>
            </div>
          </div>
        </div>

        {/* Easter Egg Animation */}
        {showEasterEgg && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="animate-bounce">
              <div className="text-6xl animate-spin">🚀</div>
              <p className="text-center mt-4 font-space-grotesk font-bold text-primary animate-pulse">
                You found the secret! 🎉
              </p>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
