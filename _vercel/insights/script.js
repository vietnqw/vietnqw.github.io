// Lightweight stub for Vercel Web Analytics when hosting on GitHub Pages
// Prevents 404s by providing a minimal no-op implementation.
;(function () {
  if (typeof window === 'undefined') return
  if (!('va' in window)) {
    // Queue-style no-op to avoid errors if called
    const queue = []
    function va() {
      queue.push(arguments)
    }
    // Expose on window
    Object.defineProperty(window, 'va', {
      value: va,
      writable: false,
      configurable: false,
    })
  }
})()


