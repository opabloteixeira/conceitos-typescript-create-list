import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 App lauched... Port 3333');
});
