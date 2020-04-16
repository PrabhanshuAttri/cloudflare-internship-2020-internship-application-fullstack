class ABTest {
  constructor(n) {
    this.spec = this.generateSpecs(n);
  }

  generateSpecs(n) {
    const spec = {};
    for (let i = 0; i < n; i += 1) {
      spec[i] = 1 / parseFloat(n);
    }
    return spec;
  }

  getWeightedRandom() {
    const rand = Math.random();
    let sum = 0;
    let lastKey = null;
    for (const [key, value] of Object.entries(this.spec)) {
      sum += value;
      lastKey = key;
      if (rand <= sum) return key;
    }
    return lastKey;
  }

  getVariant() {
    return this.getWeightedRandom();
  }
}

export default ABTest;
