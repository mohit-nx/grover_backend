import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import connectDatabase from './libs/database';
import notFound from './middlewares/notFound';

import config from './config';

const app = express()
const initRoutes = () => {
	app.use('/api/', routes);
	app.use("/", express.static("build"))
	app.use("*", (req, res) => res.cookie('url', req.originalUrl).redirect('/'))

	app.use(notFound);
	app.use(errorHandler);
}

const initBodyParser = () => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
}


const initCors = () => {
	app.use(
		cors({
			optionsSuccessStatus: 200,
			origin: config.corsOrigin
			// credentials: true,
		})
	);
}

const initMorgan = () => {
	app.use(morgan('dev'))
}

const initHelmet = () => {
	app.use(helmet());
}

const init = () => {
	initBodyParser();
	initCors();
	initMorgan();
	initHelmet();
	initRoutes();
	
}

const bootStarp = (mongoUri, port) => {
	init();
	connectDatabase(mongoUri)
		.then(() => {
			app.listen(port, () => console.log(`App listening on port ${port}!`))
		})
		.catch(err => {
			console.log(err);
		})
}

export { bootStarp };


