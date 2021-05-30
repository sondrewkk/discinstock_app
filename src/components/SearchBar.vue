<template>
  <div class="input-group input-group-lg mb-3">
    <input 
      id="queryInput"
      v-model="query"
      :v-bind="$attrs"
      class="form-control border border-secondary border-end-0"
      @keyup.enter="$emit('search', query)" 
    >
    <!-- Trying to embedd a x-circle in the same input "highlight". Not able to do that yet -->
    <button
      v-if="showClearTextButton"
      class="btn btn-outline-secondary border-secondary border-start-0"
      type="button"
      @click="query = ''"
    >
      <BIconXCircle />
    </button>
    <button 
      class="btn btn-outline-secondary" 
      type="button"
      @click="$emit('search', query)" 
    >
      <BIconSearch />
    </button>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'
  import { BIconXCircle, BIconSearch } from 'bootstrap-icons-vue'
  export default {
    name: "SearchBar",
    components: {
      BIconXCircle,
      BIconSearch
    },
    emits: ["search"],
    setup() {
      let query = ref("")
      const showClearTextButton = computed(() => query.value.length > 0)

      return {
        query,
        showClearTextButton
      }
    }
  }

</script>

<style>
 
</style>
