<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <!-- <li class="nav-item nav-profile">
          <a href="javascript:void(0);" class="nav-link">
            <div class="nav-profile-image">
              <img src="@/assets/images/faces/face1.jpg" alt="profile">
              <span class="login-status online"></span>
            </div>
            <div class="nav-profile-text d-flex flex-column">
              <span class="font-weight-bold mb-2">Nageswara Rao</span>
              <span class="text-secondary text-small">Store Manager</span>
            </div>
            <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li> -->
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/">
            <span class="menu-title">Dashboard</span>
            <i class="mdi mdi-home menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'inventory'">
            <span class="menu-title">Inventory</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-store menu-icon"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" id="inventory">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/inventory/lodgements/">Lodgements</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/inventory/deliveries/">Deliveries</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/inventory/platformLots/">Platform Lots</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/Customers/">
            <span class="menu-title">Customers</span>
            <i class="mdi mdi-account-multiple menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/products/">
            <span class="menu-title">Products</span>
            <i class="mdi mdi-barley menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'accounting'">
            <span class="menu-title">Accounting</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-cash-multiple menu-icon"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" id="accounting">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/accounting/external/">External Tranactions</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/inventory/internal/">Internal Transactions</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/reports/">
            <span class="menu-title">Reports</span>
            <i class="mdi mdi-chart-bar menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'reference-data'">
            <span class="menu-title">Administration</span>
            <i class="menu-arrow"></i>
            <i class="mdi mdi-book-plus menu-icon"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" id="reference-data">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/administration/customers/">Customers</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/administration/productCategories/">Product Categories</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/administration/products/">Products</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/administration/employees/">Employees <i class="mdi mdi-worker menu-icon"></i></router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'AppSidebar',
 data () {
    return {
      collapses: [ 
     { show: false },
     { show: false },
     { show: false }
    ]
    }
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    }
  },
  mounted () {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  },
  watch:{
    $route () {
       document.querySelector('#sidebar').classList.toggle('active');
    }
  } 
}
</script>