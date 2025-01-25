import 'dotenv/config';

import * as joi from 'joi';
import * as process from 'node:process';

interface EnvVariables {
  PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
})
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Validation error: ${error.message}`);
}

const envVariables: EnvVariables = value;
export const envs = {
  port: envVariables.PORT,
};