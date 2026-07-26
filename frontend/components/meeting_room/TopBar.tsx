import React, { useState, useEffect } from 'react';
import { Shield, Copy, Check } from 'lucide-react';

interface TopBarProps {
  meetingId: string;
}

export function TopBar({ meetingId }: TopBarProps) {
  const [copied, setCopied] = useState(false);
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    // Mock duration timer
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      const m = Math.floor(diff / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      setDuration(`${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-12 bg-black/40 hover:bg-black/80 transition-colors backdrop-blur-sm flex items-center justify-between px-4 z-10">
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-green-500" />
        <span className="text-white font-medium text-sm">Meeting ID: {meetingId}</span>
        <button 
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition p-1 rounded-md"
          title="Copy Invite Link"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="text-gray-300 text-sm font-mono tracking-wider">
        {duration}
      </div>
    </div>
  );
}
