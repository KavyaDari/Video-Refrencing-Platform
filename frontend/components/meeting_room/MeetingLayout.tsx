import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Toolbar } from './Toolbar';
import { VideoTile } from './VideoTile';
import { ParticipantsSidebar } from './ParticipantsSidebar';
import { useRouter } from 'next/navigation';

interface MeetingLayoutProps {
  meetingId: string;
  currentUserName: string;
}

export function MeetingLayout({ meetingId, currentUserName }: MeetingLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const router = useRouter();

  const handleEndMeeting = async () => {
    if (window.confirm("Are you sure you want to end the meeting?")) {
      setIsEnding(true);
      try {
        // Any cleanup or API calls would go here
        // e.g. await api.post(`/meetings/${meetingId}/leave`);
      } catch (error) {
        console.error("Failed to end meeting properly", error);
      } finally {
        router.push('/dashboard');
      }
    }
  };

  // Mock participants
  const participants = [
    { id: '1', name: currentUserName, role: 'host', isMuted: false },
    { id: '2', name: 'Alice Smith', role: 'attendee', isMuted: true },
    { id: '3', name: 'Bob Johnson', role: 'attendee', isMuted: true },
  ];

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden font-sans">
      <div className="flex-1 flex relative overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 relative flex flex-col p-4 gap-4 bg-zinc-950">
          <TopBar meetingId={meetingId} />
          
          {/* Grid Layout for Videos */}
          <div className="flex-1 mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-8 max-w-7xl mx-auto w-full">
            <VideoTile 
              name={currentUserName} 
              isActiveSpeaker={true} 
              colorClass="bg-zinc-800"
            />
            <VideoTile 
              name="Alice Smith" 
              isMuted={true} 
              colorClass="bg-zinc-800"
            />
            <VideoTile 
              name="Bob Johnson" 
              isMuted={true} 
              colorClass="bg-zinc-800"
            />
            {/* Empty slot placeholder for grid symmetry */}
            <div className="w-full h-full rounded-xl border-2 border-dashed border-zinc-800 flex items-center justify-center text-zinc-700">
              Waiting for others...
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <ParticipantsSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          participants={participants}
        />
      </div>

      {/* Bottom Toolbar */}
      <Toolbar 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        onEndMeeting={handleEndMeeting}
        isEnding={isEnding}
      />
    </div>
  );
}
