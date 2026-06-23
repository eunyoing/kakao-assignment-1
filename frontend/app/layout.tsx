import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "춘식이의 일정",
  description: "춘식이와 함께하는 Todo 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4'>
        <div className='bg-white rounded-2xl shadow-lg w-full max-w-xl p-8'>
          {/* 헤더 */}
          <header className='mb-6'>
            <div className='flex items-center gap-4'>
              <img
                className='w-20 h-20 rounded-full object-cover'
                src='https://t1.daumcdn.net/brunch/service/user/cnoC/image/5mazSO7Ouexw-TZN0tmlrXXUj30.JPG'
                alt='춘식이'
              />
              <div>
                <h1 className='text-4xl font-bold text-gray-900'>
                  춘식이의 일정
                </h1>
                <p className='text-sm text-gray-400'>
                  오늘의 할 일은 무엇일까?🐾
                </p>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
