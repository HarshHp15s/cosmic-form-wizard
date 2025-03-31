
import FuturisticForm from "@/components/FuturisticForm"
import ThreeDBackground from "@/components/ThreeDBackground"

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center futuristic-gradient p-4">
      <ThreeDBackground />
      
      <div className="w-full max-w-lg animate-float backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-purple-500/30 shadow-lg relative z-10">
        <FuturisticForm />
      </div>
      
      <div className="text-center mt-8 text-white/50 text-sm animate-fade-in z-10" style={{ animationDelay: '400ms' }}>
        <p>© 2023 Galactic Data Systems</p>
        <p className="mt-1">Universal Protocol v3.7.2</p>
      </div>
    </div>
  )
}

export default Index
