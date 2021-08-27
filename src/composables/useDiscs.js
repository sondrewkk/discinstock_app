import { fetchDiscs } from '@/api/discs'
import { ref } from 'vue'

export default function useDiscs(loading) {
  const discs = ref([])

  const getDiscs = async () => {
    loading.value = true
    const response = await fetchDiscs(0, 9999);
    discs.value = response.data;
    loading.value = false;
  }

  getDiscs()

  return {
    discs,
  }
}
