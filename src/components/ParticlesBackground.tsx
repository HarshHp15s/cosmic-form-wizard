
import React, { useEffect, useRef } from 'react'

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Particle settings
    const particleCount = 100
    const particles: Particle[] = []
    
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        
        // Choose from futuristic colors
        const colors = ['#9b87f5', '#1EAEDB', '#ff61d8', '#33C3F0']
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alpha = Math.random() * 0.8 + 0.2
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }
      
      draw() {
        if (!ctx) return
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw and update each particle
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Draw connections between close particles
      drawConnections()
      
      requestAnimationFrame(animate)
    }
    
    // Draw lines between particles that are close to each other
    const drawConnections = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = '#9b87f533'
            ctx.lineWidth = 0.2
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1]"
    />
  )
}

export default ParticlesBackground
