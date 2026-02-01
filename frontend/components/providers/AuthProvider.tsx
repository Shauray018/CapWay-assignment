'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const PUBLIC_ROUTES = ['/login', '/register'];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (!isAuthenticated && !token && !isPublicRoute) {
      // User is not authenticated and trying to access protected route
      router.push('/login');
    } else if (isAuthenticated && token && isPublicRoute) {
      // User is authenticated and trying to access login/register
      router.push('/');
    }
  }, [isAuthenticated, token, pathname, router]);

  return <>{children}</>;
}