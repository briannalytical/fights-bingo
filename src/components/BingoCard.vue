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
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: 'FREE: People Fight', isFree: true, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
        { text: '❌', isFree: false, isMarked: false },
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

<style scoped>
.page-container {
  width: 100%;
  max-width: 600px;
}

.bingo-card {
  background: #1f1f1f;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  border: 1px solid #333;
}

.bingo-header {
  text-align: center;
  margin-bottom: 24px;
}

.bingo-title {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #dc2626 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.bingo-subtitle {
  color: #9ca3af;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}

.bingo-cell {
  aspect-ratio: 1;
  background: #2a2a2a;
  border: 2px solid #404040;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color: #e5e5e5;
}

.bingo-cell:hover {
  background: #333;
  border-color: #555;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.bingo-cell.marked {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  border-color: #dc2626;
  color: white;
  font-weight: 600;
}

.bingo-cell.free-space {
  background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
  border-color: #fbbf24;
  color: #1f1f1f;
  font-weight: 700;
  font-size: 1rem;
}

.bingo-footer {
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.generate-btn {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.generate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
}

.generate-btn:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .bingo-card {
    padding: 20px;
  }

  .bingo-title {
    font-size: 2rem;
  }

  .bingo-cell {
    font-size: 0.65rem;
    padding: 6px;
  }
}

@media (max-width: 640px) {
  .bingo-card {
    padding: 20px;
  }

  .bingo-title {
    font-size: 2rem;
  }

  .bingo-cell {
    font-size: 0.65rem;
    padding: 6px;
  }
}
</style>
