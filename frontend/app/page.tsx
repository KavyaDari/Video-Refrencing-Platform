"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (user) return null; // Prevent flash before redirect

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
            <Video className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Zoom Clone</h1>
        <p className="text-lg text-gray-500 mb-8">Video conferencing, simplified.</p>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all hover:shadow-lg">
              Sign In
            </Button>
          </Link>
          <Link href="/signup" className="block">
            <Button variant="outline" className="w-full text-lg py-6 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all">
              Create an Account
            </Button>
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-gray-400">
          Built for production with Next.js & FastAPI.
        </p>
      </div>
    </div>
  );
}
