import SignIn from '../pages/auth/SignIn.vue';
import ConfirmPage from '../pages/auth/ConfirmPage.vue';
import SignUp from '../pages/auth/SignUp.vue';
import ResetPassword from '../pages/auth/ResetPassword.vue';
import ForgotPassword from '../pages/auth/ForgotPassword.vue';
import NotFound from '../pages/error/NotFound.vue';
import Profile from '../pages/user/Profile.vue';

export default {
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/activate/:code',
      name: 'ConfirmPage',
      component: ConfirmPage,
    },
    {
      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/reset_password/:code',
      name: 'ResetPassword',
      component: ResetPassword,
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
};
