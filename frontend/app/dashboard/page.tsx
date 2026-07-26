"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ActionCard } from '../../components/meeting/ActionCard';
import { MeetingSection } from '../../components/meeting/MeetingSection';
import { Meeting } from '../../components/meeting/MeetingCard';
import { JoinMeetingModal } from '../../components/meeting/JoinMeetingModal';
import { ScheduleMeetingModal } from '../../components/meeting/ScheduleMeetingModal';
import { useToast } from '../../components/ui/toast';
import { useAuth } from '../../hooks/useAuth';
import { Video, PlusSquare, Calendar } from 'lucide-react';
import api from '../../services/api';

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  const [upcoming, setUpcoming] = useState<Meeting[]>([]);
  const [recent, setRecent] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const [upcomingRes, recentRes] = await Promise.all([
        api.get('/meetings/upcoming'),
        api.get('/meetings/recent')
      ]);
      setUpcoming(upcomingRes.data);
      setRecent(recentRes.data);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
      if ((error as any).response?.status === 401) {
         router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchMeetings();
    }
  }, [authLoading, user, fetchMeetings, router]);

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;
  }

  const handleNewMeeting = async () => {
    try {
      setIsCreating(true);
      const res = await api.post('/meetings/create', {
        title: "Instant Meeting",
        duration: 60,
        host_id: 1, // Hardcoded for now
        scheduled_time: new Date().toISOString()
      });
      router.push(`/meeting/${res.data.meeting_id}?name=Host`);
    } catch (error) {
      console.error("Failed to create meeting", error);
      toast("Failed to create instant meeting", "error");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          title="New Meeting"
          description={isCreating ? "Creating..." : "Start an instant meeting"}
          icon={Video}
          bgColor="bg-orange-500"
          onClick={handleNewMeeting}
        />
        <ActionCard
          title="Join Meeting"
          description="Join with a code"
          icon={PlusSquare}
          bgColor="bg-blue-600"
          onClick={() => setIsJoinModalOpen(true)}
        />
        <ActionCard
          title="Schedule"
          description="Plan your next meeting"
          icon={Calendar}
          bgColor="bg-purple-600"
          onClick={() => setIsScheduleModalOpen(true)}
        />
      </div>

      <MeetingSection title="Upcoming Meetings" meetings={upcoming} loading={loading} />
      <MeetingSection title="Recent Meetings" meetings={recent} loading={loading} />

      <JoinMeetingModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
      
      <ScheduleMeetingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onScheduled={fetchMeetings}
      />
    </DashboardLayout>
  );
}
