import api from '../api/client';
import { fallbackProducts } from './fallbackProducts';

const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

/**
 * Loads products for the public site.
 * GitHub Pages: uses local fallback data (no backend).
 * Set VITE_USE_BACKEND=true in .env when running with Express + MySQL.
 */
export async function loadProducts() {
  if (!USE_BACKEND) {
    return fallbackProducts;
  }

  try {
    const { data } = await api.get('/products', { timeout: 4000 });
    return Array.isArray(data) && data.length > 0 ? data : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export function getProductById(id) {
  return fallbackProducts.find((p) => p.id === Number(id)) ?? null;
}

export { fallbackProducts };
