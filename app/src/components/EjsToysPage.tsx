import { ArrowLeft, Gamepad2, Puzzle, Target } from "lucide-react";

interface EjsToysPageProps {
  onBack: () => void;
}

export default function EjsToysPage({ onBack }: EjsToysPageProps) {
  return (
    <div className="min-h-screen bg-pink-primary/30 p-6 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-yellow-100 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-70 pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10vw] right-[-10vw] w-[50vw] h-[50vw] bg-blue-100 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto z-10 h-full w-full py-12">
        <div className="flex justify-center gap-6 mb-8 text-blue-accent opacity-80">
          <Gamepad2 className="w-12 h-12 animate-bounce flex-shrink-0" style={{ animationDelay: '0ms' }} />
          <Puzzle className="w-12 h-12 -translate-y-4 animate-bounce flex-shrink-0" style={{ animationDelay: '200ms' }} />
          <Target className="w-12 h-12 animate-bounce flex-shrink-0" style={{ animationDelay: '400ms' }} />
        </div>
        
        <h1 className="text-6xl md:text-8xl text-blue-accent font-display font-bold drop-shadow-sm mb-6 leading-none">
          EJ's Toys
        </h1>
        
        <div className="bg-white/80 backdrop-blur-xl border-4 border-yellow-300 p-8 md:p-12 rounded-[3rem] shadow-2xl skew-x-[-2deg] rotate-[-1deg] transform transition-transform hover:scale-105">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-4 tracking-tight">
            Coming Soon!
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
            We are working hard to build the most amazing toy box out there. Stay tuned—epic fun is loading! 🚀
          </p>
        </div>
        
        <button 
          onClick={onBack}
          className="mt-16 w-full max-w-sm py-4 bg-blue-accent text-white rounded-full font-bold text-lg shadow-xl uppercase tracking-wider hover:bg-blue-600 hover:-translate-y-1 transition-all"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
