'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop',
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nobu-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-nobu-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-display text-2xl font-bold">NOBU Match</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-nobu-gray-600 hover:text-nobu-black transition-colors">
              About
            </Link>
            <Link href="/safety" className="text-nobu-gray-600 hover:text-nobu-black transition-colors">
              Safety
            </Link>
            <Link href="/login" className="btn-secondary text-sm">
              ログイン
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              新規登録
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="space-y-8">
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight">
              大人のための
              <span className="gradient-text block">プレミアム</span>
              マッチング
            </h1>
            <p className="text-xl text-nobu-gray-600 leading-relaxed">
              NOBU Matchは、洗練された大人のための上質な出会いを提供します。
              厳選されたメンバーと、真剣な関係を築きませんか。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-primary text-lg px-10 py-4 text-center">
                無料で始める
              </Link>
              <Link href="/how-it-works" className="btn-secondary text-lg px-10 py-4 text-center">
                使い方を見る
              </Link>
            </div>
          </div>
          
          <div className="relative h-[600px] lg:h-[700px]">
            <div className="absolute inset-0 bg-gradient-gold rounded-3xl opacity-10"></div>
            {heroImages.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={src}
                    alt="Premium dating experience"
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-center mb-16">
            なぜ<span className="gradient-text">NOBU Match</span>が選ばれるのか
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-premium p-8 text-center space-y-4 animate-slide-up">
              <div className="w-20 h-20 bg-gradient-gold rounded-full mx-auto flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold">厳正な審査</h3>
              <p className="text-nobu-gray-600">
                全メンバーの身元確認と独自の審査基準により、
                質の高い出会いを保証します。
              </p>
            </div>

            <div className="card-premium p-8 text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-gradient-gold rounded-full mx-auto flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold">AI マッチング</h3>
              <p className="text-nobu-gray-600">
                高度なAIアルゴリズムが、
                あなたに最適なパートナーを提案します。
              </p>
            </div>

            <div className="card-premium p-8 text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-gold rounded-full mx-auto flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold">完全なプライバシー</h3>
              <p className="text-nobu-gray-600">
                最新のセキュリティ技術で、
                あなたの個人情報を完全に保護します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-nobu-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-center mb-16">
            成功ストーリー
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-premium p-8 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-gold rounded-full"></div>
                <div>
                  <p className="font-bold">田中 美穂 & 山田 健太</p>
                  <p className="text-sm text-nobu-gray-600">2023年12月に結婚</p>
                </div>
              </div>
              <p className="text-nobu-gray-600 italic">
                "NOBU Matchのおかげで、理想のパートナーと出会えました。
                質の高いメンバーが多く、真剣な出会いを求める方にぴったりです。"
              </p>
            </div>

            <div className="card-premium p-8 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-gold rounded-full"></div>
                <div>
                  <p className="font-bold">佐藤 真一 & 鈴木 花子</p>
                  <p className="text-sm text-nobu-gray-600">2024年3月に婚約</p>
                </div>
              </div>
              <p className="text-nobu-gray-600 italic">
                "AIマッチングの精度が素晴らしく、価値観の合う方と出会えました。
                サポート体制も充実していて、安心して利用できました。"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-gold">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            今すぐ始めましょう
          </h2>
          <p className="text-xl text-white/90">
            あなたの理想のパートナーが待っています。
            まずは無料で登録して、プレミアムな出会いを体験してください。
          </p>
          <Link href="/register" className="inline-block bg-white text-nobu-gold font-bold text-lg px-10 py-4 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
            無料で登録する
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nobu-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-display text-xl font-bold">NOBU Match</span>
              </div>
              <p className="text-nobu-gray-400 text-sm">
                大人のためのプレミアムマッチングアプリ
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">会社情報</h4>
              <ul className="space-y-2 text-sm text-nobu-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">会社概要</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">採用情報</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">プレスリリース</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-nobu-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">ヘルプセンター</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">安全性について</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">法的情報</h4>
              <ul className="space-y-2 text-sm text-nobu-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/law" className="hover:text-white transition-colors">特定商取引法</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-nobu-gray-800 pt-8 text-center text-sm text-nobu-gray-400">
            <p>&copy; 2024 NOBU Match. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}