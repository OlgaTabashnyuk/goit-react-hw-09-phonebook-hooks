import { Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NotFound from './pages/NotFound';
import Container from './components/Container';
import AppBar from './components/AppBar';
import styles from './index.css';
import { authOperations } from './redux/auth';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const Home = lazy(() =>
  import('./pages/Home' /*webpackChunkName: "home-page"*/),
);
const Register = lazy(() =>
  import('./pages/Register' /*webpackChunkName: "register-page"*/),
);
const Login = lazy(() =>
  import('./pages/Login' /*webpackChunkName: "login-page"*/),
);
const Contacts = lazy(() =>
  import('./pages/Contacts' /*webpackChunkName: "contacts-page"*/),
);

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log('Use Effect instead ComponentDidMount');
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <PublicRoute exact path="/">
            <Home />
          </PublicRoute>

          <PublicRoute exact path="/register" redirectTo="/contacts" restricted>
            <Register />
          </PublicRoute>

          <PublicRoute exact path="/login" redirectTo="/contacts" restricted>
            <Login />
          </PublicRoute>

          <PrivateRoute exact path="/contacts" redirectTo="/login">
            <Contacts />
          </PrivateRoute>

          <PublicRoute>
            <NotFound />
          </PublicRoute>
        </Switch>
      </Suspense>
    </Container>
  );
}
