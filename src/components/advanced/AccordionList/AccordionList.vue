<template>
  <div class="accordion-list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AccordionList',
  provide () {
    return {
      accordionListState: this.sharedState,
    }
  },
  data () {
    return {
      sharedState: {
        activeItem: 1,
      },
    }
  },
}
</script>
