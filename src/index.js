const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3000;

const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/hello', (req, res) => {
  res.json({message:'Hello World!'});
});

// Controlo que se ejecute correctamente en el puerto especificado
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});