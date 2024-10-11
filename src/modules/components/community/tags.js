//태그
export const tagMapping = {
    'ALL' : '전체',
    'REPI': '부동산 정책/투자',
    'REHT': '부동산 핫이슈',
    'RERV': '부동산 후기',
    'CTRV': '계약/입주 후기',
    'ITRV': '인테리어 후기',
    'LNQS': '대출 질문',
    'LTQS': '분양/청약 질문'
};

export const getTagName = (tag) => {
    return tagMapping[tag] || tag;
};