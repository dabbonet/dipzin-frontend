import { request } from "http";
const qs = require('qs');

export const getStream = () => {
    const query = qs.stringify(
        {
            filters: {
                is_published: {
                    $eq: true
                }
            },
            populate: {
                screens: {
                    populate: {
                        screen: {
                            fields: ['formats']
                        }
                    },
                    filters: {
                        is_showcase: {
                            $eq: true,
                        },
                    },
                },
            },
            pagination: {
                page: 1,
                pageSize: 10
            }
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )
    console.log(query)
    const req = request(`https://rah.dipzin.com/api/apps?${query}`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(data); // log the response data
            return data;
        });
    });

    req.end();
}