<template>
  <div class="input-group input-group-lg mb-3">
    <input 
      id="queryInput"
      v-model="query"
      :v-bind="$attrs"
      class="form-control border border-secondary border-end-0"
      @keyup.enter="onSearch" 
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
      @click="onSearch" 
    >
      <BIconSearch />
    </button>
  </div>
</template>

<script>
  import { ref, toRefs, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { BIconXCircle, BIconSearch } from 'bootstrap-icons-vue'
  export default {
    name: "SearchBar",
    components: {
      BIconXCircle,
      BIconSearch
    },
    props: {
      startQuery: {
        type: String,
        default: ""
      },
    },
    emits: ["search"],
    setup(props, { emit }) {
      const router = useRouter()
      const { startQuery } = toRefs(props)
      let query = ref(startQuery.value)

      const showClearTextButton = computed(() => query.value.length > 0)

      const onSearch = () => {
        if(query.value.length == 0){
          router.replace({ query: null })
        }
        else {
          router.replace({ query: { name: query.value }})
        }
        
        emit('search', query.value)
      }

      return {
        query,
        showClearTextButton,
        onSearch
      }
    }
  }

</script>
