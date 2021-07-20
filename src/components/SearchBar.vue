<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="input-group search-bar">
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
        class="btn btn-outline-secondary px-4" 
        type="button"
        @click="onSearch" 
      >
        <p class="h4">
          <BIconSearch />
        </p>
      </button>
    </div>

    <div class="mt-4">
      <button
        class="btn btn-outline-secondary text-nowrap"
        type="button"
        data-bs-toggle="offcanvas" 
        data-bs-target="#filterMenu" 
        aria-controls="filterMenu"
      >
        Vis filter
      </button>
    </div> 
  </div>

  <div 
    id="filterMenu"
    class="offcanvas offcanvas-start" 
    tabindex="-1"  
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 
        id="filterMenuTitle"
        class="offcanvas-title"  
      >
        Filter
      </h5>
      <button 
        type="button" 
        class="btn-close text-reset" 
        data-bs-dismiss="offcanvas" 
        aria-label="Close"
      />
    </div>

    <div class="offcanvas-body">
      <div 
        id="filterMenuOptions"
        class="accordion" 
      >
        <!-- Retailer -->
        <div class="accordion-item">
          <h2 
            id="reatilerHeader"
            class="accordion-header" 
          >
            <button 
              class="accordion-button" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseRetailer" 
              aria-expanded="true" 
              aria-controls="collapseRetailer"
            >
              Butikk
            </button>
          </h2>
          <div 
            id="collapseRetailer" 
            class="accordion-collapse collapse show" 
            aria-labelledby="reatilerHeader"
          >
            <div class="accordion-body">
              <div class="form-check">
                <input 
                  id="dgshop" 
                  class="form-check-input" 
                  type="checkbox" 
                  value=""
                >
                <label 
                  class="form-check-label" 
                  for="dgshop"
                >
                  Dgshop
                </label>
              </div>      
            </div>
          </div>
        </div>

        <!-- Brand -->
        <div class="accordion-item">
          <h2 
            id="brandHeader"
            class="accordion-header" 
          >
            <button 
              class="accordion-button" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseBrand" 
              aria-expanded="true" 
              aria-controls="collapseBrand"
            >
              Merke
            </button>
          </h2>
          <div 
            id="collapseBrand" 
            class="accordion-collapse collapse show" 
            aria-labelledby="brandHeader"
          >
            <div class="accordion-body">
              sdss
            </div>
          </div>
        </div>
      </div>
    </div>
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
      BIconSearch,
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

