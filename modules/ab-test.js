/** Class for ABTests */
class ABTest {
  /**
   * Create an ABTest.
   * @param {number} n - The number of variants.
   */
  constructor(n) {
    // ToDo: implement non uniform weights for variants
    this.spec = this.generateSpecs(n);
  }

  /**
   * Generate variants and their weights
   * @param {number} n - The number of variants
   */
  generateSpecs(n) {
    const spec = {};
    for (let i = 0; i < n; i += 1) {
      spec[i] = 1 / parseFloat(n);
    }
    return spec;
  }

  /**
   * Select a variant index from sample space, using weighted randomness
   */
  getVariant() {
    const rand = Math.random();
    let sum = 0;
    // fallback
    let lastKey = null;
    for (const [key, value] of Object.entries(this.spec)) {
      sum += value;
      lastKey = key;
      if (rand <= sum) return key;
    }
    return lastKey;
  }
}

export default ABTest;
