const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MONTH_MAP = {
  january: 1,
  jan: 1,
  february: 2,
  feb: 2,
  march: 3,
  mar: 3,
  april: 4,
  apr: 4,
  may: 5,
  june: 6,
  jun: 6,
  july: 7,
  jul: 7,
  august: 8,
  aug: 8,
  september: 9,
  sep: 9,
  sept: 9,
  october: 10,
  oct: 10,
  november: 11,
  nov: 11,
  december: 12,
  dec: 12,
};

function parseMonthToken(token) {
  if (!token) return null;
  const key = token.trim().toLowerCase().replace(/\./g, '');
  return MONTH_MAP[key] ?? null;
}

/** Parse "July – August" or "December – March" into month numbers 1–12 */
export function parseSeasonMonths(seasonStr) {
  if (!seasonStr || typeof seasonStr !== 'string') return [];

  const normalized = seasonStr.replace(/[–—]/g, '-');
  const parts = normalized.split('-').map((s) => s.trim()).filter(Boolean);

  if (parts.length === 0) return [];

  if (parts.length === 1) {
    const single = parseMonthToken(parts[0]);
    return single ? [single] : [];
  }

  const start = parseMonthToken(parts[0]);
  const end = parseMonthToken(parts[parts.length - 1]);
  if (!start || !end) return [];

  const months = [];
  let current = start;
  let guard = 0;

  while (guard < 13) {
    months.push(current);
    if (current === end) break;
    current = current === 12 ? 1 : current + 1;
    guard += 1;
  }

  return months;
}

export function isProductInSeason(product, date = new Date()) {
  const month = date.getMonth() + 1;
  return parseSeasonMonths(product.season).includes(month);
}

export function getSeasonStartMonth(seasonStr) {
  const months = parseSeasonMonths(seasonStr);
  return months[0] ?? null;
}

function monthsUntil(targetMonth, currentMonth) {
  if (targetMonth === currentMonth) return 0;
  if (targetMonth > currentMonth) return targetMonth - currentMonth;
  return 12 - currentMonth + targetMonth;
}

export function getUpcomingHarvests(products, date = new Date(), withinMonths = 4) {
  const currentMonth = date.getMonth() + 1;

  return products
    .filter((p) => !isProductInSeason(p, date))
    .map((p) => {
      const start = getSeasonStartMonth(p.season);
      return {
        product: p,
        monthsUntil: start ? monthsUntil(start, currentMonth) : 99,
        startMonth: start,
      };
    })
    .filter((item) => item.monthsUntil > 0 && item.monthsUntil <= withinMonths)
    .sort((a, b) => a.monthsUntil - b.monthsUntil || a.product.name.localeCompare(b.product.name));
}

export function getSeasonStatus(product, date = new Date()) {
  if (isProductInSeason(product, date)) {
    return {
      status: 'available',
      label: 'Currently Available',
      icon: '✓',
    };
  }

  const start = getSeasonStartMonth(product.season);
  const monthName = start ? MONTH_NAMES[start - 1] : 'next season';

  return {
    status: 'upcoming',
    label: `Next harvest begins in ${monthName}`,
    icon: '⏳',
  };
}

export function formatCurrentMonthYear(date = new Date()) {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function getProductEmoji(product) {
  const cat = (product.category || '').toLowerCase();
  if (cat.includes('apple')) return '🍎';
  if (cat.includes('pear')) return '🍐';
  if (cat.includes('peach')) return '🍑';
  if (cat.includes('exotic') || product.name?.toLowerCase().includes('persimmon')) return '🟠';
  if (cat.includes('root')) return '🌱';
  return '🍃';
}

export function isFruitProduct(product) {
  const cat = (product.category || '').toLowerCase();
  return !cat.includes('root');
}

export function normalizeCategory(category) {
  const c = (category || '').toLowerCase().trim();
  if (c === 'pear') return 'pears';
  if (c === 'apple' || c === 'apples') return 'apples';
  if (c === 'peach' || c === 'peaches') return 'peaches';
  if (c.includes('root')) return 'rootstocks';
  if (c.includes('exotic')) return 'exotic fruits';
  return c;
}

export function productMatchesCategory(product, filterId) {
  if (filterId === 'all') return true;
  if (filterId === 'in-season') return isProductInSeason(product);
  return normalizeCategory(product.category) === filterId;
}

export { MONTH_NAMES, MONTH_SHORT };
