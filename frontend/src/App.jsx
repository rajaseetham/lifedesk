import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { CategoryView } from './pages/CategoryView';
import { NotesPage } from './pages/NotesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { CalendarPage } from './pages/CalendarPage';
import { JobTrackerPage } from './pages/JobTrackerPage';
import { LearningPage } from './pages/LearningPage';
import { TagsPage } from './pages/TagsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <HashRouter>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected App Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="category/:categoryName" element={<CategoryView />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="jobs" element={<JobTrackerPage />} />
                <Route path="learning" element={<LearningPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </HashRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

