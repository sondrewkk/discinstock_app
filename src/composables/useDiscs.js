import { fetchDiscs } from '@/api/discs'
import { ref } from 'vue'

export default function useDiscs() {
  const discs = ref([])

  const getDiscs = async () => {
    console.log("Fetching discs")
    const response = await fetchDiscs(0, 9999);
    discs.value = response.data;
  }

  getDiscs()

  return {
    discs,
  }
}
