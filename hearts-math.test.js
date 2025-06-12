// Exemplo de função matemática do hearts.js
function heartEquation(t) {
  // Parametric heart equation
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x, y };
}

// Testes usando Jest
describe('heartEquation', () => {
  test('t = 0 retorna ponto correto', () => {
    const { x, y } = heartEquation(0);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(5);
  });

  test('t = Math.PI retorna ponto correto', () => {
    const { x, y } = heartEquation(Math.PI);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(-17);
  });

  test('t = Math.PI/2 retorna x próximo de máximo positivo', () => {
    const { x } = heartEquation(Math.PI / 2);
    expect(x).toBeCloseTo(16, 1);
  });

  test('t = 3*Math.PI/2 retorna x próximo de máximo negativo', () => {
    const { x } = heartEquation(3 * Math.PI / 2);
    expect(x).toBeCloseTo(-16, 1);
  });
});