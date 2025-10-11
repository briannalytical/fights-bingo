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
          :class="['bingo-cell', { marked: cell.isMarked, free: cell.isFree }]"
          @click="toggleCell(index)"
        >
          {{ cell.text }}
        </div>
      </div>

      <div class="bingo-footer">What the hell am i doin</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BingoCard',
  data() {
    return {
      cells: [
        { text: 'Sample Text 1', isFree: false, isMarked: false },
        { text: 'Sample Text 2', isFree: false, isMarked: false },
        { text: 'Sample Text 3', isFree: false, isMarked: false },
        { text: 'Sample Text 4', isFree: false, isMarked: false },
        { text: 'Sample Text 5', isFree: false, isMarked: false },
        { text: 'Sample Text 6', isFree: false, isMarked: false },
        { text: 'Sample Text 7', isFree: false, isMarked: false },
        { text: 'Sample Text 8', isFree: false, isMarked: false },
        { text: 'Sample Text 9', isFree: false, isMarked: false },
        { text: 'Sample Text 10', isFree: false, isMarked: false },
        { text: 'Sample Text 11', isFree: false, isMarked: false },
        { text: 'Sample Text 12', isFree: false, isMarked: false },
        { text: 'FREE: People Fight', isFree: true, isMarked: false },
        { text: 'Sample Text 13', isFree: false, isMarked: false },
        { text: 'Sample Text 14', isFree: false, isMarked: false },
        { text: 'Sample Text 15', isFree: false, isMarked: false },
        { text: 'Sample Text 16', isFree: false, isMarked: false },
        { text: 'Sample Text 17', isFree: false, isMarked: false },
        { text: 'Sample Text 18', isFree: false, isMarked: false },
        { text: 'Sample Text 19', isFree: false, isMarked: false },
        { text: 'Sample Text 20', isFree: false, isMarked: false },
        { text: 'Sample Text 21', isFree: false, isMarked: false },
        { text: 'Sample Text 22', isFree: false, isMarked: false },
        { text: 'Sample Text 23', isFree: false, isMarked: false },
        { text: 'Sample Text 24', isFree: false, isMarked: false },
      ],
    }
  },
  methods: {
    toggleCell(index) {
      if (!this.cells[index].isFree) {
        this.cells[index].isMarked = !this.cells[index].isMarked
      }
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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

.bingo-cell.free {
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
