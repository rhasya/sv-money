export const accountTypes = [
	{ id: 1, text: '자본' },
	{ id: 2, text: '자산' },
	{ id: 3, text: '부채' },
	{ id: 4, text: '수익' },
	{ id: 5, text: '비용' }
];

export const categories = [
	{ code: 'CREDIT_CARD', text: '신용카드', parent: 3 },
	{ code: 'DEBT', text: '대출', parent: 3 },
	{ code: 'BANK', text: '은행', parent: 2 },
	{ code: 'POINT', text: '포인트', parent: 2 }
];
