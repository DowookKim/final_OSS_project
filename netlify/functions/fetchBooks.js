const axios = require('axios');

exports.handler = async function (event, context) {
    try {
        // Aladin API를 호출
        const response = await axios.get('http://www.aladin.co.kr/ttb/api/ItemList.aspx', {
            params: {
                ttbkey: 'ttbsk10314030926001', // 여기서 ttbkey 값을 사용
                QueryType: 'ItemNewAll',
                MaxResults: 10,
                start: 1,
                SearchTarget: 'Book',
                output: 'xml',
                Version: '20131101'
            }
        });

        // 성공 시 API 데이터를 반환
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/xml',
            },
            body: response.data,
        };
    } catch (error) {
        console.error("Error fetching books", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching data' }),
        };
    }
};
