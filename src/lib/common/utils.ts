import { categories } from './consts';

export function getCategoryName(category?: string | null) {
	return categories.filter((c) => c.code === category)[0]?.text ?? '';
}

export function formatNumber(n: number) {
	return Intl.NumberFormat().format(n);
}
