<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
          sans-serif;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d1a1a 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
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
  </head>
  <body>
    <div class="page-container">
      <div class="bingo-card">
        <div class="bingo-header">
          <h1 class="bingo-title">BINGO</h1>
          <p class="bingo-subtitle">Click to mark squares</p>
        </div>

        <div class="bingo-grid">
          <div class="bingo-cell">Sample Text 1</div>
          <div class="bingo-cell">Sample Text 2</div>
          <div class="bingo-cell">Sample Text 3</div>
          <div class="bingo-cell">Sample Text 4</div>
          <div class="bingo-cell">Sample Text 5</div>

          <div class="bingo-cell">Sample Text 6</div>
          <div class="bingo-cell">Sample Text 7</div>
          <div class="bingo-cell">Sample Text 8</div>
          <div class="bingo-cell">Sample Text 9</div>
          <div class="bingo-cell">Sample Text 10</div>

          <div class="bingo-cell">Sample Text 11</div>
          <div class="bingo-cell">Sample Text 12</div>
          <div class="bingo-cell free">FREE</div>
          <div class="bingo-cell">Sample Text 13</div>
          <div class="bingo-cell">Sample Text 14</div>

          <div class="bingo-cell">Sample Text 15</div>
          <div class="bingo-cell">Sample Text 16</div>
          <div class="bingo-cell">Sample Text 17</div>
          <div class="bingo-cell">Sample Text 18</div>
          <div class="bingo-cell">Sample Text 19</div>

          <div class="bingo-cell">Sample Text 20</div>
          <div class="bingo-cell">Sample Text 21</div>
          <div class="bingo-cell">Sample Text 22</div>
          <div class="bingo-cell">Sample Text 23</div>
          <div class="bingo-cell">Sample Text 24</div>
        </div>

        <div class="bingo-footer">Click any square to toggle selection</div>
      </div>
    </div>

    <script>
      // Add click functionality to toggle marked state
      document.querySelectorAll('.bingo-cell:not(.free)').forEach((cell) => {
        cell.addEventListener('click', function () {
          this.classList.toggle('marked')
        })
      })
    </script>
  </body>
</template>
