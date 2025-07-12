'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Heart, Menu, User } from 'lucide-react';
import '../app/globals.css';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  const profileUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.email;

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/healthBroken.svg" alt="Google logo" className="w-10 h-10" />
            <span className="text-xl font-semibold text-gray-700">
              Cards for Mental Health
            </span>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-gray-700 hover:text-pink-600 transition-colors">
              Home
            </a>
            <a href="#cards" className="text-gray-700 hover:text-pink-600 transition-colors">
              Cards
            </a>
            <a href="#resources" className="text-gray-700 hover:text-pink-600 transition-colors">
              Resources
            </a>
            <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">
              Contact
            </a>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-200 transition"
                >
                  {profileUrl ? (
                    <img
                      src={profileUrl}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-pink-400"
                    />
                  ) : (
                    <User className="h-6 w-6 text-pink-500" />
                  )}
                  <span className="text-gray-700 text-sm">{displayName}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-pink-100/30 backdrop-blur-md border border-pink-200 rounded-md shadow-lg z-50">
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-200/50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <img src="/settings.svg" alt="Settings" className="inline-block w-5 h-5 mr-2" />
                      Settings
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-200/50"
                    >
                      <img src="exit.svg" alt="Sign Out" className="inline-block w-5 h-5 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                <User className="h-6 w-6 text-pink-500" />
                <span>Sign In</span>
              </button>
            )}
          </nav>

          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;