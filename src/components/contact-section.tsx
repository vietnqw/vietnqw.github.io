"use client"

import type React from "react"
import { SiGithub, SiLinkedin, SiFacebook } from "react-icons/si"
import { FaEnvelope } from "react-icons/fa"
import content from "@/data/contact.json"

const { socialLinks } = {
  socialLinks: content.socials.links.map((link) => ({
    ...link,
    icon: getIconComponent(link.icon),
  })),
}

function getIconComponent(iconName: string) {
  switch (iconName) {
    case "Github":
      return <SiGithub className="w-6 h-6" />
    case "Linkedin":
      return <SiLinkedin className="w-6 h-6" />
    case "Facebook":
      return <SiFacebook className="w-6 h-6" />
    case "Mail":
      return <FaEnvelope className="w-6 h-6" />
    default:
      return null
  }
}

export function ContactSection() {
  return (
    <section id="contact" className="py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-6 text-balance">
            Let&apos;s Connect
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? <br /> Feel free to reach out
            through any of the platforms below.
          </p>
        </div>

        {/* The contact form is commented out for now
        <div className="space-y-12">
          <div className="animate-on-scroll">
            <Card className="p-8 glass border-primary/20 hover-glow">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50 border-primary/20 focus:border-primary/50 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-background/50 border-primary/20 focus:border-primary/50 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-background/50 border-primary/20 focus:border-primary/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <GradientButton
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : isSubmitted ? (
                    <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      Message Sent!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaPaperPlane className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </GradientButton>

                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center animate-fade-in">
                    Thanks for reaching out! I'll get back to you soon.
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
        */}

        <div className="animate-on-scroll animate-delay-200">
          <div className="flex justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className={`p-4 rounded-xl glass border border-primary/10 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/30 hover-lift ${link.color}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
