<template>
  <header class="app-header navbar">
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none"
      type="button"
      @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"/>
    </button>
    <b-link
      class="navbar-brand"
      to="#"/>
    <button
      class="navbar-toggler sidebar-toggler d-md-down-none mr-auto"
      type="button"
      @click="sidebarToggle">
      <span class="navbar-toggler-icon"/>
    </button>
    <b-navbar-nav class="ml-auto">
      <b-nav-item
        class="d-md-down-none px-3"
        to="/user/login"
        v-if="!user.authenticated">
        <i class="fa fa-lock"/> Login
      </b-nav-item>
      <b-nav-item
        class="d-md-down-none px-3"
        to="/user/logout"
        v-if="user.authenticated">
        <i class="fa fa-lock"/> Logout
      </b-nav-item>
    </b-navbar-nav>
    <!-- <button
      class="navbar-toggler aside-menu-toggler d-md-down-none"
      type="button"
      @click="asideToggle">
      <span class="navbar-toggler-icon"/>
    </button> -->
  </header>
</template>
<script>
import auth from '../auth';

export default {
  name: 'Header',
  data: () => {
    return { user: auth.user };
  },
  methods: {
    sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle('sidebar-hidden');
    },
    sidebarMinimize(e) {
      e.preventDefault();
      document.body.classList.toggle('sidebar-minimized');
    },
    mobileSidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle('sidebar-mobile-show');
    },
    asideToggle(e) {
      e.preventDefault();
      document.body.classList.toggle('aside-menu-hidden');
    }
  }
};
</script>
