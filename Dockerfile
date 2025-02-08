# Usa una imagen de Node.js para construir el frontend
FROM node:18 AS builder

WORKDIR /app

# Copia los archivos del frontend
COPY package*.json ./
RUN npm install
COPY . .

# Construye la aplicación de Vite
RUN npm run build

# Usa una imagen ligera de Nginx para servir el frontend
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Elimina los archivos por defecto de Nginx y copia los archivos del frontend
RUN rm -rf ./*
COPY --from=builder /app/dist ./

# Exponer el puerto en el que corre Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
