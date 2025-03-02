const { pool, poolConnect } = require('../config/db');

const getSalesData = async () => {
  await poolConnect;
  const request = pool.request();
  const result = await request.query(`
    SELECT 
      V.Fecha, 
      V.Total, 
      VD.TotalLinea, 
      P.Nombre AS Producto, 
      L.Nombre AS Local, 
      M.Nombre AS Marca, 
      P.Precio, 
      P.Costo
    FROM Venta V
    JOIN VentaDetalle VD ON V.ID_Venta = VD.ID_Venta
    JOIN Producto P ON VD.ID_Producto = P.ID_Producto
    JOIN Local L ON V.ID_Local = L.ID_Local
    JOIN Marca M ON P.ID_Marca = M.ID_Marca
    WHERE V.Fecha >= DATEADD(day, -30, GETDATE());
  `);
  return result.recordset;
};

module.exports = {
  getSalesData,
};