import { getNewestCoffeeShopsUrl, likeCoffeeShopUrl, getCoffeeShopByIdUrl, getCoffeeShopReviewsUrl } from "@urls/index"
import { handleErrors } from "./utils/handleErrors"


export async function getNewestCoffeeshops() {
    return fetch(getNewestCoffeeShopsUrl, {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors).then(response => response.json())
}

export async function getCoffeeShopQuery(query: string | string[] | undefined) {
    return fetch(`${getNewestCoffeeShopsUrl}?query=${query}`, {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors).then(response => response.json())
}

export async function getCoffeeShopById(id: string) {
    return fetch(`${getNewestCoffeeShopsUrl}${id}`, {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors).then(response => response.json())
}

export async function LikeCoffeeShop(id: LikeCoffeeShopType) {
    return fetch(`${likeCoffeeShopUrl}${id}/like/`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors)
}

export async function UnlikeCoffeeShop(id: LikeCoffeeShopType) {
    return fetch(`${likeCoffeeShopUrl}${id}/unlike/`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors)
}

export async function getCoffeeShopReviewsById(id: string) {
    return fetch(`${getCoffeeShopReviewsUrl}?shop_id=${id}`, {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(handleErrors).then(response => response.json())
}

