const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');

module.exports = {
  Weight: {
    value: (raw) => parseFloat(raw),
    unit: () => {
      const unit = getConfig('shop.weightUnit', 'kg');
      return unit;
    },
    text: (raw) => {
      const weight = parseFloat(raw);
      const unit = getConfig('shop.weightUnit', 'kg');
      // Localize the weight
      return `${weight} ${unit}`;
    }
  }
};
