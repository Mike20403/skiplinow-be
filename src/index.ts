import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/users.routes';
import cors, { CorsOptions } from 'cors';
import { envConfig } from '~/constants/config';
import { defaultErrorHandler } from '~/middlewares/error.middlewares';
import contentGeneratorRoutes from "~/routes/content-generator.routes";

const app = express();
const port = envConfig.port;

// Middleware for parsing JSON bodies
app.use(express.json());

const corsOptions: CorsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

// Routes
app.use('/users', userRoutes);
app.use('/content', contentGeneratorRoutes);

// Error handling middleware
app.use(defaultErrorHandler);

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
