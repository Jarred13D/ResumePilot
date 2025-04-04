import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password', createdAt: new Date(), updatedAt: new Date() },
    { username: 'SunnyScribe', email: 'sunny@scribe.com', password: 'password', createdAt: new Date(), updatedAt: new Date() },
    { username: 'RadiantComet', email: 'radiant@comet.com', password: 'password', createdAt: new Date(), updatedAt: new Date() },
  ], { individualHooks: true });
};

