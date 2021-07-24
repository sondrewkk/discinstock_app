import { computed, onBeforeMount, onUnmounted, ref } from "vue"

export default function useDiscsAutoScroll(resultsComponent, discs) {
  const skip = ref(20)
  const limit = ref(20)
  let page = ref(1)
  let load = ref(false)

  const discVisibleWithScroll = computed(() => {
    return discs.value.slice(0, limit.value)
  })

  const handleScroll = async () => {
    const element = resultsComponent.value
    const trigger = element.getBoundingClientRect().bottom

    if (trigger < window.innerHeight && !load.value) {
      load.value = true
      page.value += 1
      limit.value = page.value * skip.value
      load.value = false
    }
  }

  onBeforeMount(() => window.addEventListener("scroll", handleScroll))
  onUnmounted(()   => window.removeEventListener("scroll", handleScroll))

  return {
    discVisibleWithScroll,
  }
}
