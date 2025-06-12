const canvas = document.getElementById('chuvaCoracoes');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

function desenhaCoracao(x, y, tamanho, cor) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y + tamanho/4);
  ctx.bezierCurveTo(x, y, x - tamanho/2, y, x - tamanho/2, y + tamanho/4);
  ctx.bezierCurveTo(x - tamanho/2, y + tamanho/2, x, y + tamanho/1.2, x, y + tamanho);
  ctx.bezierCurveTo(x, y + tamanho/1.2, x + tamanho/2, y + tamanho/2, x + tamanho/2, y + tamanho/4);
  ctx.bezierCurveTo(x + tamanho/2, y, x, y, x, y + tamanho/4);
  ctx.closePath();
  ctx.fillStyle = cor;
  ctx.shadowColor = "#fff0f5";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.restore();
}

class Coracao {
  constructor() {
    this.x = Math.random() * width;
    this.y = -20 - Math.random() * height/2;
    this.tamanho = 16 + Math.random() * 22;
    this.velocidade = 1 + Math.random() * 2.2;
    this.oscilacao = Math.random() * 2 * Math.PI;
    this.direcao = 0.7 + Math.random() * 0.6;
    this.cor = Math.random() < 0.5 ? "#e63950" : "#ff69b4";
  }
  atualizar() {
    this.y += this.velocidade;
    this.x += Math.sin(this.y / 25 + this.oscilacao) * this.direcao;
    if (this.y > height + this.tamanho) {
      this.x = Math.random() * width;
      this.y = -20;
    }
  }
  desenhar() {
    desenhaCoracao(this.x, this.y, this.tamanho, this.cor);
  }
}

let coracoes = [];
for (let i = 0; i < 40; i++) {
  coracoes.push(new Coracao());
}

function animar() {
  ctx.clearRect(0, 0, width, height);
  for (let coracao of coracoes) {
    coracao.atualizar();
    coracao.desenhar();
  }
  requestAnimationFrame(animar);
}

animar();