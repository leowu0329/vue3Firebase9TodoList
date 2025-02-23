<template>
  <div id="app">
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>
<script>
export default {
  name: 'App',
};
</script>
