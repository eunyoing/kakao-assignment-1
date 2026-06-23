"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className='max-w-xl mx-auto mt-10 p-4 text-center'>
      <p className='text-red-500 mb-4'>오류가 발생했어요: {error.message}</p>
      <button
        onClick={reset}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        다시 시도
      </button>
    </main>
  );
}
