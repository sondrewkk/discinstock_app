<template>
  <div class="card h-100">
    <img
      :src="image"
      class="card-img-top p-1"
      :alt="name"
    >
    <div class="card-body py-1">
      <h6 class="card-title">
        {{ name }}
      </h6>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ retailer }}
      </h6>
      <a
        :href="url"
        class="stretched-link"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "DiscCard",
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    retailer: {
      type: String,
      required: true
    }
  }
}

</script>

<style>
.card {
  max-width: 300px;
}

.card-img-top {
  width: 100%;
  height: 20vh;
  object-fit: contain;
}
</style>
