import { useProgress } from '@react-three/drei';

export default function LoadingScreen({ started, setStarted }) {
  const { progress, total } = useProgress();

  const displayProgress = total === 0 ? 100 : Math.round(progress);
  const isReady = displayProgress === 100;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-red-500 transition-opacity duration-1000 ${
        started ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-4xl font-bold mb-8 font-fraktion-sans tracking-widest">
        INITIALIZING... {displayProgress}%
      </div>
      
      <button 
        className={`px-8 py-3 border border-red-500 hover:bg-red-500 hover:text-black transition-all duration-300 font-fraktion-sans font-regular cursor-pointer ${
          isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setStarted(true)}
      >
        ENTER
      </button>
    </div>
  );
}