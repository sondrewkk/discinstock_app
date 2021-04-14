<template>

  <div class="input-group mb-3">
    <input 
      :v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control form-control-lg" 
    />
    <button 
      class="btn btn-lg btn-outline-secondary" 
      type="button"
        @click="$emit('search')"
    >
      {{ label }}
    </button>
  </div>

</template>

<script>

export default {
  name: "SearchBar",
  props: {
    label: {
      type: String,
      default: "Søk"
    },
    modelValue: {
      type: String,
      default: ""
    }
  }
}
</script>

<style>

</style>
