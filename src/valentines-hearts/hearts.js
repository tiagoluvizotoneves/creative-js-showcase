// Seleciona o elemento canvas e obtém o contexto 2D para desenhar
const canvas = document.getElementById('heartsRain');
const ctx = canvas.getContext('2d');

// Define largura e altura do canvas para ocupar toda a janela
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Atualiza o tamanho do canvas quando a janela for redimensionada
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

/**
 * Desenha um coração na posição (x, y) com o tamanho e cor especificados.
 * @param {number} x - Posição horizontal do coração.
 * @param {number} y - Posição vertical do coração.
 * @param {number} size - Tamanho do coração.
 * @param {string} color - Cor de preenchimento do coração.
 */
function drawHeart(x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);

  // Metade esquerda do coração
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
  ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size / 1.2, x, y + size);

  // Metade direita do coração
  ctx.bezierCurveTo(x, y + size / 1.2, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = "#fff0f5";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.restore();
}

/**
 * Classe que representa um coração animado caindo na tela.
 */
class Heart {
  constructor() {
    // Define a posição inicial aleatória no eixo X
    this.x = Math.random() * width;
    // Começa acima do topo da tela, com variação aleatória
    this.y = -20 - Math.random() * height / 2;
    // Define tamanho aleatório para cada coração
    this.size = 16 + Math.random() * 22;
    // Velocidade de queda aleatória
    this.speed = 1 + Math.random() * 2.2;
    // Oscilação para o movimento lateral (fase inicial aleatória)
    this.oscillation = Math.random() * 2 * Math.PI;
    // Amplitude do movimento lateral (sway)
    this.sway = 0.7 + Math.random() * 0.6;
    // Cor aleatória entre rosa e vermelho
    this.color = Math.random() < 0.5 ? "#e63950" : "#ff69b4";
  }

  /**
   * Atualiza a posição do coração para criar o efeito de animação.
   */
  update() {
    // Move para baixo conforme a velocidade individual
    this.y += this.speed;
    // Movimento lateral suave usando seno
    this.x += Math.sin(this.y / 25 + this.oscillation) * this.sway;

    // Se sair da parte inferior da tela, reinicia acima do topo
    if (this.y > height + this.size) {
      this.x = Math.random() * width;
      this.y = -20;
    }
  }

  /**
   * Desenha o coração na posição atual.
   */
  draw() {
    drawHeart(this.x, this.y, this.size, this.color);
  }
}

// Cria um array com vários corações animados
let hearts = [];
for (let i = 0; i < 40; i++) {
  hearts.push(new Heart());
}

/**
 * Função principal de animação: limpa a tela, atualiza e desenha todos os corações.
 */
function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let heart of hearts) {
    heart.update();
    heart.draw();
  }
  requestAnimationFrame(animate);
}

// Inicia a animação
animate();