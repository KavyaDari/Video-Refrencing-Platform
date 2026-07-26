"use client";

import React, { useState } from 'react';
import { Video, LogOut, User, Settings as SettingsIcon, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useToast } from '../ui/toast';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    toast("Logged out successfully", "success");
    setIsProfileOpen(false);
    logout();
  };

  const fallback = user?.name ? user.name.substring(0, 2).toUpperCase() : 'U';

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm relative">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Zoom Clone</span>
        </div>
        <div className="flex items-center gap-4 relative">
          <Button variant="ghost" className="text-gray-600 font-medium" onClick={() => setIsSettingsOpen(true)}>
            Settings
          </Button>
          
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
              <Avatar className="cursor-pointer">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`} alt="User" />
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setIsProfileOpen(false)}>
                  <User className="w-4 h-4" /> My Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="px-6 py-8">
              <div className="flex items-center gap-2 mb-6">
                <SettingsIcon className="w-6 h-6 text-gray-900" />
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-medium text-gray-900">Audio Settings</h3>
                  <p className="text-sm text-gray-500 mt-1">Configure your microphone and speaker devices.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-medium text-gray-900">Video Settings</h3>
                  <p className="text-sm text-gray-500 mt-1">Select your camera and adjust video quality.</p>
                </div>
              </div>
              <Button className="w-full mt-6" onClick={() => setIsSettingsOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
