<template>
  <div>
    <slot :header="header" :footer="footer" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      header: 'Awesome Site',
      footer: 'Incredible Footer',
    }
  },
}
</script>
