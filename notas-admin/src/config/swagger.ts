import { resolve } from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load(
  resolve(__dirname, '..', '..', 'api', 'swagger.yaml'),
);

export { swaggerUi, swaggerDocument };
