<template>
  <div class="card h-100">
    <img
      :src="image"
      class="card-img-top p-1"
      :alt="name"
    >
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
      <div class="d-flex">
        <span class="mx-auto text-muted">{{ retailer }}</span>
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
  }
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

</style>
