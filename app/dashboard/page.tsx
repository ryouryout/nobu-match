'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase-client';
import Image from 'next/image';

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  images: string[];
  interests: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadProfiles();
  }, []);

  const checkAuth = async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);
  };

  const loadProfiles = async () => {
    // Mock data for demonstration
    const mockProfiles: Profile[] = [
      {
        id: '1',
        name: '佐藤 美咲',
        age: 28,
        bio: 'カフェ巡りと読書が趣味です。週末は美術館やギャラリーに行くことが多いです。',
        location: '東京',
        images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop'],
        interests: ['カフェ', '読書', 'アート', '料理'],
      },
      {
        id: '2',
        name: '田中 真理子',
        age: 32,
        bio: 'ヨガインストラクターをしています。健康的なライフスタイルを大切にしています。',
        location: '横浜',
        images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop'],
        interests: ['ヨガ', 'オーガニック', '旅行', '瞑想'],
      },
      {
        id: '3',
        name: '高橋 恵子',
        age: 30,
        bio: 'IT企業でプロダクトマネージャーをしています。新しいテクノロジーに興味があります。',
        location: '渋谷',
        images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop'],
        interests: ['テクノロジー', 'スタートアップ', 'ワイン', 'ジャズ'],
      },
    ];
    
    setProfiles(mockProfiles);
    setIsLoading(false);
  };

  const handleLike = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nobu-gold"></div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-nobu-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-nobu-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-display text-2xl font-bold">NOBU Match</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-nobu-gray-600 hover:text-nobu-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <Link href="/matches" className="text-nobu-gray-600 hover:text-nobu-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <Link href="/messages" className="text-nobu-gray-600 hover:text-nobu-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
            <Link href="/profile" className="text-nobu-gray-600 hover:text-nobu-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <button onClick={handleLogout} className="text-nobu-gray-600 hover:text-nobu-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-6 py-8">
        {currentProfile ? (
          <div className="relative">
            <div className="card-premium overflow-hidden">
              <div className="relative h-[600px]">
                <Image
                  src={currentProfile.images[0]}
                  alt={currentProfile.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="font-display text-3xl font-bold mb-1">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <p className="text-sm mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {currentProfile.location}
                  </p>
                  <p className="text-sm mb-4">{currentProfile.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handlePass}
                className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <button
                onClick={handleLike}
                className="w-20 h-20 bg-gradient-gold rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-pulse-gold"
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              
              <button className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-gold rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">新しいプロフィールがありません</h3>
            <p className="text-nobu-gray-600 mb-6">後でもう一度確認してください</p>
            <button className="btn-primary">検索条件を変更</button>
          </div>
        )}
      </div>
    </div>
  );
}