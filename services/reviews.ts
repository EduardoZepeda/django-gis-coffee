import { getCoffeeShopReviewsUrl } from "@urls/index"
import { handleErrors } from "./utils/handleErrors"

export async function postReview({ recommended, content, shop }: ReviewPostUpdate) {
    const data = {
        recommended,
        content,
        shop
    }
    return fetch(getCoffeeShopReviewsUrl, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data)
    }).then(handleErrors)
}

