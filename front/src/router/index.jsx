import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import AppLayout from '@/components/layout/AppLayout';

export const router = createBrowserRouter([
    {path: '/', element: <LoginPage />},
    {
      element: <AppLayout />, //Header를 포함한 레이아웃
      children: [
        {path: '/dashboard', element: <DashboardPage />},
        // 로그인 후  페이지는 여기에 추가 예정
      ],  
    },
    
])