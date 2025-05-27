'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSupabase } from '@/lib/supabase-client';

const registerSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上である必要があります'),
  confirmPassword: z.string(),
  name: z.string().min(2, '名前は2文字以上である必要があります'),
  age: z.number().min(18, '18歳以上である必要があります').max(100),
  gender: z.enum(['male', 'female', 'other']),
  acceptTerms: z.boolean().refine((val) => val === true, '利用規約に同意する必要があります'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = getSupabase();
      if (!supabase) {
        setError('認証システムの初期化中です');
        return;
      }
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            age: data.age,
            gender: data.gender,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('登録中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nobu-gray-50 to-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <span className="font-display text-3xl font-bold">NOBU Match</span>
          </Link>
          <h1 className="font-display text-4xl font-bold mb-2">新規登録</h1>
          <p className="text-nobu-gray-600">プレミアムな出会いを始めましょう</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-premium p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">メールアドレス</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 border border-nobu-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nobu-gold focus:border-transparent"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">お名前</label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-3 border border-nobu-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nobu-gold focus:border-transparent"
              placeholder="山田 太郎"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">年齢</label>
              <input
                {...register('age', { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-3 border border-nobu-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nobu-gold focus:border-transparent"
                placeholder="25"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">性別</label>
              <select
                {...register('gender')}
                className="w-full px-4 py-3 border border-nobu-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nobu-gold focus:border-transparent"
              >
                <option value="">選択してください</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">パスワード</label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-3 border border-nobu-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nobu-gold focus:border-transparent"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">パスワード（確認）</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="w-full px-4 py-3 border border-nobu-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nobu-gold focus:border-transparent"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-start">
            <input
              {...register('acceptTerms')}
              type="checkbox"
              id="acceptTerms"
              className="mt-1 w-4 h-4 text-nobu-gold border-nobu-gray-300 rounded focus:ring-nobu-gold"
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-nobu-gray-600">
              <Link href="/terms" className="text-nobu-gold hover:underline">利用規約</Link>
              と
              <Link href="/privacy" className="text-nobu-gold hover:underline">プライバシーポリシー</Link>
              に同意します
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '登録中...' : '登録する'}
          </button>

          <p className="text-center text-sm text-nobu-gray-600">
            すでにアカウントをお持ちですか？
            <Link href="/login" className="text-nobu-gold hover:underline ml-1">
              ログイン
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}