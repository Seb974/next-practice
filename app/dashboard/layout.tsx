'use client'

import { usePathname } from 'next/navigation';
import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children } : { children: React.ReactNode  }) {

  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      { pathname !== "/dashboard/passengers/create" && 
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
       }
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}