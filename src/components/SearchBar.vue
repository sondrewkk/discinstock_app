<template>

  <div class="input-group mb-3">
    <input 
      :v-bind="$attrs"
      v-model="query"
      @keyup.enter="$emit('search', query)"
      class="form-control form-control-lg" 
    />
    <button 
      class="btn btn-lg btn-outline-secondary" 
      type="button"
      @click="$emit('search', query)" 
    >
      {{ label }}
    </button>
  </div>

</template>

<script>
  import { ref } from 'vue'

  export default {
    name: " SearchBar",
    props: {
      label: {
        type: String,
        default: "Søk"
      }
    },
    emits: ["search"],
    setup() {
      let query = ref("")

      return {
        query
      }
    }
  }

</script>

<style>

</style>
