

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
import { ref, toRefs} from 'vue'

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
  emits: ["update:flightSpecRange"],
  setup(props, { emit }) {
    const { flightSpecRange } = toRefs(props)
    
    const value = ref(flightSpecRange.value)
    const lowerLimit = flightSpecRange.value[0]
    const upperLimit = flightSpecRange.value[1]
    const fromInput = ref(lowerLimit)
    const toInput = ref(upperLimit)

    const onSliderChanged = () => {
      [fromInput.value, toInput.value] = [...value.value]
      emit("update:flightSpecRange", value.value)
    }

    const onFromInputChanged = () => {
      const input = fromInput.value

      if(input >= lowerLimit && input <= upperLimit && input <= toInput.value){
        value.value[0] = input
        emit("update:flightSpecRange", value.value)
      }
    }

    const onToInputChanged = () => {
      const input = toInput.value

      if(input >= lowerLimit && input <= upperLimit && input >= fromInput.value){
        value.value[1] = input
        emit("update:flightSpecRange", value.value)
      }
    }

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
