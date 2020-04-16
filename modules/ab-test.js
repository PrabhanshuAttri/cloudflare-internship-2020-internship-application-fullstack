class ABTest {
  constructor(n) {
    this.spec = this.generateSpecs(n);
  }

  generateSpecs(n) {
    const spec = {};
    for(let i = 0; i < n; i++) {
      spec[i] = 1/parseFloat(n);
    }
    return spec
  }

  getWeightedRandom() {
    const rand = Math.random();
    let sum = 0;
    for(let [key, value] of Object.entries(this.spec)) {
      sum += value;
      if (rand <= sum) return key;
    }
  }

  getVariant() {
    return this.getWeightedRandom();
  }
}

export default ABTest;
