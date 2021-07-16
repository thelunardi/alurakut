import { SiteClient } from 'datocms-client'

const getRequest = async (request, response) => {
    if (request.method === 'GET') {
        const token = process.env.NEXT_PUBLIC_TOKEN_CMS
        const client = new SiteClient(token)

        const records = await client.items.all({
            filter: {
                type: "community",
            },
        })
        response.json({
            data: records,
        })
        return
    }
    if (request.method === 'POST') {
        const token = process.env.NEXT_PUBLIC_TOKEN_CMS_FULL
        const itemTypeCommunity = process.env.NEXT_PUBLIC_COMMUNITY_ID
        const client = new SiteClient(token)

        async function createRecord() {
            const register = await client.items.create({
                itemType: itemTypeCommunity,
                ...request.body,
                slug: 'thelunardi',
            });

            response.json({
                data: register,
            })
        }

        await createRecord();
        return
    }

    return response.status(404).json({
        error: 'error'
    })
}

export default getRequest