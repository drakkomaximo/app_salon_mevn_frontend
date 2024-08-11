import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppointmentsLayout from "@/views/appointments/AppointmentsLayout.vue";
import AuthApi from "@/api/AuthApi";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/AdminView.vue"),
      meta: { requiresAdmin: true },
      children: [
        {
          path: "",
          name: "admin-appointments",
          component: () => import("@/views/admin/AppointmentsAdminView.vue"),
        },
      ],
    },
    {
      path: "/reservations",
      name: "appointments",
      component: AppointmentsLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "my-appointments",
          component: () => import("@/views/appointments/MyAppointments.vue"),
        },
        {
          path: "new",
          component: () =>
            import("@/views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "appointments-new",
              component: () => import("@/views/appointments/ServicesVue.vue"),
            },
            {
              path: "details",
              name: "appointments-details",
              component: () =>
                import("@/views/appointments/AppointmentView.vue"),
            },
          ],
        },
        {
          path: ":id/edit",
          component: () =>
            import("@/views/appointments/EditAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "appointments-edit",
              component: () => import("@/views/appointments/ServicesVue.vue"),
            },
            {
              path: "details",
              name: "appointments-details-edit",
              component: () =>
                import("@/views/appointments/AppointmentView.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/auth/AuthLayout.vue"),
      children: [
        {
          path: "register",
          name: "register",
          component: () => import("@/views/auth/RegisterView.vue"),
        },
        {
          path: "confirm-account/:token",
          name: "confirm-account",
          component: () => import("@/views/auth/ConfirmAccountView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/auth/LoginView.vue"),
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: () => import("@/views/auth/ForgotPassword.vue"),
        },
        {
          path: "forgot-password/:token",
          name: "reset-password",
          component: () => import("@/views/auth/NewPassword.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    try {
      const { data } = await AuthApi.auth();
      if (data.user.admin) {
        next({ name: "admin" });
      } else {
        next();
      }
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, _from, next) => {
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  if (requiresAdmin) {
    try {
      await AuthApi.admin();
      next();
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
