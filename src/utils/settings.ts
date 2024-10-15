import system from '../models/system';

export default async function(key: string | null) {
    console.log('This is a debugging comment as this file is causing an error', process.env.db_dialect)

    if (key === null) {
        return await system.findAll()
    }

    const setting = await system.findOne({
        where: {
            key: key
        }
    })

    if (setting === null) {
        return null
    }

    if (setting.type === 'boolean') {
        return setting.value === '1' || setting.value === 'true'
    }

    return setting.value
}