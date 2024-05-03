import swaggerJsdoc from 'swagger-jsdoc'

// Definir opciones para swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto Final Nivel 2 - Ramses Ruiz',
      version: '1.0.0',
      description: 'API RESTful utilizando Express.js y MySQL para crear una plataforma de blogging interactiva'
    }
  },
  apis: ['./routes/*.js'] // Ruta(s) donde se encuentran tus archivos de definición de ruta
}

// Inicializar swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
