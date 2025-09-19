"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Twitter, Send, MapPin, Clock } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    url: "https://github.com/viet",
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    url: "https://linkedin.com/in/viet",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-5 h-5" />,
    url: "https://twitter.com/viet",
    color: "hover:text-sky-400",
  },
  {
    name: "Email",
    icon: <Mail className="w-5 h-5" />,
    url: "mailto:viet@example.com",
    color: "hover:text-green-400",
  },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-6 text-balance">Let's Connect</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="animate-on-scroll">
            <Card className="p-8 glass border-primary/20 hover-glow">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
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
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
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
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
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

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover-lift ${
                    isSubmitted
                      ? "bg-green-500 hover:bg-green-500 text-white"
                      : "bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90"
                  }`}
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
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>

                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center animate-fade-in">
                    Thanks for reaching out! I'll get back to you soon.
                  </div>
                )}
              </form>
            </Card>
          </div>
          <div className="mt-16 text-center animate-on-scroll">
            <h4 className="font-space-grotesk font-semibold mb-6 text-sm uppercase tracking-wider">
              Or connect with me on
            </h4>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`p-3 rounded-xl glass border border-primary/10 text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-primary/30 hover-lift ${link.color}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
