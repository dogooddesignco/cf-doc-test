import express from 'express';
import intakeRouter from '@/routes/intake';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(intakeRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
