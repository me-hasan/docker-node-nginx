const BASE_API_PATH = '/api/socket';

function createNamespacePaths(basePath, endpoints) {
    return Object.keys(endpoints).reduce((paths, key) => {
        paths[key] = `${basePath}/${endpoints[key]}`;
        return paths;
    }, {});
}

 /**
 * Setup public routes
 * =====================
 */
const publicEndpoints = {
    test: 'public/test',
    trendingList: 'public/trending-list',
    pricePerformance: 'public/price-performance',
};

/**
 * Setup private routes
 * =======================
 */
const privateEndpoints = {
    portfolioPerformance: 'private/portfolio-performance',
    portfolio: 'private/portfolio'
};

export const PUBLIC_NAMESPACE_PATHS = createNamespacePaths(BASE_API_PATH, publicEndpoints);
export const PRIVATE_NAMESPACE_PATHS = createNamespacePaths(BASE_API_PATH, privateEndpoints);
