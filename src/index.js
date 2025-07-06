const express = require('express');
// Importa las dependencias necesarias
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');

const app = express();
const port = 3000;

// Carga el archivo OpenAPI (Swagger) en formato YAML
// Asegúrate de que el archivo openapi.yaml esté en la misma carpeta que este
const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true, // Habilita la validación de solicitudes
    validateResponses: true, // Habilita la validación de respuestas
    ignorePaths: /docs/,
  }),
);  

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});


app.get('/hello', (req, res) => {
  res.json({message:'Hello World!'});
});

// Controlo que se ejecute correctamente en el puerto especificado
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});