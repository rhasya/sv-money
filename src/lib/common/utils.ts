import { categories } from './consts';

export function getCategoryName(category?: string | null) {
	return categories.filter((c) => c.code === category)[0]?.text ?? '';
}

export function formatNumber(n: number | string | null) {
	if (!n) return null;
	if (typeof n === 'string') {
		return Intl.NumberFormat().format(parseFloat(n));
	} else {
		return Intl.NumberFormat().format(n);
	}
}
