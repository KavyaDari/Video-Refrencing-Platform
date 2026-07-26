import React from 'react';
import { MicOff, Mic } from 'lucide-react';

interface VideoTileProps {
  name: string;
  isMuted?: boolean;
  isActiveSpeaker?: boolean;
  colorClass?: string;
}

export function VideoTile({ name, isMuted = false, isActiveSpeaker = false, colorClass = "bg-zinc-800" }: VideoTileProps) {
  return (
    <div className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${isActiveSpeaker ? 'ring-4 ring-blue-500' : 'ring-1 ring-zinc-800'} ${colorClass}`}>
      {/* Mock Video Feed Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80">
        <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center text-4xl font-bold text-zinc-300 mb-4 shadow-inner">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
      
      {/* Lower Left Name Tag */}
      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2">
        {isMuted ? (
          <MicOff className="w-3.5 h-3.5 text-red-500" />
        ) : (
          <Mic className="w-3.5 h-3.5 text-green-500" />
        )}
        <span className="text-white text-xs font-medium tracking-wide">{name}</span>
      </div>
    </div>
  );
}
