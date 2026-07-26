"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { X, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const joinSchema = z.object({
  meeting_id: z.string().min(1, 'Meeting ID is required'),
  participant_name: z.string().min(2, 'Name must be at least 2 characters'),
});

type JoinFormData = z.infer<typeof joinSchema>;

interface JoinMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinMeetingModal({ isOpen, onClose }: JoinMeetingModalProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
  });

  if (!isOpen) return null;

  const onSubmit = async (data: JoinFormData) => {
    setServerError(null);
    try {
      // API call to join meeting
      await api.post('/meetings/join', {
        meeting_id: data.meeting_id,
        participant_name: data.participant_name,
        role: "attendee"
      });
      
      // On success, redirect to meeting room
      router.push(`/meeting/${data.meeting_id}?name=${encodeURIComponent(data.participant_name)}`);
      onClose();
      reset();
    } catch (error: any) {
      if (error.response?.status === 404) {
        setServerError('Meeting not found. Please check the Meeting ID.');
      } else {
        setServerError('Failed to join meeting. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Join Meeting</h2>
          
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meeting_id">Meeting ID</Label>
              <Input
                id="meeting_id"
                placeholder="e.g. 123-456-789"
                {...register('meeting_id')}
                className={errors.meeting_id ? "border-red-500" : ""}
              />
              {errors.meeting_id && (
                <p className="text-red-500 text-xs mt-1">{errors.meeting_id.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="participant_name">Your Name</Label>
              <Input
                id="participant_name"
                placeholder="John Doe"
                {...register('participant_name')}
                className={errors.participant_name ? "border-red-500" : ""}
              />
              {errors.participant_name && (
                <p className="text-red-500 text-xs mt-1">{errors.participant_name.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Join Meeting'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
