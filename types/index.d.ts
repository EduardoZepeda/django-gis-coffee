type resetPasswordType = {
    email: string,
}

type reviewSchemaType = {
    recommend: boolean,
    content: string,
    shop: string
}

type NewUserType = {
    username: string
    email: string,
    password1: string,
    password2: string,
}

type sidebarProps = {
    menuOpen?: boolean
    onClick: React.MouseEventHandler<HTMLElement>
}

interface propsWithChildren {
    children: React.ReactNode
}

type CoffeeShops = {
    count: number;
    next: string;
    previous?: null;
    results: Results;
}
type Results = {
    type: string;
    features?: (FeaturesEntity)[] | null;
}
type FeaturesEntity = {
    id: number;
    type: string;
    geometry: Geometry;
    properties: Properties;
}
type Geometry = {
    type: string;
    coordinates: [number, number];
}
type Properties = {
    name: string;
    address: string;
    city: string;
    roaster: boolean;
    rating: number;
    likes?: (LikesEntity | null)[] | null;
    content?: string | null;
    url: string;
    liked: boolean;
}
type LikesEntity = {
    username: string;
    url: string;
    id: number;
}

type MessageProp = {
    message: string
}

type RenderStarsProps = {
    rating: Properties["rating"]
}

type LikesProps = {
    likes: Properties["likes"]
    id: FeaturesEntity["id"]
    liked: Properties["liked"]
}

type LikeCoffeeShopType = FeaturesEntity["id"]

type CustomMarkerProps = {
    id: number
    coordinates: LatLngExpression
    name: Properties["name"]
    address: Properties["address"]
    roaster: Properties["roaster"]
    rating: Properties["rating"]
}


type Reviews = {
    count: number;
    next: string;
    previous?: null;
    results?: (ReviewResultsEntity)[] | null;
}
type ReviewResultsEntity = {
    content: string;
    recommended: boolean;
    user: ReviewUser;
    shop: string;
    created_date: string;
    modified_date: string;
    url: string;
}
type ReviewUser = {
    username: string;
    url: string;
    id: number;
}

type ReviewPostUpdate = {
    content: string;
    recommend: boolean;
    shop: string
}

type ReviewFormProps = {
    id: string
}

type SearchSchemaType = {
    query: string
}