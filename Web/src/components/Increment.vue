<template>
  <div>
    <button @click='dataUp'>Increment +1</button>
  </div>
</template>

<script>
import { incrementCounter } from '../vuex/actions'
export default {

  vuex: {

    actions: {
      increment: incrementCounter
    }
  },
    methods: {
        dataUp() {
          console.log(1)
          this.increment(1)
        }

    }
}
</script>