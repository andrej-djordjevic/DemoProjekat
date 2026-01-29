import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from './auth.store';

export const ProtectedLayout = observer(() => {
  if (!authStore.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
});
