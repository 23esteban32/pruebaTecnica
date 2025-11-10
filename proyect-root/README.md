# Prueba Técnica Full-Stack JS

## 1. Resumen del proyecto
Este proyecto es una aplicación web **full-stack** que incluye:  

- **Backend**: Node.js + Express + TypeScript + MySQL  
- **Frontend**: Angular 18 + Angular Material + Chart.js/ECharts  
- **Dashboard**: KPIs y gráficos de ventas, top productos y métodos de pago  
- **Autenticación**: JWT con expiración de 60 minutos  

La aplicación sigue una arquitectura **SPA** y se diseñó para ser **rápida de levantar y fácil de mantener**.

---

## 2. Prerrequisitos

- Node.js ≥ 18  
- npm 
- MySQL o Docker (opcional)  
- Angular CLI 18  

---


## 3. Configuración

# 1. Clonar el repositorio:

git clone git@github.com:23esteban32/pruebaTecnica.git  (ssh)
git clone https://github.com/23esteban32/pruebaTecnica.git  (https)
cd proyect-root/

# 2. Copiar .env.example y configurarlo:

cd .env.example .env

# 3. isntalar dependencias:
Backend

- cd backend
- npm install 

Frontend

- cd frontend
- npm install

# 4. Arranque rapido

- cd backend
- npm run dev

Fronted: 
- cd frontend
- ng serve

Backend corre en: http://localhost:3000

Frontend corre en: http://localhost:4200


## 5 Usuario prueba

- Email : admin@test.com
- contraseña : 123456

## 6 Rutas principales / Contratos basicos
# Auth 
- Post /api/auth/login
Body: { "email": "...", "password": "..." }
Response: { data: { token: "..." } }

# Dashboard:
* GET api/dashboard/kpis
* GET api/dashboard/top-products
* GET api/dashboard/sales
* GET api/dashboard/payment-methods

## 7. Decisiones tecnicas

- Stack: Node.js + Express + Angular 18.

- Seguridad: JWT con 60 min de expiración, bcrypt para contraseñas.

- Gráficos: Chart.js por compatibilidad con Angular.

- Paginación: Backend, para eficiencia.

## Problemas conocidos y furutos trabajos

# Problemas conocidos:
- Filtros limitados en dashboard:

- Actualmente, los filtros de fecha funcionan a nivel de día/mes pero no por hora o minuto.

- Datos de prueba limitados:

- Los seeds incluyen un número reducido de usuarios, productos y órdenes, por lo que los KPIs son representativos pero no de producción.

- No hay tests automáticos implementados:

- No hay Jest (API) ni Cypress (Frontend) por tiempo, lo que significa que no hay validación automatizada de endpoints ni UI.

- Datos estatcos y dependientes del seed.

# Futuros trabajos

- Mejorar filtros de dashhboard.

- Mejorar UI/UX animaciones y responsive.

- CRUD de manera dinamica para datos principales.