
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { CircleArrowUp, Loader } from 'lucide-react'

const FuturisticForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName || !lastName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }
    
    setLoading(true)
    
    // Create FormData object
    const formData = new FormData()
    formData.append('entry.1832976924', firstName)
    formData.append('entry.335847805', lastName)
    
    // Google Forms URL
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdkCV6rZ-K_pOEeiuYDLCMy8qOnNtdbl2xyC19RQBqexKeKwQ/formResponse'
    
    try {
      // Using a no-cors fetch to submit the form
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      
      // Since we can't actually check the response with no-cors
      // We assume success after a delay
      setTimeout(() => {
        setLoading(false)
        setSubmitted(true)
        toast({
          title: "Success!",
          description: "Your information has been submitted.",
        })
        
        // Reset form after submission
        setFirstName('')
        setLastName('')
      }, 1500)
    } catch (error) {
      setLoading(false)
      toast({
        title: "Error",
        description: "There was a problem submitting your information.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl glow-effect 
      backdrop-blur-md bg-black/40 border border-neon-purple/30 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 relative inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Galactic Registry
          </span>
          <div className="absolute -bottom-2 w-full h-[2px] bg-gradient-to-r from-neon-purple/0 via-neon-purple to-neon-purple/0"></div>
        </h1>
        <p className="text-muted-foreground">Enter your details for universal records</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="relative group animate-fade-in" style={{ animationDelay: '100ms' }}>
            <input
              type="text"
              name="entry.1832976924"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="futuristic-input group-hover:border-neon-purple/70"
              disabled={loading || submitted}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-purple 
              group-hover:w-full transition-all duration-500"></div>
          </div>
          
          <div className="relative group animate-fade-in" style={{ animationDelay: '200ms' }}>
            <input
              type="text"
              name="entry.335847805"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="futuristic-input group-hover:border-neon-purple/70"
              disabled={loading || submitted}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-purple 
              group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
        
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Button 
            type="submit" 
            disabled={loading || submitted}
            className={`relative overflow-hidden w-full py-6 transition-all duration-300
              bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple
              text-white font-medium rounded-md ${loading ? 'animate-pulse' : 'animate-pulse-glow'}`}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : submitted ? (
              <span className="flex items-center gap-2">
                <CircleArrowUp className="w-5 h-5" />
                Transmitted
              </span>
            ) : (
              <span className="flex items-center">
                Submit Data
              </span>
            )}
            <div className="shimmer absolute inset-0"></div>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FuturisticForm
