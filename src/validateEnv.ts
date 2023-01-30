import * as dotenv from 'dotenv';
import * as joi from 'joi';
import * as path from 'path';

export const validateEnv = () => {
  dotenv.config({ path: path.join(__dirname, '../.env') });

  const envVarsSchema = joi
    .object()
    .keys({
      PORT: joi.number().positive().required(),
      DB_HOST: joi.string().required().hostname(),
      DB_TYPE: joi.string().required().valid('postgres'),
      DB_USER: joi.string().required(),
      DB_NAME: joi.string().required(),
      DB_PASSWORD: joi.string().required().min(3),
      DB_PORT: joi.number().port(),
      DB_IS_SYNCHRONIZED: joi.boolean().required(),
      DB_MIGRATIONS: joi.required(),
      DB_MIGRATIONS_DIR: joi.required(),
      DB_MIGRATIONS_RUN: joi.boolean().required(),
      DB_MIGRATIONS_TABLE_NAME: joi.string().required(),
    })
    .unknown();

  const { error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

  if (error != null) {
    throw new Error(error.message);
  }
};
