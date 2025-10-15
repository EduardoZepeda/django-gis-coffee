import React, { useId } from 'react'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RenderStars = ({ rating }: RenderStarsProps) => {
    const starId = useId()
    let renderHalfStar = false
    // Creeate array of length equal rating
    // ~~ is similar to math floor
    const list = [...Array.from(Array(~~rating).keys())]
    // Check if number ends in 0.5 if that's the case, add half a star
    if (rating - ~~rating === 0.5) {
        renderHalfStar = true
    }
    return (
        <>
            {list.map((_, index) => <FontAwesomeIcon key={`${starId}-${index}`} icon={faStar} />)}
            {renderHalfStar ? <FontAwesomeIcon icon={faStarHalf} /> : null}
        </>
    )
}

export default RenderStars