<script setup lang="ts">
const letters = [
  'I', 'T', 'L', 'I', 'S', 'A', 'S', 'A', 'M', 'P', 'M',
  'A', 'C', 'Q', 'U', 'A', 'R', 'T', 'E', 'R', 'D', 'C',
  'T', 'W', 'E', 'N', 'T', 'Y', 'F', 'I', 'V', 'E', 'X',
  'H', 'A', 'L', 'F', 'S', 'T', 'E', 'N', 'F', 'T', 'O',
  'P', 'A', 'S', 'T', 'E', 'R', 'U', 'N', 'I', 'N', 'E',
  'O', 'N', 'E', 'S', 'I', 'X', 'T', 'H', 'R', 'E', 'E',
  'F', 'O', 'U', 'R', 'F', 'I', 'V', 'E', 'T', 'W', 'O',
  'E', 'I', 'G', 'H', 'T', 'E', 'L', 'E', 'V', 'E', 'N',
  'S', 'E', 'V', 'E', 'N', 'T', 'W', 'E', 'L', 'V', 'E',
  'T', 'E', 'N', 'S', 'E', 'O', 'C', 'L', 'O', 'C', 'K',
]

const words: Record<string | number, Array<number>> = {
  it: [0, 1],
  is: [3, 4],
  quarter: [13, 14, 15, 16, 17, 18, 19],
  twenty: [22, 23, 24, 25, 26, 27],
  five: [28, 29, 30, 31],
  half: [33, 34, 35, 36],
  ten: [38, 39, 40],
  to: [42, 43],
  past: [44, 45, 46, 47],
  9: [51, 52, 53, 54],
  1: [55, 56, 57],
  6: [58, 59, 60],
  3: [61, 62, 63, 64, 65],
  4: [66, 67, 68, 69],
  5: [70, 71, 72, 73],
  2: [74, 75, 76],
  8: [77, 78, 79, 80, 81],
  11: [82, 83, 84, 85, 86, 87],
  7: [88, 89, 90, 91, 92],
  12: [93, 94, 95, 96, 97, 98],
  10: [99, 100, 101],
  oclock: [104, 105, 106, 107, 108, 109],
}

const time = useDateFormat(useNow({ interval: 1000 }), 'h:m')
const display = ref<Array<number>>([])

function displayWord(key: string | number) {
  display.value.push(...words[key])
}

watch(time, () => {
  display.value = []
  displayWord('it')
  displayWord('is')
  const [hour, minute] = time.value.split(':') as unknown as [number, number]
  display.value.push(...words[hour])

  if (minute < 5) { displayWord('oclock') }
  else {
    if (minute < 35)
      displayWord('past')
    else displayWord('to')

    if (minute >= 30 && minute < 35) { displayWord('half') }
    else {
      if (minute < 10 || minute >= 55) { displayWord('five') }
      else if (minute < 15 || minute >= 50) { displayWord('ten') }
      else if (minute < 20 || minute >= 45) { displayWord('quarter') }
      else if (minute < 25 || minute >= 40) { displayWord('twenty') }
      else {
        displayWord('twenty')
        displayWord('five')
      }
    }
  }
}, { immediate: true })
</script>

<template>
  <main class="min-h-full grid place-items-center bg-black">
    <div>
      <div class="grid grid-cols-11 place-items-center w-80 h-80 border border-dark p-4 select-none">
        <div
          v-for="(letter, i) in letters" :key="i"
          class="text-gray-600 font-mono" :class="display.includes(i) ? 'text-white' : 'text-dark'"
        >
          {{ letter }}
        </div>
      </div>
      <p class="text-gray text-center mt-4">
        Inspired by <a class="text-primary" href="https://qlocktwo.com/">QLOCKTWO</a>
      </p>
    </div>
  </main>
</template>
