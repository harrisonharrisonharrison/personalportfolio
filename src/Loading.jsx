import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';

export default function LoadingScreen({ started, setStarted }) {
  const { progress, total } = useProgress();

  const displayProgress = total === 0 ? 100 : Math.round(progress);
  const isReady = displayProgress === 100;

  useEffect(() => {
    if (isReady) {
      setStarted(true);
    }
  }, [isReady, setStarted]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-red-500 transition-opacity duration-1000 ${
        started ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-4xl font-bold mb-8 font-fraktion-sans tracking-widest">
        INITIALIZING... {displayProgress}%
      </div>
    </div>
  );
}