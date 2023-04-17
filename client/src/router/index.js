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
    path: '/trademarks',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'TrademarksList',
        component: () => import('@/pages/trademarks/TrademarksList.vue')
      },
      {
        path: ':_id',
        name: 'TrademarkSummaryDetails',
        component: () => import('@/pages/trademarks/TrademarkDetails.vue')
      }
    ]
  },
  {
    path: '/products',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'ProductsList',
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
        name: 'ProductsMasterList',
        component: () => import('@/pages/referenceData/lists/ProductsMasterList.vue')
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
        path: 'productGroups',
        name: 'ProductGroupsMasterList',
        component: () => import('@/pages/referenceData/lists/ProductGroupsMasterList.vue')
      },
      {
        path: 'productGroups/create',
        name: 'ProductGroupCreate',
        component: () => import('@/pages/referenceData/create/ProductGroupCreate.vue')
      },
      {
        path: 'productGroups/:_id',
        name: 'ProductGroupDetails',
        component: () => import('@/pages/referenceData/details/ProductGroupDetails.vue')
      },
      {
        path: 'trademarks',
        name: 'TrademarksMasterList',
        component: () => import('@/pages/referenceData/lists/TrademarksMasterList.vue')
      },
      {
        path: 'trademarks/create',
        name: 'TrademarkCreate',
        component: () => import('@/pages/referenceData/create/TrademarkCreate.vue')
      },
      {
        path: 'trademarks/:_id',
        name: 'TrademarkDetails',
        component: () => import('@/pages/referenceData/details/TrademarkDetails.vue')
      },
      {
        path: 'employees',
        name: 'EmployeesMasterList',
        component: () => import('@/pages/referenceData/lists/EmployeesMasterList.vue')
      },
      {
        path: 'employees/create',
        name: 'EmployeeCreate',
        component: () => import('@/pages/referenceData/create/EmployeeCreate.vue')
      },
      {
        path: 'employees/:_id',
        name: 'EmployeeDetailsRef',
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
