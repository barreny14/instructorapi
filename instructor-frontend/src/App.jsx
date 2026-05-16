import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import InstructorListPage from './pages/InstructorListPage';
import InstructorDetailPage from './pages/InstructorDetailPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './routes/ProtectedRoute';
import InstructorCreatePage from './pages/InstructorCreatePage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/instructors" element={<InstructorListPage />} />
        <Route path="/instructors/:id" element={<InstructorDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/instructors/create" 
          element={
            <ProtectedRoute adminOnly={true}>
              <InstructorCreatePage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/instructors/:id/edit" 
          element={
            <ProtectedRoute adminOnly={true}>
              <div><h1>Edit Instructor Page (Admins Only)</h1></div>
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;