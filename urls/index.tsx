const base = process.env.NEXT_PUBLIC_BACKEND_API
const wsBase = process.env.NEXT_PUBLIC_WS_API
const authBase = process.env.NEXTAUTH_URL

//ws
export function webSocketUrl(searchParams: object | undefined): URL {
    const url = new URL(`${wsBase}`)
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            url.searchParams.append(key, value)
        }
    }
    return url
}

// social
export const facebookUrl = new URL('https://facebook.com/latteporlaciudad')
export const tiktokUrl = new URL('https://facebook.com/latteporlaciudad')
export const instagramUrl = new URL('https://facebook.com/latte.porlaciudad')

// Authentication
export const shopsByLocation = new URL(`${base}/api/v1/shops/`)
export const loginUrl = new URL(`${base}/api/v1/authentication/login/`)
export const getCurrentUserUrl = new URL(`${base}/api/v1/authentication/user/`)
export const registerUserUrl = new URL(`${base}/api/v1/registration/`)
export const resetPasswordUrl = new URL(`${base}/api/v1/authentication/password/reset/`)
// end Authentication

// Feed
export const feedUrl = new URL(`${base}/api/v1/feed/`)


// Like
export function likeCreate(id: string | string[] | undefined): URL {
    const url = new URL(`${base}/api/v1/shops/${id}/like/`)
    return url
}

export function likeDestroy(id: string | string[] | undefined): URL {
    const url = new URL(`${base}/api/v1/shops/${id}/unlike/`)
    return url
}
// End like

// Follow
export function followCreate(id: string | string[] | undefined): URL {
    const url = new URL(`${base}/api/v1/users/${id}/follow/`)
    return url
}

export function followDestroy(id: string | string[] | undefined): URL {
    const url = new URL(`${base}/api/v1/users/${id}/unfollow/`)
    return url
}
// End follow


export function userDetail(id: string | string[] | undefined, searchParams: object | undefined): URL {
    const url = new URL(`${base}/api/v1/users/${id}/`)
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            url.searchParams.append(key, value)
        }
    }

    return url
}

export function userUpdate(id: string | string[] | undefined): URL {
    const url = new URL(`${base}/api/v1/users/${id}/`)
    return url
}

// Coffee shops
export function coffeeList(searchParams: object | undefined): URL {
    const url = new URL(`${base}/api/v1/shops/`)
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            url.searchParams.append(key, value)
        }
    }

    return url
}

export const recommendedUsersList = new URL(`${base}/api/v1/recommended-users/`)


export function coffeeDetail(id: string | string[] | undefined, searchParams: object | undefined): URL {
    const url = new URL(`${base}/api/v1/shops/${id}/`)
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            url.searchParams.append(key, value)
        }
    }

    return url
}
// end coffee shops

// Review
export function reviewList(searchParams: object | undefined): URL {
    const url = new URL(`${base}/api/v1/reviews/`)
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            url.searchParams.append(key, value)
        }
    }

    return url
}

export function reviewCreate(): URL {
    const url = new URL(`${base}/api/v1/reviews/`)
    return url
}
// end Review


export function messageList(searchParams: object | undefined): URL {
    const url = new URL(`${base}/api/v1/messages/`)
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            url.searchParams.append(key, value)
        }
    }
    return url
}