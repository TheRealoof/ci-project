import dotenv from 'dotenv';

dotenv.config();

const getVariable = (name: string): string => {
  if (!process.env[name]) {
    throw new Error(`${name} environment variable is not defined`);
  }
  return process.env[name];
}

export default {
  port: getVariable('PORT'),
  apiBaseUrl: getVariable('API_BASE_URL'),
  discordClientId: getVariable('DISCORD_CLIENT_ID'),
  discordClientSecret: getVariable('DISCORD_CLIENT_SECRET'),
}
