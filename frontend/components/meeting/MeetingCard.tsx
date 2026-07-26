"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Clock, Play } from 'lucide-react';
import { useToast } from '../ui/toast';

export interface Meeting {
  id: string;
  meeting_id: string;
  title: string;
  scheduled_time: string;
  duration: number;
}

export function MeetingCard({ meeting }: { meeting: Meeting }) {
  const router = useRouter();
  const { toast } = useToast();
  const date = new Date(meeting.scheduled_time);
  
  const handleCopy = async () => {
    try {
      const url = `${window.location.origin}/meeting/${meeting.meeting_id}`;
      await navigator.clipboard.writeText(url);
      toast("Meeting link copied to clipboard!", "success");
    } catch (err) {
      toast("Failed to copy link", "error");
    }
  };

  const handleStart = () => {
    router.push(`/meeting/${meeting.meeting_id}?name=Host`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-lg text-gray-900">{meeting.title}</h4>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date.toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span>({meeting.duration} min)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>Copy Link</Button>
          <Button size="sm" className="gap-2" onClick={handleStart}>
            <Play className="w-4 h-4" />
            Start
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
