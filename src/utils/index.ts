export function benefitsToArray(value: string){
    let data = value.split(';')
    data.pop()
    return data
}

export function contentsToArray(value: string){
    let json: any[] = []
    const values = value.split(';')

    values.forEach(value => {
        const data = value.split('|')
        json.push({
            iconUrl: data[0],
            text: data[1], 
        })
    });

    json.pop()

    return json
}