
<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = 'MainLayout'
export default {
  name: "Layout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout
      return () => import(`@/layouts/${layout}.vue`)
    }
  }
}
</script>