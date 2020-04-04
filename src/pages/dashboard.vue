<template>
  <div class="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
    <div class="bg-white overflow-hidden shadow sm:rounded-lg">
      <div class="relative px-4 py-5 sm:p-6">
        <svg class="border-2 border-dashed border-gray-300 rounded bg-white h-64 w-full text-gray-200" preserveAspectRatio="none" stroke="currentColor" fill="none" viewBox="0 0 200 200">
          <path vector-effect="non-scaling-stroke" stroke-width="2" d="M0 0l200 200M0 200L200 0" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AvatarGroup from '@/components/AvatarGroup'

export default {
  name: 'DashboardPage',
  components: { AvatarGroup },
  computed: {
    ...mapState({
      user: 'auth/user',
    }),
  },
  mounted () {
    function tidyUpAnimations () {
      console.log('tidying up...')
    }

    // Get the first position.
    const first = this.$el.getBoundingClientRect()
    console.log('first: ', first)

    // Now set the element to the last position.
    this.$el.classList.add('transform translate-y-12 duration-500 ease-in')
    console.log(this.$el)

    // Read again. This forces a sync
    // layout, so be careful.
    const last = this.$el.getBoundingClientRect()
    console.log('last: ', last)

    // You can do this for other computed
    // styles as well, if needed. Just be
    // sure to stick to compositor-only
    // props like transform and opacity
    // where possible.
    const invert = first.top - last.top

    // Invert.
    this.$el.style.transform = `translateY(${invert}px)`

    // Wait for the next frame so we
    // know all the style changes have
    // taken hold.
    requestAnimationFrame(() => {
      // Switch on animations.
      this.$el.classList.add('animate-on-transforms')

      // GO GO GOOOOOO!
      this.$el.style.transform = ''
    })

    // Capture the end with transitionend
    this.$el.addEventListener('transitionend', tidyUpAnimations)

    //  Go from the inverted position to last.
    // var player = this.$el.animate([
    //   { transform: `translateY(${invert}px)` },
    //   { transform: 'translateY(0)' },
    // ], {
    //   duration: 300,
    //   easing: 'cubic-bezier(0,0,0.32,1)',
    // })

    // // Do any tidy up at the end
    // // of the animation.
    // player.addEventListener('finish', tidyUpAnimations)

    //
    function fetchDogs ({ breed }) {
      fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    const dog = {
      name: 'Max',
      breed: 'pomeranian',
      color: 'black',
      age: 6,
    }

    fetchDogs(dog)
  },
}
</script>
