import SignIn from '../pages/auth/SignIn.vue';
import SignUp from '../pages/auth/SignUp.vue';
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
      path: '/profile/:nickname',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
};
