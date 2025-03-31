
import FuturisticForm from "@/components/FuturisticForm"
import ParticlesBackground from "@/components/ParticlesBackground"

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center futuristic-gradient p-4">
      <ParticlesBackground />
      
      <div className="w-full max-w-lg animate-float">
        <FuturisticForm />
      </div>
      
      <div className="text-center mt-8 text-white/50 text-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
        <p>© 2023 Galactic Data Systems</p>
        <p className="mt-1">Universal Protocol v3.7.2</p>
      </div>
    </div>
  )
}

export default Index
