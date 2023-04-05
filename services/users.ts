import { registerUserUrl } from '@urls/index'
import { resetPasswordUrl } from "@urls/index"


export function registerUser({ email, username, password1, password2 }: NewUserType) {
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
    })
}

export function resetPassword({ email }: resetPasswordType) {
    const data = {
        email,
    }
    return fetch(resetPasswordUrl, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data)
    })
}

