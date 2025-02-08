# Usar una imagen oficial de Node.js
FROM node:18

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del backend al contenedor
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto en el que corre el backend
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "server.js"]
