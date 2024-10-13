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

//태그별 뱃지 스타일
export const matchTagStyle = (tag) => {
    if(tag === 'REPI' || tag === 'REHT') return 'badge bg-faded-danger'
    if(tag === 'LNQS' || tag === 'LTQS') return 'badge bg-faded-info'
    if(tag === 'RERV' || tag === 'CTRV' || tag === 'ITRV') return 'badge bg-faded-success'
};

export const getTagName = (tag) => {
    return tagMapping[tag] || tag;
};