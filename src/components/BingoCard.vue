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
import { supabase } from '@/supabase'

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

        // distribution by type
        const distribution = {
          Scenario: [2, 5, 4, 2],
          'Fight Tactic': [1, 1, 1, 1],
          Setting: [1, 1, 1, 1],
          People: [1, 1, 1, 0],
        }

        // for each type x rarity index
        for (const [type, counts] of Object.entries(distribution)) {
          for (let rarityIndex = 0; rarityIndex < counts.length; rarityIndex++) {
            const count = counts[rarityIndex]

            if (count === 0) continue

            console.log(`Fetching: type=${type}, rarity_index=${rarityIndex}, count=${count}`)

            const { data, error } = await supabase
              .from('fights')
              .select('*')
              .eq('type', type)
              .eq('rarity_index', rarityIndex)

            if (error) {
              console.error('Supabase error:', error)
              throw error
            }

            console.log(
              `Found ${data.length} phrases for type=${type}, rarity_index=${rarityIndex}`,
            )

            // randomly select from available phrases
            const shuffled = data.sort(() => Math.random() - 0.5)
            selectedPhrases.push(...shuffled.slice(0, count))
          }
        }

        console.log(`Total phrases selected: ${selectedPhrases.length}`)

        // verify if we have 24 phrases
        if (selectedPhrases.length < 24) {
          alert(`Not enough phrases available. Only found ${selectedPhrases.length}/24.`)
          return
        }

        // shuffle all selected phrases
        const shuffledPhrases = selectedPhrases.sort(() => Math.random() - 0.5)

        // populate cells with new data, leaving index 12 free
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
  width: 100%;
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
  position: static;
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
  background: linear-gradient(135deg, #fbbf24 0%, #dc2626 100%);
  color: black;
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
  color: white;
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
}

.generate-btn:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  * {
    box-sizing: border-box;
  }

  .page-container {
    padding: 0 6px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .bingo-card {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .bingo-title {
    font-size: 1.25rem;
  }

  .bingo-subtitle {
    font-size: 0.65rem;
  }

  .bingo-grid {
    gap: 2px;
    box-sizing: border-box;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .bingo-cell {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    font-size: 0.45rem;
    padding: 2px;
    border-width: 1px;
    box-sizing: border-box;
    overflow: hidden;
    word-break: break-word;
  }

  .bingo-cell.free-space {
    font-size: 0.6rem;
  }

  .generate-btn {
    padding: 8px 16px;
    font-size: 0.8rem;
    box-sizing: border-box;
  }
}
</style>
