Stack

Backend: Node.js + Express + TypeScript → Por rendimiento y tipado estricto

Base de datos: MySQL → Relacional, fácil de poblar con seed data

Frontend: Angular 18 + Angular Material → Componentes listos y responsive

Librería de gráficos: Chart.js → Simple, compatible con Angular

Seguridad

JWT con expiración 60 min → Balance entre seguridad y UX

bcrypt para hash de contraseñas

Sanitización de inputs → express-validator

Otros trade-offs

Paginación en servidor → Mejora performance, reduce carga del frontend

No se implementaron tests automáticos por tiempo → Recomendado para siguiente iteración

Docker Compose opcional → Facilita levantar DB + backend, pero no obligatorio

Problemas conocidos

Dashboard no soporta filtrado por hora (solo día/mes)

El seed de productos es limitado (solo datos de prueba)