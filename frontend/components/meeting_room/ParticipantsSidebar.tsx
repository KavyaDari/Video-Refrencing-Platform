import React from 'react';
import { X, User, MicOff, Mic, Settings } from 'lucide-react';

interface ParticipantsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  participants: { id: string; name: string; role: string; isMuted: boolean }[];
}

export function ParticipantsSidebar({ isOpen, onClose, participants }: ParticipantsSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute md:relative right-0 z-40 w-full sm:w-80 h-full bg-zinc-900 border-l border-zinc-800 flex flex-col shrink-0 animate-in slide-in-from-right-10 duration-200 shadow-2xl">
      <div className="h-14 flex items-center justify-between px-4 border-b border-zinc-800">
        <h3 className="text-gray-200 font-medium">Participants ({participants.length})</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {participants.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-lg group transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                {p.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-gray-200 text-sm font-medium">{p.name} {p.role === 'host' && '(Host)'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              {p.isMuted ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4 text-green-500" />}
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Settings className="w-4 h-4 hover:text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-zinc-800">
        <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-lg text-sm font-medium transition-colors">
          Mute All
        </button>
      </div>
    </div>
  );
}
