import Vue from 'vue';
import VueRouter from 'vue-router';
import AppLayout from '../layout/index.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'AppDashboard',
        component: () => import('@/pages/dashboard')
      }
    ]
  },
  {
    path: '/inventory',
    component: AppLayout,
    children: [
      {
        path: 'platformLots',
        name: 'PlatformLotsList',
        component: () => import('@/pages/inventory/lists/PlatformLotsList.vue')
      },
      {
        path: 'platformLots/create/',
        name: 'PlatformLotCreate',
        component: () => import('@/pages/inventory/create/PlatformLotCreate.vue')
      },
      {
        path: 'platformLots/:_id',
        name: 'PlatformLotDetails',
        component: () => import('@/pages/inventory/details/PlatformLotDetails.vue')
      },
      {
        path: 'lodgements',
        name: 'LodgementsList',
        component: () => import('@/pages/inventory/lists/LodgementsList.vue')
      },
      {
        path: 'lodgements/create/',
        name: 'LodgementCreate',
        component: () => import('@/pages/inventory/create/LodgementCreate.vue')
      },
      {
        path: 'lodgements/:_id',
        name: 'LodgementDetails',
        component: () => import('@/pages/inventory/details/LodgementDetails.vue')
      },
      {
        path: 'deliveries',
        name: 'DeliveriesList',
        component: () => import('@/pages/inventory/lists/DeliveriesList.vue')
      },
      {
        path: 'deliveries/create/',
        name: 'DeliveryCreate',
        component: () => import('@/pages/inventory/create/DeliveryCreate.vue')
      },
      {
        path: 'deliveries/:_id',
        name: 'DeliveryDetails',
        component: () => import('@/pages/inventory/details/DeliveryDetails.vue')
      }
    ]
  },
  {
    path: '/customers',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'CustomersSummaryList',
        component: () => import('@/pages/customers/CustomersList.vue')
      },
      {
        path: ':_id',
        name: 'CustomerSummaryDetails',
        component: () => import('@/pages/customers/CustomerDetails.vue')
      }
    ]
  },
  {
    path: '/products',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'ProductsSummaryList',
        component: () => import('@/pages/products/ProductsList.vue')
      },
      {
        path: ':_id',
        name: 'ProductSummaryDetails',
        component: () => import('@/pages/products/ProductDetails.vue')
      }
    ]
  },
  {
    path: '/referenceData',
    component: AppLayout,
    children: [
      {
        path: 'products',
        name: 'ProductsList',
        component: () => import('@/pages/referenceData/lists/ProductsList.vue')
      },
      {
        path: 'products/create',
        name: 'ProductCreate',
        component: () => import('@/pages/referenceData/create/ProductCreate.vue')
      },
      {
        path: 'products/:_id',
        name: 'ProductDetailsRef',
        component: () => import('@/pages/referenceData/details/ProductDetails.vue')
      },
      {
        path: 'productCategories',
        name: 'ProductCategoriesList',
        component: () => import('@/pages/referenceData/lists/ProductCategoriesList.vue')
      },
      {
        path: 'productCategories/create',
        name: 'ProductCategoryCreate',
        component: () => import('@/pages/referenceData/create/ProductCategoryCreate.vue')
      },
      {
        path: 'productCategories/:_id',
        name: 'ProductCategoryDetails',
        component: () => import('@/pages/referenceData/details/ProductCategoryDetails.vue')
      },
      {
        path: 'customers',
        name: 'CustomersList',
        component: () => import('@/pages/referenceData/lists/CustomersList.vue')
      },
      {
        path: 'customers/create',
        name: 'CustomerCreate',
        component: () => import('@/pages/referenceData/create/CustomerCreate.vue')
      },
      {
        path: 'customers/:_id',
        name: 'CustomerDetails',
        component: () => import('@/pages/referenceData/details/CustomerDetails.vue')
      },
      {
        path: 'employees',
        name: 'EmployeesList',
        component: () => import('@/pages/referenceData/lists/EmployeesList.vue')
      },
      {
        path: 'employees/create',
        name: 'EmployeeCreate',
        component: () => import('@/pages/referenceData/create/EmployeeCreate.vue')
      },
      {
        path: 'employees/:_id',
        name: 'EmployeeDetails',
        component: () => import('@/pages/referenceData/details/EmployeeDetails.vue')
      }
    ]
  },
  // {
  //   path: '/:catchAll(.*)*',
  //   name: "PageNotFound",
  //   component: PageNotFound,
  //  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
