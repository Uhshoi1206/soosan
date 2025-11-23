'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Có lỗi xảy ra
        </h2>

        <p className="text-gray-600 mb-6">
          Xin lỗi, đã có lỗi xảy ra khi tải trang. Vui lòng thử lại.
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Thử lại
          </button>

          <Link
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
          >
            Về trang chủ
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Chi tiết lỗi (Development only)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
