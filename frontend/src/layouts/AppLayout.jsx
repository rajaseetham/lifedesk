import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { QuickAddModal } from '../components/QuickAddModal';
import { GlobalSearchModal } from '../components/GlobalSearchModal';
import { useData } from '../context/DataContext';

export const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isQuickAddOpen, setIsQuickAddOpen, quickAddDefaultTab, isSearchOpen, setIsSearchOpen } = useData();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex transition-colors">
      
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header setIsMobileOpen={setIsMobileOpen} />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Modals */}
      <QuickAddModal 
        isOpen={isQuickAddOpen} 
        onClose={() => setIsQuickAddOpen(false)} 
        defaultTab={quickAddDefaultTab}
      />

      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

    </div>
  );
};
