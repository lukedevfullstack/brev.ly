import { fakerPT_BR as faker } from "@faker-js/faker";

export const makeUrl = async (overrides: Partial<any> = {}) => {
  return Promise.resolve({
    id: faker.string.uuid(),
    originalUrl: overrides.originalUrl || faker.internet.url(),
    shortUrl: overrides.shortUrl || faker.string.alphanumeric(8).toLowerCase(),
    visitCount: 0,
    createdAt: overrides.createdAt || new Date(),
    lastVisited: null,
  });
};