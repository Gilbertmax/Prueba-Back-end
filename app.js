const salesController = require('./src/controllers/salesController');

(async () => {
  await salesController.getSalesData();
})();