import React from "react"
import { useSession } from "next-auth/react"
import { handleErrors } from "@handlers/handleErrors"
import { handleEmptyBody } from "@handlers/handleEmptyBody"
//
export async function fetchGet(url: URL, token: string | undefined) {
    const headers = new Headers({ 'content-type': 'application/json' })

    if (token) {
        headers.append("Authorization", `Token ${token}`)
    }

    return fetch(url, {
        method: "GET",
        headers: headers,
    }).then(handleErrors).then(handleEmptyBody)
}

export async function fetchPost(url: URL, data: object, token: string | undefined) {
    const headers = new Headers({ 'content-type': 'application/json' })
    if (token) {
        headers.append("Authorization", `Token ${token}`)
    }

    return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }).then(handleErrors).then(handleEmptyBody)
}

export async function fetchUpdate(url: URL, data: object, token: string | undefined) {
    const headers = new Headers({ 'content-type': 'application/json' })

    if (token) {
        headers.append("Authorization", `Token ${token}`)
    }

    return fetch(url, {
        method: "UPDATE",
        headers: headers,
        body: JSON.stringify(data)
    }).then(handleErrors).then(handleEmptyBody)
}

export async function fetchDelete(url: URL, token: string | undefined) {
    const headers = new Headers({ 'content-type': 'application/json' })
    if (token) {
        headers.append("Authorization", `Token ${token}`)
    }

    return fetch(url, {
        method: "DELETE",
        headers: headers,
    }).then(handleErrors).then(handleEmptyBody)

}