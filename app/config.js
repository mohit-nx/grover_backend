import { config } from 'dotenv';
config();

const envVars = process.env;

const configurations = Object.freeze({
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URL,
  password: envVars.PASSWORD,
  secret: envVars.TOKEN_SECRET,
  corsOrigin: envVars.CORS_ORIGIN.split(',').map(origin => origin.trim()),
  smtpHost: envVars.SMTP_HOST,
  smtpPort: envVars.SMTP_PORT,
  smtpUser: envVars.SMTP_USER,
  smtpPassword: envVars.SMTP_PASSWORD,
  enableEmail: Boolean(envVars.ENABLE_EMAIL),
});

// console.log("::", configurations)

export default configurations;