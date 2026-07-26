"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const scheduleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.coerce.number().int().positive('Duration must be a positive number'),
}).refine((data) => {
  const scheduledTime = new Date(`${data.date}T${data.time}`);
  return scheduledTime > new Date();
}, {
  message: "Scheduled time must be in the future",
  path: ["time"], // Attach the error to the time field
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduled: () => void;
}

export function ScheduleMeetingModal({ isOpen, onClose, onScheduled }: ScheduleMeetingModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      duration: 30
    }
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    setSuccess(false);
    setServerError(null);
    onClose();
  };

  const onSubmit = async (data: ScheduleFormData) => {
    setServerError(null);
    setSuccess(false);
    try {
      const scheduled_time = new Date(`${data.date}T${data.time}`).toISOString();
      
      await api.post('/meetings/schedule', {
        title: data.title,
        description: data.description || "",
        scheduled_time,
        duration: data.duration,
        host_id: 1 // Hardcoded for now since auth isn't implemented
      });
      
      setSuccess(true);
      onScheduled(); // Trigger parent refresh
      
      // Close automatically after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
      
    } catch (error: any) {
      setServerError(error.response?.data?.detail || 'Failed to schedule meeting. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative my-auto">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Schedule Meeting</h2>
          
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {serverError}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Meeting scheduled successfully!
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Project Sync"
                {...register('title')}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Weekly team sync"
                {...register('description')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  {...register('date')}
                  className={errors.date ? "border-red-500" : ""}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  {...register('time')}
                  className={errors.time ? "border-red-500" : ""}
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                {...register('duration')}
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={isSubmitting || success}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
