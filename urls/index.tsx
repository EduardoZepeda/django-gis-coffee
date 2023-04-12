const base = process.env.NEXT_PUBLIC_BACKEND_API

// Authentication
export const shopsByLocation = new URL(`${base}/api/v1/shops/`)
export const loginUrl = new URL(`${base}/api/v1/authentication/login/`)
export const getCurrentUserUrl = new URL(`${base}/api/v1/authentication/user/`)
export const registerUserUrl = new URL(`${base}/api/v1/registration/`)
export const resetPasswordUrl = new URL(`${base}/api/v1/authentication/password/reset/`)
// end Authentication

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