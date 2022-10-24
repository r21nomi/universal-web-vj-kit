<template>
  <canvas id="canvas" class="artCanvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Art } from '~/art/art'

@Component({
  components: {},
})
export default class ArtCanvas extends Vue {
  private art: any = null

  mounted() {
    this.art = new Art()
  }
}
</script>

<style scoped lang="stylus">
@require '~@/assets/style/variables.styl'
@require '~@/assets/style/mixin.styl'

.artCanvas
  width 100%
  height 100%
  position fixed
  overflow hidden
</style>
