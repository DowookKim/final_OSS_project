// netlify/functions/fetchBooks.js
const axios = require('axios');
const convert = require('xml-js');

exports.handler = async function (event, context) {
    try {
        const response = await axios.get('http://www.aladin.co.kr/ttb/api/ItemList.aspx', {
            params: {
                ttbkey: 'ttbsk10314030926001',
                QueryType: 'ItemNewAll',
                MaxResults: 10,
                start: 1,
                SearchTarget: 'Book',
                output: 'xml',
                Version: '20131101'
            }
        });
        const result = convert.xml2js(response.data, { compact: true, spaces: 2 });
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error fetching books'
        };
    }
};
