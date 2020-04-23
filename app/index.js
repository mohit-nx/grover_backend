
import "core-js/stable";
import "regenerator-runtime/runtime";
import config from './config';
import { bootStarp } from './server';

bootStarp(config.mongoUri, config.port);
