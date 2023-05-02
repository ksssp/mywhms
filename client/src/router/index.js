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
    path: '/summary/',
    component: AppLayout,
    children: [
      {
        path: 'customers',
        name: 'CustomersSummaryList',
        component: () => import('@/pages/summary/customers/CustomersList.vue')
      },
      {
        path: 'customers/:_id',
        name: 'CustomerSummaryDetails',
        component: () => import('@/pages/summary/customers/CustomerDetails.vue')
      },
      {
        path: 'products',
        name: 'ProductsSummaryList',
        component: () => import('@/pages/summary/products/ProductsList.vue')
      },
      {
        path: 'products/:_id',
        name: 'ProductSummaryDetails',
        component: () => import('@/pages/summary/products/ProductDetails.vue')
      }
    ]
  },
  {
    path: '/accounting/',
    component: AppLayout,
    children: [
      {
        path: 'bankAccountTransactions',
        name: 'BankAccountTransactionsList',
        component: () => import('@/pages/accounting/lists/BankAccountTransactionsList.vue')
      },
      {
        path: 'bankAccountTransactions/create',
        name: 'BankAccountTransactionCreate',
        component: () => import('@/pages/accounting/create/BankAccountTransactionCreate.vue')
      },      
      {
        path: 'bankAccountTransactions/:_id',
        name: 'BankAccountTransactionDetails',
        component: () => import('@/pages/accounting/details/BankAccountTransactionDetails.vue')
      }, 
      {
        path: 'expenses',
        name: 'ExpensesList',
        component: () => import('@/pages/accounting/lists/ExpensesList.vue')
      },
      {
        path: 'expenses/create',
        name: 'ExpenseCreate',
        component: () => import('@/pages/accounting/create/ExpenseCreate.vue')
      },      
      {
        path: 'expenses/:_id',
        name: 'ExpenseDetails',
        component: () => import('@/pages/accounting/details/ExpenseDetails.vue')
      },  
      {
        path: 'customerTransactions',
        name: 'CustomerTransactionsList',
        component: () => import('@/pages/accounting/lists/CustomerTransactionsList.vue')
      },
      {
        path: 'customerTransactions/create',
        name: 'CustomerTransactionCreate',
        component: () => import('@/pages/accounting/create/CustomerTransactionCreate.vue')
      },      
      {
        path: 'customerTransactions/:_id',
        name: 'CustomerTransactionDetails',
        component: () => import('@/pages/accounting/details/CustomerTransactionDetails.vue')
      },         
      {
        path: 'employeeTransactions',
        name: 'EmployeeTransactionsList',
        component: () => import('@/pages/accounting/lists/EmployeeTransactionsList.vue')
      },
      {
        path: 'employeeTransactions/create',
        name: 'EmployeeTransactionCreate',
        component: () => import('@/pages/accounting/create/EmployeeTransactionCreate.vue')
      },      
      {
        path: 'employeeTransactions/:_id',
        name: 'EmployeeTransactionDetails',
        component: () => import('@/pages/accounting/details/EmployeeTransactionDetails.vue')
      },
    ]
  },
  {
    path: '/administration',
    component: AppLayout,
    children: [
      {
        path: 'products',
        name: 'ProductsList',
        component: () => import('@/pages/administration/lists/ProductsList.vue')
      },
      {
        path: 'products/create',
        name: 'ProductCreate',
        component: () => import('@/pages/administration/create/ProductCreate.vue')
      },
      {
        path: 'products/:_id',
        name: 'ProductDetailsRef',
        component: () => import('@/pages/administration/details/ProductDetails.vue')
      },
      {
        path: 'productCategories',
        name: 'ProductCategoriesList',
        component: () => import('@/pages/administration/lists/ProductCategoriesList.vue')
      },
      {
        path: 'productCategories/create',
        name: 'ProductCategoryCreate',
        component: () => import('@/pages/administration/create/ProductCategoryCreate.vue')
      },
      {
        path: 'productCategories/:_id',
        name: 'ProductCategoryDetails',
        component: () => import('@/pages/administration/details/ProductCategoryDetails.vue')
      },
      {
        path: 'customers',
        name: 'CustomersList',
        component: () => import('@/pages/administration/lists/CustomersList.vue')
      },
      {
        path: 'customers/create',
        name: 'CustomerCreate',
        component: () => import('@/pages/administration/create/CustomerCreate.vue')
      },
      {
        path: 'customers/:_id',
        name: 'CustomerDetails',
        component: () => import('@/pages/administration/details/CustomerDetails.vue')
      },
      {
        path: 'employees',
        name: 'EmployeesList',
        component: () => import('@/pages/administration/lists/EmployeesList.vue')
      },
      {
        path: 'employees/create',
        name: 'EmployeeCreate',
        component: () => import('@/pages/administration/create/EmployeeCreate.vue')
      },
      {
        path: 'employees/:_id',
        name: 'EmployeeDetails',
        component: () => import('@/pages/administration/details/EmployeeDetails.vue')
      },
      {
        path: 'bankAccounts',
        name: 'BankAccountsList',
        component: () => import('@/pages/administration/lists/BankAccountsList.vue')
      },
      {
        path: 'incomeTypes',
        name: 'IncomeTypesList',
        component: () => import('@/pages/administration/lists/IncomeTypesList.vue')
      },
      {
        path: 'incomeTypes/create',
        name: 'IncomeTypeCreate',
        component: () => import('@/pages/administration/create/IncomeTypeCreate.vue')
      },
      {
        path: 'incomeTypes/:_id',
        name: 'IncomeTypeDetails',
        component: () => import('@/pages/administration/details/IncomeTypeDetails.vue')
      },
      {
        path: 'expenseTypes',
        name: 'ExpenseTypesList',
        component: () => import('@/pages/administration/lists/ExpenseTypesList.vue')
      },
      {
        path: 'expenseTypes/create',
        name: 'ExpenseTypeCreate',
        component: () => import('@/pages/administration/create/ExpenseTypeCreate.vue')
      },
      {
        path: 'expenseTypes/:_id',
        name: 'ExpenseTypeDetails',
        component: () => import('@/pages/administration/details/ExpenseTypeDetails.vue')
      },
      {
        path: 'employeeTransactionTypes',
        name: 'EmployeeTransactionTypesList',
        component: () => import('@/pages/administration/lists/EmployeeTransactionTypesList.vue')
      },
      {
        path: 'employeeTransactionTypes/create',
        name: 'EmployeeTransactionTypeCreate',
        component: () => import('@/pages/administration/create/EmployeeTransactionTypeCreate.vue')
      },
      {
        path: 'employeeTransactionTypes/:_id',
        name: 'EmployeeTransactionTypeDetails',
        component: () => import('@/pages/administration/details/EmployeeTransactionTypeDetails.vue')
      },
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
