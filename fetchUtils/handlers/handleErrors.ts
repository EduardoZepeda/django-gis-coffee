export async function handleErrors(response: Response) {
    if (response.status >= 500 && response.status <= 599) {
        throw new Error("There was an error, it wasn't your fault. Our engineers are already working on it")
    }
    if (!response.ok) {
        const clonedResponse = response.clone()
        const cause = await clonedResponse.json()
        throw new Error("There was an error with your request.", { "cause": cause })
    }
    return response;
}