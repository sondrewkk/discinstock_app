<template>
  <div class="card h-100">
    <div class="card-img-top position-relative">
      <img
        :src="image"
        class="px-1 pt-1"
        :alt="name"
      >
    </div>
    
    <div class="card-body">
      <div class="d-flex flex-column align-items-center text-center h-100">
        <div 
          v-if="hasFlightSpec" 
        >
          <div 
            class="d-flex justify-content-center mb-1 text-white" 
            style="height: 30px"
          >
            <div class="flight-spec h-100 me-1 rounded">
              <p>{{ speed }}</p>
            </div>
            <div class="flight-spec h-100 me-1 rounded">
              <p>{{ glide }}</p>
            </div>
            <div class="flight-spec h-100 me-1 rounded">
              <p>{{ turn }}</p>
            </div>
            <div class="flight-spec h-100 me-1 rounded">
              <p>{{ fade }}</p>
            </div>
          </div>
        </div>
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
      :href="`${url}?utm_medium=discinstock&utm_source=discinstock.no&utm_campaign=cpc`" 
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

  .flight-spec {
    background-color: #2DAD67;
    min-width: 30px;
    font-size: 1em;
  }

  .flight-spec p {
    display: inline-block;
    line-height: 30px;
  }

</style>
