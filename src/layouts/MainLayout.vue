<template>
  <div>
    <Navbar/>
    <slot />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: { Navbar }
}
</script>
<style>
body{
    background-color: darkseagreen;
    margin: 3rem;
}
</style>