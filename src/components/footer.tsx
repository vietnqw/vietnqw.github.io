"use client"

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
