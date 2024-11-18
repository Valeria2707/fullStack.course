import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  console.log(`Index request : ${req.body}`);

  res.send('Hello, TypeScript with Hot Reload!');
});

app.post('/demo', async (req: Request, res: Response) => {
  console.log(`Demo request: ${JSON.stringify(req.body)}`);

  const data = await req.body;

  try {
    data.key = data['text'].toUpperCase() + 'response';
  } catch (error) {
    console.error('bad request', error);

    res.status(400);
    res.send('bad request');
    return;
  }

  res.send(JSON.stringify(data));
});

app.post('/demo/:id', (req: Request, res: Response) => {
  console.log(`Demo request ${req.params?.id}`);

  res.send(`You asked for key ${req.params?.id}`);
})

app.get('/search', (req: Request, res: Response) => {
  const query = req.query.q;

  console.log(`Search request ${query}`);

  res.send('You asked for search');
})

app.get('/users', (req: Request, res: Response) => {
  console.log(`User request ${req}`);

  res.send('You asked for users');
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});