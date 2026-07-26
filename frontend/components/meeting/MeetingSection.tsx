import React from 'react';
import { MeetingCard, Meeting } from './MeetingCard';
import { Skeleton } from '../ui/skeleton';

interface MeetingSectionProps {
  title: string;
  meetings: Meeting[];
  loading: boolean;
}

export function MeetingSection({ title, meetings, loading }: MeetingSectionProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : meetings.length > 0 ? (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No meetings found.</p>
        </div>
      )}
    </div>
  );
}
