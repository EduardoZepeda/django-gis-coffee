import { getUserByUsernameUrl, registerUserUrl, followUserUrl, unfollowUserUrl } from '@urls/index'
import { resetPasswordUrl } from "@urls/index"
import { handleErrors } from "./utils/handleErrors"

export async function registerUser({ email, username, password1, password2 }: NewUserType) {
    const data = {
        username,
        email,
        password1,
        password2
    };
    return fetch(registerUserUrl, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data)
    }).then(handleErrors)
}

export async function resetPassword({ email }: resetPasswordType) {
    const data = {
        email,
    }
    return fetch(resetPasswordUrl, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data)
    }).then(handleErrors)
}


export async function getUserByUsername(username: string) {
    return fetch(`${getUserByUsernameUrl}${username}/`, {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors).then(response => response.json())
}

export async function followUser(username: string) {
    const pathname = `api/v1/users/${username}/follow/`;
    followUserUrl.pathname = pathname
    return fetch(followUserUrl, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors).then(response => response.json())
}

export async function unfollowUser(username: string) {
    const pathname = `api/v1/users/${username}/unfollow/`;
    unfollowUserUrl.pathname = pathname
    return fetch(unfollowUserUrl, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors).then(response => response.json())
}



