'use client';

import { usePathname } from 'next/navigation';
import NavBar from '@/components/layout/navbar';

const AUTH_ROUTES = ['/login', '/register'];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!hideNavbar && <NavBar />}
      {children}
    </>
  );
}
