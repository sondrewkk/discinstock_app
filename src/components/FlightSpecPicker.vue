

<template>
  <div class="d-flex row justify-content-center">
    <div class="d-flex justify-content-center">
      <input 
        v-model.number="fromInput"
        class="w-25" 
        @change="onFromInputChanged"
      >
      <span class="mx-3">-</span>
      <input 
        v-model.number="toInput"
        class="w-25" 
        @change="onToInputChanged"
      >
    </div>
    <Slider 
      id="flightSpecRangeSlider"
      v-model="value" 
      class="mt-5"
      :min="lowerLimit"
      :max="upperLimit"
      :step="1"
      @change="onSliderChanged"
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
    flightSpecRange: {
      type: Array,
      default: () => [1, 2],
    },
  },
  emits: ["update:flightSpecRange", "flightSpecChange"],
  setup(props, { emit }) {
    const { flightSpecRange } = toRefs(props)
    
    const value = ref(flightSpecRange.value)
    const lowerLimit = flightSpecRange.value[0]
    const upperLimit = flightSpecRange.value[1]
    const fromInput = ref(flightSpecRange.value[0])
    const toInput = ref(flightSpecRange.value[1])

    const onSliderChanged = () => {
      [fromInput.value, toInput.value] = [...value.value]
      emit("update:flightSpecRange", value.value)
      emit("flightSpecChange")
    }

    const onFromInputChanged = () => {
      const input = fromInput.value

      if(input >= lowerLimit && input <= upperLimit && input <= toInput.value){
        value.value[0] = input
        emit("update:flightSpecRange", value.value)
        emit("flightSpecChange")
      }
    }

    const onToInputChanged = () => {
      const input = toInput.value

      if(input >= lowerLimit && input <= upperLimit && input >= fromInput.value){
        value.value[1] = input
        emit("update:flightSpecRange", value.value)
        emit("flightSpecChange")
      }
    }

    watch(flightSpecRange, (val) => {
      value.value = val
      fromInput.value = val[0]
      toInput.value = val[1]
    })

    return {
      value,
      fromInput,
      toInput,
      lowerLimit,
      upperLimit,
      onSliderChanged,
      onFromInputChanged,
      onToInputChanged,
    }
  },
}
</script>

<style src="@vueform/slider/themes/default.css"></style>
