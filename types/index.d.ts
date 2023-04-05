type resetPasswordType = {
    email: string,
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
}
type LikesEntity = {
    username: string;
    url: string;
    id: number;
}

type ErrorProp = {
    message: string
}

type RenderStarsProps = {
    rating: Properties["rating"]
}

type LikesProps = {
    likes: Properties["likes"]
    id: FeaturesEntity["id"]
}

type LikeCoffeeShopType = FeaturesEntity["id"]

type CustomMarkerProps = {
    coordinates: LatLngExpression
    name: Properties["name"]
    address: Properties["address"]
    roaster: Properties["roaster"]
    rating: Properties["rating"]
}