"use client";

import { useSearchParams } from 'next/navigation';
import { MeetingLayout } from '../../../components/meeting_room/MeetingLayout';

export default function MeetingRoom({ params }: { params: { meeting_id: string } }) {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') || 'Guest';

  return (
    <MeetingLayout 
      meetingId={params.meeting_id} 
      currentUserName={userName} 
    />
  );
}
