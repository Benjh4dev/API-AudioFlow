#imagen de Node.js 18 en Alpine Linux
FROM node:18-alpine

#directorio de trabajo en /app
WORKDIR /app

# Copiado el archivo package.json y package-lock.json 
COPY package*.json ./

# Instalación de dependencias
RUN npm install

# Copiado el resto del código fuente
COPY . .

# Exponer el puerto #
EXPOSE 80

COPY credentials.json /app/src/firebase/

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
