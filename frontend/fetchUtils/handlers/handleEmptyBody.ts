export async function handleEmptyBody(response: Response) {
    return response.json().catch(e => {
        return { "error": e }
    })
}