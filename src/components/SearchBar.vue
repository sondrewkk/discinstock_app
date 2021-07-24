<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="input-group input-group-lg search-bar">
      <input 
        class="form-control border border-secondary"  
        :value="searchBarInput"
        type="text"
        @input="$emit('update:searchBarInput', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
  import { computed, toRefs } from 'vue'

  export default {
    name: "SearchBar",
    props: {
      searchBarInput: {
        type: String,
        default: "",
      },
    },
    emits: ["update:searchBarInput"],
    setup(props) {
      const { searchBarInput } = toRefs(props)
      const showClearTextButton = computed(() => searchBarInput.value.length > 0)

      return {
        showClearTextButton,
      }
    }
  }

</script>

<style scoped>
  .search-bar {
    max-width: 700px;
  }

  .center-block {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
