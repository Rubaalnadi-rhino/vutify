import { RouteRecordRaw } from "vue-router";

const HomeRoutes: Array<RouteRecordRaw> = [
  {
    path: "/add-product",
    name: "add-product",
    component: () => import("/src/components/AddProduct.vue"),
    meta: {
      title: 'Add product',
      metaTags: [
        {
          name: 'Add product',
          content: 'The  page of add product.'
        },
        {
          property: 'og:add product',
          content: 'The  page of our add product.'
        }
      ],
      requiredAuth : true
    }
  },
  {
    path: "/",
    name: "Show Product",
    component: () => import("/src/components/ShowProduct.vue"),
    meta: {
      title: 'Show product',
      metaTags: [
        {
          name: 'Show product',
          content: 'The h page of show product.'
        },
        {
          property: 'og:show product',
          content: 'The  page of our show product.'
        }
      ]
    }
  },
  {
    path: "/add-users",
    name: "add users",
    component: () => import("/src/components/AddUsers.vue"),
    meta: {
      title: 'Add user',
      metaTags: [
        {
          name: 'Add user',
          content: 'The  page of add user.'
        },
        {
          property: 'og:add user',
          content: 'The  page of our add user.'
        }
      ]
    }
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("/src/components/Users.vue"),
    meta: {
      title: 'Show user',
      metaTags: [
        {
          name: 'Show user',
          content: 'The h page of show user.'
        },
        {
          property: 'og:show user',
          content: 'The  page of our show user.'
        }
      ]
    }
  },
  {
    path: "/users/edit/:index",
    name: "edit users",
    component: () => import("/src/components/EditUser.vue"),
    meta: {
      title: 'edit user',
      metaTags: [
        {
          name: 'edit user',
          content: 'The h page of edit user.'
        },
        {
          property: 'og:edit user',
          content: 'The  page of our edit user.'
        }
      ]
    }
  },
  {
    path: "/users/show/:index",
    name: "show users",
    component: () => import("/src/components/ShowUser.vue"),
    meta: {
      title: 'view user',
      metaTags: [
        {
          name: 'view user',
          content: 'The h page of view user.'
        },
        {
          property: 'og:view user',
          content: 'The  page of our view user.'
        }
      ]
    }
  },
  {
    path: "/users/address/:index",
    name: "add address users",
    component: () => import("/src/components/AddUserAdders.vue"),
    meta: {
      title: 'add address users',
      metaTags: [
        {
          name: 'add address users',
          content: 'The h page of add address users.'
        },
        {
          property: 'og:add address users',
          content: 'The  page of our add address users.'
        }
      ]
    }
  },
  {
    path: "/users/edit-address/:index",
    name: "edit address users",
    component: () => import("/src/components/EditUserAddress.vue"),
    meta: {
      title: 'edit address users',
      metaTags: [
        {
          name: 'edit address users',
          content: 'The h page of edit address users.'
        },
        {
          property: 'og:edit address users',
          content: 'The  page of our edit address users.'
        }
      ]
    }
  },
  {
    path: "/sign-in",
    name: "SignIn page",
    component: () => import("/src/components/auth/SignIn.vue"),
    meta: {
      title: 'SignIn page',
      metaTags: [
        {
          name: 'SignIn page',
          content: 'The h page of SignIn page.'
        },
        {
          property: 'og:SignIn page',
          content: 'The  page of our SignIn page.'
        }
      ]
    }
  },
  {
    path: "/log-in",
    name: "LogIn page",
    component: () => import("/src/components/auth/LogIn.vue"),
    meta: {
      title: 'LogIn page',
      metaTags: [
        {
          name: 'LogIn page',
          content: 'The h page of LogIn page.'
        },
        {
          property: 'og:LogIn page',
          content: 'The  page of our LogIn page.'
        }
      ]
    }
  },
];

export default HomeRoutes;
