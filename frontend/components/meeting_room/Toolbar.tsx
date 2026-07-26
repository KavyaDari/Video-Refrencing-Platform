import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Users, MessageSquare, MonitorUp, PhoneOff, ChevronUp } from 'lucide-react';

interface ToolbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onEndMeeting: () => void;
  isEnding?: boolean;
}

export function Toolbar({ onToggleSidebar, isSidebarOpen, onEndMeeting, isEnding }: ToolbarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-2 sm:px-6 shrink-0 relative z-20 overflow-x-auto">
      <div className="flex items-center gap-1 sm:gap-2">
        <ToolbarButton 
          icon={isMuted ? MicOff : Mic} 
          label={isMuted ? "Unmute" : "Mute"} 
          isActive={!isMuted}
          isDanger={isMuted}
          onClick={() => setIsMuted(!isMuted)}
          hasMenu
        />
        <ToolbarButton 
          icon={isVideoOff ? VideoOff : Video} 
          label={isVideoOff ? "Start Video" : "Stop Video"} 
          isActive={!isVideoOff}
          isDanger={isVideoOff}
          onClick={() => setIsVideoOff(!isVideoOff)}
          hasMenu
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <ToolbarButton 
          icon={Users} 
          label="Participants" 
          onClick={onToggleSidebar}
          badge="3"
        />
        <ToolbarButton 
          icon={MessageSquare} 
          label="Chat" 
        />
        <ToolbarButton 
          icon={MonitorUp} 
          label="Share" 
          iconColor="text-green-500"
        />
      </div>

      <div className="flex items-center ml-2 sm:ml-0">
        <button 
          onClick={onEndMeeting}
          disabled={isEnding}
          className={`bg-red-600 hover:bg-red-700 text-white px-3 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2 whitespace-nowrap ${isEnding ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <PhoneOff className="w-4 h-4" />
          <span className="hidden sm:inline">{isEnding ? 'Ending...' : 'End'}</span>
        </button>
      </div>
    </div>
  );
}

function ToolbarButton({ 
  icon: Icon, 
  label, 
  isActive = false, 
  isDanger = false, 
  hasMenu = false,
  iconColor,
  badge,
  onClick
}: any) {
  return (
    <div className="flex flex-col items-center gap-1 group relative">
      <button 
        onClick={onClick}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
          isDanger ? 'bg-zinc-800 hover:bg-zinc-700' : 'hover:bg-zinc-800'
        }`}
      >
        <div className="relative">
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor ? iconColor : (isDanger ? 'text-red-500' : 'text-gray-300 group-hover:text-white')}`} />
          {badge && (
            <span className="absolute -top-2 -right-3 bg-blue-600 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
      </button>
      <span className="text-[10px] sm:text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors font-medium hidden sm:block">
        {label}
      </span>
      {hasMenu && (
        <button className="absolute -top-2 right-0 w-4 h-4 bg-zinc-800 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700 hidden sm:flex">
          <ChevronUp className="w-3 h-3 text-gray-400" />
        </button>
      )}
    </div>
  );
}
