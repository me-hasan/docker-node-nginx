import { publicTestNamespace } from './namespaces/publicTestNamespace.js';

import socketAuthMiddleware from './middleware/socketAuthMiddleware.js';
import { portfolioPerformanceNamespace } from './namespaces/portfolioPerformanceNamespace.js';
import { portfolioNamespace } from './namespaces/portfolioNamespace.js';
import { trendingListNamespace } from './namespaces/trendingListNamespace.js';
import { pricePerformanceNamespace } from './namespaces/pricePerformanceNamespace.js';

/**
 * Setup public namespace
 * ======================
 */
export const setupPublicNamespace = (namespace) => {
  publicTestNamespace(namespace);
  trendingListNamespace(namespace);
  pricePerformanceNamespace(namespace);
};


/**
 * Setup private namespace
 * =======================
 */
export const setupPrivateNamespace = (namespace) => {
  namespace.use(socketAuthMiddleware);
  portfolioPerformanceNamespace(namespace);
  portfolioNamespace(namespace)
};
