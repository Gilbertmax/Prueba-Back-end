# Prueba Backend Defontana - Node.js y SQL Server

Este proyecto es una prueba técnica para el puesto de Full-Stack en Defontana. Consiste en una aplicación Node.js que se conecta a una base de datos SQL Server, obtiene datos de ventas de los últimos 30 días, los procesa y muestra los resultados por consola.

---

## **Requerimientos**

1. Conectar a una base de datos SQL Server y obtener las ventas de los últimos 30 días.
2. Procesar los datos para:
   - Calcular el total de ventas (monto y cantidad).
   - Encontrar la venta más alta (día, hora y monto).
   - Identificar el producto con mayor monto total de ventas.
   - Identificar el local con mayor monto de ventas.
   - Determinar la marca con mayor margen de ganancias.
   - Encontrar el producto más vendido en cada local.
3. Imprimir los resultados por consola.

---

## **Estructura del Proyecto**
PRUEBA-BACK/
├── node_modules/ # Dependencias de Node.js (no se sube a GitHub)
├── src/
│ ├── config/
│ │ └── db.js # Configuración de la base de datos
│ ├── controllers/
│ │ └── salesController.js # Lógica de negocio
│ ├── services/
│ │ └── salesService.js # Interacción con la base de datos
│ └── utils/ # Funciones auxiliares (vacío por ahora)
├── .env # Variables de entorno (no se sube a GitHub)
├── .gitignore # Archivo para ignorar node_modules y .env
├── app.js # Punto de entrada de la aplicación
├── package.json # Dependencias y scripts del proyecto
├── package-lock.json # Versiones exactas de las dependencias
└── README.md # Documentación del proyecto


---

## **Configuración**

### **1. Clonar el Repositorio**

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/prueba-backend-defontana.git
cd prueba-backend-defontana 

Instala las dependencias necesarias usando npm:
npm install

Crea un archivo .env en la raíz del proyecto y agrega las credenciales de la base de datos.

Una vez configurado, ejecuta el proyecto con el siguiente comando:
node app.js

Funcionalidades
1. Conexión a la Base de Datos
El archivo src/config/db.js contiene la configuración para conectarse a la base de datos SQL Server usando el paquete mssql.

2. Obtención de Datos
El archivo src/services/salesService.js contiene la lógica para obtener las ventas de los últimos 30 días mediante una consulta SQL.

3. Procesamiento de Datos
El archivo src/controllers/salesController.js contiene las funciones para procesar los datos de ventas, como calcular el total de ventas, encontrar la venta más alta, identificar el producto con mayor monto total de ventas, etc.

4. Impresión de Resultados
Los resultados se imprimen en la consola cuando ejecutas el proyecto.

Al ejecutar el proyecto, verás algo como esto en la consola:
    Total de ventas: { totalAmount: 150000, totalSales: 50 }
    Venta más alta: { Fecha: '2023-10-01', Hora: '14:30', Total: 5000 }
    Producto con mayor monto total de ventas: { Producto: 'Producto A', TotalLinea: 30000 }
    Local con mayor monto de ventas: { Local: 'Local 1', Total: 75000 }
    Marca con mayor margen de ganancias: { Marca: 'Marca X', Margen: 20000 }
    Producto más vendido en cada local:
    - Local 1: { Producto: 'Producto A', Cantidad: 100 }
    - Local 2: { Producto: 'Producto B', Cantidad: 80 }

Dependencias
express: Framework para crear el servidor API.

mssql: Paquete para conectarse a SQL Server.

dotenv: Para manejar variables de entorno.

Autor
[Gilberto Gonzalez]
[gilbertoglez1999@hotmail.com]
[https://github.com/Gilbertmax]
