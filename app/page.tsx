'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Sparkles, ChevronDown, Star, Check } from 'lucide-react';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Shield,
      title: '厳正な審査',
      description: '全メンバーの身元確認と独自の審査基準により、質の高い出会いを保証します。',
    },
    {
      icon: Heart,
      title: 'AIマッチング',
      description: '高度なAIアルゴリズムが、あなたに最適なパートナーを提案します。',
    },
    {
      icon: Users,
      title: 'エクスクルーシブ',
      description: '厳選されたメンバーのみが参加できる、プレミアムなコミュニティ。',
    },
  ];

  const plans = [
    {
      name: 'スタンダード',
      price: '¥9,800',
      features: [
        '月間30いいね',
        'AIマッチング',
        'メッセージ無制限',
        'プロフィール閲覧',
      ],
    },
    {
      name: 'プレミアム',
      price: '¥19,800',
      popular: true,
      features: [
        '月間100いいね',
        '高度なAIマッチング',
        'メッセージ無制限',
        'プロフィール閲覧',
        'ブースト機能',
        '既読確認',
      ],
    },
    {
      name: 'エグゼクティブ',
      price: '¥39,800',
      features: [
        'いいね無制限',
        'VIP AIマッチング',
        'メッセージ無制限',
        'プロフィール閲覧',
        'ブースト機能',
        '既読確認',
        'コンシェルジュサポート',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-display">N</span>
              </div>
              <span className="text-2xl font-display font-bold">NOBU Match</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
                特徴
              </Link>
              <Link href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors">
                料金プラン
              </Link>
              <Link href="#testimonials" className="text-foreground/70 hover:text-foreground transition-colors">
                成功事例
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button variant="premium" asChild>
                <Link href="/register">無料で始める</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="Premium dating"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              大人のための
              <span className="block gradient-text">プレミアムな出会い</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              厳選されたメンバーと、本物の関係を。
              <br />
              NOBU Matchで、人生を変える出会いを見つけましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="premium" className="text-lg" asChild>
                <Link href="/register">
                  <Sparkles className="mr-2 h-5 w-5" />
                  今すぐ始める
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link href="#features">詳しく見る</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              なぜ<span className="gradient-text">NOBU Match</span>が選ばれるのか
            </h2>
            <p className="text-xl text-muted-foreground">
              他にはない、プレミアムな体験をお約束します
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-0 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 gradient-gold rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-glow">
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-bold gradient-text mb-2">95%</h3>
              <p className="text-xl text-muted-foreground">マッチング成功率</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-bold gradient-text mb-2">50,000+</h3>
              <p className="text-xl text-muted-foreground">アクティブメンバー</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-bold gradient-text mb-2">4.9★</h3>
              <p className="text-xl text-muted-foreground">ユーザー満足度</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              あなたに合った<span className="gradient-text">プラン</span>を選ぶ
            </h2>
            <p className="text-xl text-muted-foreground">
              すべてのプランに30日間の返金保証付き
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={plan.popular ? 'md:-mt-4 md:mb-4' : ''}
              >
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-2xl' : 'border-border'}`}>
                  {plan.popular && (
                    <div className="gradient-gold text-white text-center py-2 text-sm font-semibold">
                      最も人気
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/月</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.popular ? 'premium' : 'outline'}
                      className="w-full"
                      asChild
                    >
                      <Link href="/register">プランを選択</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              幸せの<span className="gradient-text">声</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              NOBU Matchで素敵な出会いを見つけた方々
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">
                    &ldquo;NOBU Matchのおかげで、理想のパートナーと出会えました。
                    質の高いメンバーが多く、真剣な出会いを求める方にぴったりです。&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 gradient-gold rounded-full mr-4" />
                    <div>
                      <p className="font-semibold">田中 美穂 & 山田 健太</p>
                      <p className="text-sm text-muted-foreground">2023年12月に結婚</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">
                    &ldquo;AIマッチングの精度が素晴らしく、価値観の合う方と出会えました。
                    サポート体制も充実していて、安心して利用できました。&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 gradient-gold rounded-full mr-4" />
                    <div>
                      <p className="font-semibold">佐藤 真一 & 鈴木 花子</p>
                      <p className="text-sm text-muted-foreground">2024年3月に婚約</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div className="gradient-gold rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                今すぐ始めましょう
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                あなたの理想のパートナーが待っています。
                まずは無料で登録して、プレミアムな出会いを体験してください。
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg shadow-xl" asChild>
                <Link href="/register">
                  <Heart className="mr-2 h-5 w-5" />
                  無料で登録する
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold font-display">N</span>
                </div>
                <span className="text-xl font-display font-bold">NOBU Match</span>
              </div>
              <p className="text-sm text-muted">
                大人のためのプレミアムマッチングサイト
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">会社情報</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/about" className="hover:text-background transition-colors">会社概要</Link></li>
                <li><Link href="/careers" className="hover:text-background transition-colors">採用情報</Link></li>
                <li><Link href="/press" className="hover:text-background transition-colors">プレスリリース</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/help" className="hover:text-background transition-colors">ヘルプセンター</Link></li>
                <li><Link href="/safety" className="hover:text-background transition-colors">安全性について</Link></li>
                <li><Link href="/contact" className="hover:text-background transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">法的情報</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/terms" className="hover:text-background transition-colors">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-background transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/law" className="hover:text-background transition-colors">特定商取引法</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-muted pt-8 text-center text-sm text-muted">
            <p>&copy; 2024 NOBU Match. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}