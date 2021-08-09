<template>
  <div>
    <label 
      for="priceRangeSlider" 
      class="form-label fs-4 mb-5"
    >
      Pris
    </label>
    <Slider 
      id="priceRangeSlider"
      v-model="value" 
      :min="minPrice"
      :max="maxPrice"
      :step="priceStep"
      :merge="priceMerge"
      :format="format"
      @change="onSliderChange"
    />
  </div>
</template>

<script>
import Slider from '@vueform/slider'
import { ref, toRefs, watch } from 'vue'

export default {
  components: {
    Slider,
  },
  props: {
    priceRange: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:priceRange", "priceChange"],
  setup(props, { emit }) {
    const { priceRange } = toRefs(props)

    const value = ref(priceRange.value)
    const minPrice = ref(priceRange.value[0])
    const maxPrice = ref(priceRange.value[1])
    const priceStep = ref(10)
    const priceMerge = ref(70)
    const format = ref({
      suffix: " Kr"
    })
    
    const onSliderChange = () => {
      emit("update:priceRange", value.value)
      emit("priceChange")
    }

    watch(priceRange, (val) => value.value = val)

    return {
      value,
      minPrice,
      maxPrice,
      priceStep,
      priceMerge,
      format,
      onSliderChange,
    }
  },
}
</script>

<style src="@vueform/slider/themes/default.css"></style>
