const salesService = require('../services/salesService');

const calculateTotalSales = (salesData) => {
  const totalAmount = salesData.reduce((sum, sale) => sum + sale.TotalLinea, 0);
  const totalSales = salesData.length;
  return { totalAmount, totalSales };
};

const findHighestSale = (salesData) => {
  const highestSale = salesData.reduce((max, sale) => 
    sale.Total > max.Total ? sale : max
  );
  return {
    fecha: highestSale.Fecha,
    monto: highestSale.Total,
  };
};

const findProductWithHighestSales = (salesData) => {
  const productSales = salesData.reduce((acc, sale) => {
    acc[sale.Producto] = (acc[sale.Producto] || 0) + sale.TotalLinea;
    return acc;
  }, {});
  const topProduct = Object.entries(productSales).reduce((max, [product, total]) => 
    total > max.total ? { product, total } : max
  , { product: '', total: 0 });
  return topProduct;
};

const findStoreWithHighestSales = (salesData) => {
  const storeSales = salesData.reduce((acc, sale) => {
    acc[sale.Local] = (acc[sale.Local] || 0) + sale.Total;
    return acc;
  }, {});
  const topStore = Object.entries(storeSales).reduce((max, [store, total]) => 
    total > max.total ? { store, total } : max
  , { store: '', total: 0 });
  return topStore;
};

const findBrandWithHighestProfit = (salesData) => {
  const brandProfit = salesData.reduce((acc, sale) => {
    const profit = (sale.Precio - sale.Costo) * (sale.TotalLinea / sale.Precio);
    acc[sale.Marca] = (acc[sale.Marca] || 0) + profit;
    return acc;
  }, {});
  const topBrand = Object.entries(brandProfit).reduce((max, [brand, profit]) => 
    profit > max.profit ? { brand, profit } : max
  , { brand: '', profit: 0 });
  return topBrand;
};

const findBestSellingProductPerStore = (salesData) => {
  const storeProducts = salesData.reduce((acc, sale) => {
    if (!acc[sale.Local]) acc[sale.Local] = {};
    acc[sale.Local][sale.Producto] = (acc[sale.Local][sale.Producto] || 0) + (sale.TotalLinea / sale.Precio);
    return acc;
  }, {});
  const bestSellingProducts = Object.entries(storeProducts).map(([store, products]) => {
    const topProduct = Object.entries(products).reduce((max, [product, quantity]) => 
      quantity > max.quantity ? { product, quantity } : max
    , { product: '', quantity: 0 });
    return { store, ...topProduct };
  });
  return bestSellingProducts;
};

const getSalesData = async () => {
  try {
    const salesData = await salesService.getSalesData();

    const totalSales = calculateTotalSales(salesData);
    console.log('Total de ventas (últimos 30 días):');
    console.log(`- Monto total: $${totalSales.totalAmount}`);
    console.log(`- Cantidad total de ventas: ${totalSales.totalSales}`);

    const highestSale = findHighestSale(salesData);
    console.log('\nVenta más alta:');
    console.log(`- Fecha: ${highestSale.fecha}`);
    console.log(`- Monto: $${highestSale.monto}`);

    const topProduct = findProductWithHighestSales(salesData);
    console.log('\nProducto con mayor monto total de ventas:');
    console.log(`- Producto: ${topProduct.product}`);
    console.log(`- Monto total: $${topProduct.total}`);

    const topStore = findStoreWithHighestSales(salesData);
    console.log('\nLocal con mayor monto de ventas:');
    console.log(`- Local: ${topStore.store}`);
    console.log(`- Monto total: $${topStore.total}`);

    const topBrand = findBrandWithHighestProfit(salesData);
    console.log('\nMarca con mayor margen de ganancias:');
    console.log(`- Marca: ${topBrand.brand}`);
    console.log(`- Margen de ganancias: $${topBrand.profit}`);

    const bestSellingProducts = findBestSellingProductPerStore(salesData);
    console.log('\nProducto más vendido en cada local:');
    bestSellingProducts.forEach(({ store, product, quantity }) => {
      console.log(`- Local: ${store}, Producto: ${product}, Cantidad vendida: ${quantity}`);
    });

  } catch (error) {
    console.error('Error al procesar los datos de ventas:', error);
  }
};

module.exports = {
  getSalesData,
};