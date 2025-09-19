"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socialLinks = [
  { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "https://github.com/viet" },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/viet" },
  { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com/viet" },
  { name: "Email", icon: <Mail className="w-5 h-5" />, url: "mailto:viet@example.com" },
]

export function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/2 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-8">
          <p className="text-sm text-muted-foreground">© 2025 Việt • Built with React & Next.js</p>
        </div>
      </div>
    </footer>
  )
}
