AUTENTICACION
POST /api/auth/login
Descripcion: permite al usuario autenticarse y recibir un token JWT.

Headers:
{
  "Content-Type": "application/json"
}
Request Body:
{
  "email": "admin@example.com",
  "password": "password123"
}
Response(200 ok)
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  },
  "error": null
}

Errores posibles
401 Unauthorized → Credenciales incorrectas
400 Bad Request → Campos faltantes 


Dashboard - KPIs

GET /api/dashboard/kpis
Descripcion : Devuelve métricas principales: ventas totales, número de órdenes, ticket promedio, top 5 productos.

Headers :
{
  "Authorization": "Bearer <token>"
}

Query Parameters:

start_date (opcional)
end_date (opcional)

Response(200 ok)
{
  "data": {
    "total_sales": 10000,
    "orders_count": 50,
    "average_ticket": 200,
    "top_products": [
      {"name": "Producto A", "quantity": 10},
      {"name": "Producto B", "quantity": 8}
    ]
  },
  "error": null
}


Dashboard - top-products

GET /api/dashboard/top-products
Descripcion : Devuelve métricas principales: ventas totales, número de órdenes, ticket promedio, top 5 productos.

Headers :
{
  "Authorization": "Bearer <token>"
}

Query Parameters:

Response(200 ok)
{
  "data": {
    "total_sales": 10000,
    "orders_count": 50,
    "average_ticket": 200,
    "top_products": [
      {"name": "Producto A", "quantity": 10},
      {"name": "Producto B", "quantity": 8}
    ]
  },
  "error": null
}



Dashboard - sales

GET /api/dashboard/sales
Descripcion : Devuelve métricas principales: ventas totales, .

Headers :
{
  "Authorization": "Bearer <token>"
}

Query Parameters:

Response(200 ok)
{
  "data": {
    "total_sales": 10000,
    "orders_count": 50,
    "average_ticket": 200,
    "top_products": [
      {"name": "Producto A", "quantity": 10},
      {"name": "Producto B", "quantity": 8}
    ]
  },
  "error": null
}
