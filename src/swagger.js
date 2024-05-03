import swaggerJsdoc from 'swagger-jsdoc'

// Definir opciones para swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Una API de ejemplo con Swagger'
    }
  },
  apis: ['./routes/*.js'] // Ruta(s) donde se encuentran tus archivos de definición de ruta
}

// Inicializar swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
