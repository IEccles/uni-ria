import system from '../models/system';

export default async function(key: string | null) {
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