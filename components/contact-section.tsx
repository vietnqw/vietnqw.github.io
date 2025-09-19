"use client"

import { Calendar } from "@/components/ui/calendar"
import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Twitter, Send, Coffee, MapPin, Clock, CalendarDays } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="w-6 h-6" />,
    url: "https://github.com/viet",
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    url: "https://linkedin.com/in/viet",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-6 h-6" />,
    url: "https://twitter.com/viet",
    color: "hover:text-sky-400",
  },
  {
    name: "Email",
    icon: <Mail className="w-6 h-6" />,
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
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

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

  const handleCalendarSchedule = () => {
    if (selectedDate) {
      // In a real app, this would integrate with a calendar service like Calendly
      alert(`Great! Let's schedule a call for ${selectedDate.toDateString()}. I'll send you a calendar invite soon!`)
      setShowCalendar(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-6 text-balance">
            Let's Build Something Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Always open to collaborations, new ideas, or even coffee chats. Drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8 animate-on-scroll">
            <div>
              <h3 className="font-space-grotesk text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm currently open to new opportunities and interesting projects. Whether you have a question, want to
                collaborate, or just want to say hi, I'd love to hear from you!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {[
                { icon: <MapPin className="w-5 h-5" />, title: "Location", desc: "Available for remote work" },
                { icon: <Clock className="w-5 h-5" />, title: "Response Time", desc: "Usually within 24 hours" },
                { icon: <Coffee className="w-5 h-5" />, title: "Coffee Chat", desc: "Always up for a virtual coffee!" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg glass border border-primary/10 hover-lift hover-glow animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary animate-pulse-glow">{item.icon}</div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-space-grotesk font-bold mb-4">Connect with me</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg glass border border-primary/10 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover-lift animate-scale-in ${link.color}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 glass border-primary/20 hover-glow animate-on-scroll animate-delay-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
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
                    className="bg-background/50 border-primary/20 focus:border-primary/50 transition-all duration-300 hover-glow"
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
                    className="bg-background/50 border-primary/20 focus:border-primary/50 transition-all duration-300 hover-glow"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-background/50 border-primary/20 focus:border-primary/50 transition-all duration-300 resize-none hover-glow"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover-lift ${
                  isSubmitted
                    ? "bg-green-500 hover:bg-green-500 text-white"
                    : "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : isSubmitted ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    Message Sent!
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>

            {isSubmitted && (
              <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center animate-fade-in">
                Thanks for reaching out! I'll get back to you soon.
              </div>
            )}
          </Card>
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16 p-8 rounded-2xl glass border border-primary/10 hover-lift hover-glow animate-on-scroll">
          <h3 className="font-space-grotesk text-xl font-bold mb-4">Prefer a quick chat?</h3>
          <p className="text-muted-foreground mb-6">
            Sometimes a conversation is worth a thousand emails. Let's schedule a call!
          </p>

          {!showCalendar ? (
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-3 rounded-xl bg-transparent hover-lift hover-glow"
              onClick={() => setShowCalendar(true)}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Schedule a Call
            </Button>
          ) : (
            <div className="max-w-md mx-auto animate-scale-in">
              <Card className="p-6 glass border-primary/20 hover-glow">
                <h4 className="font-space-grotesk font-semibold mb-4">Pick a date for our call</h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border border-primary/20"
                />
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleCalendarSchedule}
                    disabled={!selectedDate}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover-lift"
                  >
                    Confirm Date
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCalendar(false)}
                    className="border-primary/50 text-primary hover:bg-primary/10 hover-glow"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
