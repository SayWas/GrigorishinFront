import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import CourseView from '@/views/CourseView.vue'
import LibraryView from '@/views/LibraryView.vue'
import AccountView from '@/views/AccountView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import AboutView from '@/views/AboutView.vue'
import PolicyView from '@/views/PolicyView.vue'
import CartView from '@/views/CartView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import PersonalInfo from '@/components/account/PersonalInfo.vue'
import CoursesInfo from '@/components/account/CoursesInfo.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { requiresAuth: false }
    },
    {
      path: '/policy',
      name: 'policy',
      component: PolicyView,
      meta: { requiresAuth: false }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { requiresAuth: false }
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
      meta: { requiresAuth: false }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
      meta: { requiresAuth: false }
    },
    {
      path: '/courses/:id(\\d+)',
      name: 'course',
      component: CourseView,
      meta: { requiresAuth: false }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: PersonalInfo
        },
        {
          path: 'courses',
          name: 'courses',
          component: CoursesInfo
        }
      ],
      beforeEnter: (to, from, next) => {
        if (to.name === 'account') {
          next({ name: 'profile' })
        } else {
          next()
        }
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  // if page needs log in and user is not logged in or user is logged in but token is expired
  if ((to.meta.requiresAuth && userStore.currentUser === undefined) || (userStore.currentUser !== undefined && !document.cookie.includes('user-token'))) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
  // if user is not logged in but token is present in cookies (user opening new tab)
  if (userStore.currentUser === undefined && document.cookie.includes('user-token')) {
    try {
      const userStore = useUserStore()
      await userStore.getCurrentUser()
    } catch (error) {
      console.error(error)
    }
  }
})

export default router