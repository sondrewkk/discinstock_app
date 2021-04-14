<template>

  <div class="card">
    <img src="https://m.media-amazon.com/images/I/61iW+IFWFzL._AC_SX425_.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
    }
  }
}

</script>

<style>

</style>
