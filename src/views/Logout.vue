<template>
  <div/>
</template>

<script>
import auth from '../auth';
import router from '../router/index';

export default {
  name: 'Logout',
  created: () => {
    if (auth.user.authenticated) {
      auth.logout();
    }

    router.push('/');
  }
};
</script>
