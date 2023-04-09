<template>
  <section class="main-view">
    <div class="container-scroller">
      <AppHeader/>
      <div class="container-fluid page-body-wrapper">
        <AppSidebar/>
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div> <!-- content wrapper ends -->
          <AppFooter/>
        </div> <!-- main panel ends -->
      </div> <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
  import AppHeader from "./partials/AppHeader";
  import AppSidebar from "./partials/AppSidebar";
  import AppFooter from "./partials/AppFooter";

  export default {
    name: "AppLayout",
    components: {
      AppHeader,
      AppSidebar,
      AppFooter
    }
  }
</script>