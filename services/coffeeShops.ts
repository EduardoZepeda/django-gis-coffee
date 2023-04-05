import { getNewestCoffeeShopsUrl, likeCoffeeShopUrl } from "@urls/index"

export function getNewestCoffeeshops() {
    return fetch(getNewestCoffeeShopsUrl, {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(response => response.json())
}

export function getCoffeeShopById(id: string) {
    console.log(`${getNewestCoffeeShopsUrl}${id}`)
    return fetch(`${getNewestCoffeeShopsUrl}${id}`, {
        method: "GET",
        headers: new Headers({ 'content-type': 'application/json' }),
    }).then(response => response.json())
}

export function LikeCoffeeShop(id: LikeCoffeeShopType) {
    return fetch(`${likeCoffeeShopUrl}${id}/like/`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
    })
}

export function UnlikeCoffeeShop(id: LikeCoffeeShopType) {
    return fetch(`${likeCoffeeShopUrl}${id}/unlike/`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
    })
}