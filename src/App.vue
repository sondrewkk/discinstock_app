<template>
  <router-view />
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
  html {
    height: 100%;
  }

  body {
    background-image: linear-gradient(180deg, #eee, #fff 100px, #fff);
    height: 100%;
    margin: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .container {
    max-width: 960px;
  }

  .pricing-header {
    max-width: 700px;
  }

  .search-bar {
    max-width: 700px;
  }

</style>
