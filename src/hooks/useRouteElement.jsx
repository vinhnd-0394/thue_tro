/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react';
import { useRoutes, Outlet, Navigate } from 'react-router-dom';
import Home from '../pages/public/Home/Home';
import Register from '../pages/public/Register/Register';
import Login from '../pages/public/Login/Login';
import RealEstateDetail from '../pages/public/RealEstateDetail/RealEstateDetail';
import { AppContext } from '../contexts/app.context';
import PaymentHistory from '../pages/user/payment-history/PaymentHistory';
import UpdateRealEstateContainer from '../pages/user/real-estate-manager/update/UpdateRealEstateContainer';
import CreateRealEstateContainer from '../pages/user/real-estate-manager/create/CreateRealEstateContainer';
import ChatContainer from '../pages/user/chats/ChatContainer';
import PrivateChatContainer from '../pages/user/chats/private-chat/PrivateChatContainer';
import AdminRealEstateManager from '../pages/admin/real-estate/AdminRealEstateManager';
import AdminUserManager from '../pages/admin/user/UserManager';
import {
  AdminLayout,
  MainLayout,
  ProfileLayout,
  WrapperLayout,
} from '../layouts';
import RealEstateManager from '../pages/user/real-estate-manager/manager/RealEstateManager';
import Contact from '../pages/user/contacts/Contact';

function ProtectedRoute() {
  const { isAuthenticated, profile } = useContext(AppContext);
  return isAuthenticated && profile.role !== 1 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

function AdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext);
  return isAuthenticated && profile.role === 1 ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <MainLayout>
              <Login />
            </MainLayout>
          ),
        },
        {
          path: '/register',
          element: (
            <MainLayout>
              <Register />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: '/:nameId',
      element: (
        <MainLayout>
          <RealEstateDetail />
        </MainLayout>
      ),
    },
    {
      path: '/user',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <ProfileLayout />,
          children: [
            {
              path: 'real-estates',
              element: <WrapperLayout />,
              children: [
                {
                  path: '',
                  element: <RealEstateManager />,
                },
                {
                  path: 'update/:id',
                  element: <UpdateRealEstateContainer />,
                },
                {
                  path: 'create',
                  element: <CreateRealEstateContainer />,
                },
              ],
            },
            {
              path: 'payment-history',
              element: <PaymentHistory />,
            },
            {
              path: 'chats',
              element: <ChatContainer />,
              children: [
                {
                  path: ':inboxId',
                  element: <PrivateChatContainer />,
                },
              ],
            },
            {
              path: 'request-contact',
              element: <Contact />,
            },
          ],
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminRoute />,
      children: [
        {
          path: '',
          element: <AdminLayout />,
          children: [
            {
              path: 'real-estates',
              element: <WrapperLayout />,
              children: [
                {
                  path: '',
                  element: <AdminRealEstateManager />,
                },
              ],
            },
            {
              path: 'users',
              element: <WrapperLayout />,
              children: [
                {
                  path: '',
                  element: <AdminUserManager />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return routeElements;
}
