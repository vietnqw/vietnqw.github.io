"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import content from "@/data/footer.json"

// Note: Social links are defined in the JSON but not used in the current design.
// They are parsed here in case a future design iteration re-adds them.
const socialLinks = content.socials.map((link) => {
  let iconComponent = null
  switch (link.icon) {
    case "Github":
      iconComponent = <Github className="w-5 h-5" />
      break
    case "Linkedin":
      iconComponent = <Linkedin className="w-5 h-5" />
      break
    case "Twitter":
      iconComponent = <Twitter className="w-5 h-5" />
      break
    case "Mail":
      iconComponent = <Mail className="w-5 h-5" />
      break
  }
  return { ...link, icon: iconComponent }
})

export function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/2 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-8">
          <p className="text-sm text-muted-foreground">
            © 2025 Việt • Built with React & Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
