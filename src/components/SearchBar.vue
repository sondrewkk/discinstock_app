<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="input-group input-group-lg search-bar">
      <input 
        class="form-control border border-secondary border-end-0"  
        :value="searchBarInput"
        type="text"
        @input="$emit('update:searchBarInput', $event.target.value)"
      >
      <button 
        class="btn border border-secondary border-start-0 bg-white" 
        type="button"
        @click="$emit('clearInput')"
      >
        <BIconXCircle 
          class="mb-1 bg-white" 
          v-if:="showClearTextButton" 
          aria-hidden="true" 
        />
      </button>
    </div>
  </div>
</template>

<script>
  import { computed, toRefs } from 'vue'
  import { BIconXCircle } from 'bootstrap-icons-vue'

  export default {
    name: "SearchBar",
    components: {
      BIconXCircle,
    },
    props: {
      searchBarInput: {
        type: String,
        default: "",
      },
    },
    emits: ["update:searchBarInput", "clearInput"],
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

  .form-control, .btn {
    box-shadow: none !important;
    outline: none !important;
}
</style>
