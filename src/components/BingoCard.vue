<template>
  <div class="page-container">
    <div class="bingo-card">
      <div class="bingo-header">
        <h1 class="bingo-title">Fights Bingo</h1>
        <p class="bingo-subtitle">They Gettin They Ass Beat on Twitter</p>
      </div>

      <div class="bingo-grid">
        <div
          v-for="(cell, index) in cells"
          :key="index"
          @click="toggleCell(index)"
          :class="['bingo-cell', { 'free-space': cell.isFree }, { marked: cell.isMarked }]"
        >
          {{ cell.text }}
        </div>
      </div>
      <div class="bingo-footer">
        <button class="generate-btn" @click="generateCard">Fight!</button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase' // adjust path as needed

export default {
  name: 'BingoCard',
  data() {
    return {
      cells: [
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '"You', isFree: false, isMarked: false },
        { text: 'miss', isFree: false, isMarked: false },
        { text: '100%', isFree: false, isMarked: false },
        { text: 'of', isFree: false, isMarked: false },
        { text: 'the', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: true, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: 'shots', isFree: false, isMarked: false },
        { text: 'that', isFree: false, isMarked: false },
        { text: 'you', isFree: false, isMarked: false },
        { text: 'never', isFree: false, isMarked: false },
        { text: 'take."', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '', isFree: false, isMarked: false },
        { text: '- Wayne', isFree: false, isMarked: false },
        { text: 'Gretsky', isFree: false, isMarked: false },
      ],
    }
  },
  methods: {
    toggleCell(index) {
      if (!this.cells[index].isFree) {
        this.cells[index].isMarked = !this.cells[index].isMarked
      }
    },
    async generateCard() {
      try {
        console.log('Starting card generation...')
        const selectedPhrases = []

        // data distribution: index 0 and 3 get 1 each, index 1 and 2 get 2 each
        const distribution = {
          0: 1,
          1: 2,
          2: 2,
          3: 1,
        }

        // for rarity index
        for (const [rarityIndex, countPerType] of Object.entries(distribution)) {
          // for each type (0-3)
          for (let type = 0; type < 4; type++) {
            console.log(
              `Fetching: rarity_index=${rarityIndex}, type=${type}, count=${countPerType}`,
            )

            const { data, error } = await supabase
              .from('bingo_phrases')
              .select('*')
              .eq('rarity_index', rarityIndex)
              .eq('type', type)
              .eq('is_used', false)
              .limit(countPerType)

            if (error) {
              console.error('Supabase error:', error)
              throw error
            }

            console.log(
              `Found ${data.length} phrases for rarity_index=${rarityIndex}, type=${type}`,
            )

            // randomly select from available phrases
            const shuffled = data.sort(() => Math.random() - 0.5)
            selectedPhrases.push(...shuffled.slice(0, countPerType))
          }
        }

        console.log(`Total phrases selected: ${selectedPhrases.length}`)

        // verify if 24 phrases
        if (selectedPhrases.length < 24) {
          alert(
            `Not enough unused phrases available. Only found ${selectedPhrases.length}/24. Consider resetting phrases.`,
          )
          return
        }

        // Mark selected phrases as used
        const phraseIds = selectedPhrases.map((p) => p.id)
        if (phraseIds.length > 0) {
          const { error } = await supabase
            .from('bingo_phrases')
            .update({ is_used: true })
            .in('id', phraseIds)

          if (error) {
            console.error('Error marking phrases as used:', error)
            throw error
          }

          console.log('Marked phrases as used')
        }

        // shuffle 24 phrases
        const shuffledPhrases = selectedPhrases.sort(() => Math.random() - 0.5)

        // populate cells with new data, leaving index 12 free
        // populate first 12 phrases
        const newCells = shuffledPhrases.slice(0, 12).map((phrase) => ({
          text: phrase.text,
          isFree: false,
          isMarked: false,
        }))

        // free space at index 12
        newCells.push({
          text: 'FREE: People Fight',
          isFree: true,
          isMarked: false,
        })

        // populate remaining 12 phrases
        shuffledPhrases.slice(12, 24).forEach((phrase) => {
          newCells.push({
            text: phrase.text,
            isFree: false,
            isMarked: false,
          })
        })

        this.cells = newCells

        console.log('Card generated successfully!')
      } catch (error) {
        console.error('Error generating bingo card:', error)
        alert('Failed to generate card. Check console for details.')
      }
    },
    async resetAllPhrases() {
      try {
        const { error } = await supabase
          .from('bingo_phrases')
          .update({ is_used: false })
          .neq('id', 0) // update all rows

        if (error) throw error

        console.log('All phrases reset successfully')
        alert('All phrases have been reset!')
      } catch (error) {
        console.error('Error resetting phrases:', error)
        alert('Failed to reset phrases. Check console for details.')
      }
    },
  },
}
</script>
