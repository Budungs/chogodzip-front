const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // 한국 시간 (KST)로 변환
    const offset = 9 * 60;
    const localDate = new Date(date.getTime() + offset * 60 * 1000);

    return localDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).replace(',', '');
};

export { formatDate };