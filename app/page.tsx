import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { NavigationOutline } from "@/components/navigation-outline"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
      <NavigationOutline />
      <ScrollAnimations />
    </main>
  )
}
