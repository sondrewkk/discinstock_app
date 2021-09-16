<template>
  <div class="card h-100">
    <div class="card-img-top position-relative">
      <img
        :src="image"
        class="p-1"
        :alt="name"
      >
      <div 
        v-if="hasFlightSpec" 
        class="position-absolute bottom-0 start-50 translate-middle-x w-100 px-2 px-sm-3"
      >
        <div class="d-flex justify-content-center text-center">
          <div 
            class="p-2 flex-even fs-6 fw-bold text-nowrap rounded-start" 
            style="background-color: #C0D6DF"
          >
            {{ speed }}
          </div>
          <div 
            class="p-2 flex-even fs-6 fw-bold text-nowrap" 
            style="background-color: #ECEDED"
          >
            {{ glide }}
          </div>
          <div 
            class="p-2 flex-even fs-6 fw-bold text-nowrap" 
            style="background-color: #B2B9A9"
          >
            {{ turn }}
          </div>
          <div 
            class="p-2 flex-even fs-6 fw-bold text-nowrap rounded-end" 
            style="background-color: #CDE1CF"
          >
            {{ fade }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <div class="d-flex flex-column align-items-center text-center h-100">
        <span class="fs-5">{{ name }}</span>
        <h6 class="text-muted font-monospace h-100">
          {{ brand }}
        </h6>
        <span class="flex-shrink-1 display-6 mt-1">{{ price }},-</span>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex flex-column">
        <span class="mx-auto">{{ retailer }}</span>
        <span class="mx-auto text-muted">{{ dateFormated }}</span>  
      </div>
    </div>
    <a 
      :href="url" 
      class="stretched-link"
      target="_blank" 
    />
  </div>
</template>

<script>
import { toRefs, ref, computed } from '@vue/reactivity'
import { DateTime } from 'luxon'

export default {
  name: "DiscCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    retailer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 999,
      required: true,
    },
    brand: {
      type: String,
      default: "",
      required: true,
    },
    speed: {
      type: Number,
      default: null,
    },
    glide: {
      type: Number,
      default: null,
    },
    turn: {
      type: Number,
      default: null,
    },
    fade: {
      type: Number,
      default: null,
    },
    lastUpdated: {
      type: Date,
      default: Date,
      required: true,
    },
  },
  setup(props) {
    const { lastUpdated, speed, glide, turn, fade } = toRefs(props)

    const isoDate = lastUpdated.value.toISOString()
    const dt = DateTime.fromISO(isoDate)
    const dateFormated = ref(dt.toFormat("dd.LL.yy HH:mm"))

    const hasFlightSpec = computed(() => speed.value != null && glide.value != null && turn.value != null && fade.value != null)
    
    return {
      dateFormated,
      hasFlightSpec,
    }

  },
}

</script>

<style scoped>
  img {
    width: 100%;
    height: 21vh;
    object-fit: contain;
  }
   
  .card {
    max-width: 300px;
  }

  .flex-even {
    flex: 1 1 0;
    width: 0;
  }

</style>
