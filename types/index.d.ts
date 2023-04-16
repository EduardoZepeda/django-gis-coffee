
type resetPasswordType = {
    email: string,
}

type reviewSchemaType = {
    recommended: boolean,
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
    show?: boolean
    handleClick: (show: boolean) => void
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
    likes_count: number;
    reviewed: boolean;
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
    bio?: string;
    profile_picture?: string;
    followed: boolean;
    reviews_count: number;
}

type ReviewPostUpdate = {
    content: string;
    recommended: boolean;
    shop: string
}

type ReviewFormProps = {
    id: string
}

type SearchSchemaType = {
    query: string
}

type OverlayProps = {
    username: string;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

type FollowUnfollowProps = {
    followed: boolean;
    user: string;
}

type Profile = {
    url: string;
    username: string;
    profile_picture?: string | null;
    bio?: string | null;
    following: FollowingEntityOrFollowersEntity[];
    followers: FollowingEntityOrFollowersEntity[];
    followed: boolean;
    reviews_count: number;
}

type FollowingEntityOrFollowersEntity = {
    username: string;
    url: string;
    id: number;
    profile_picture?: string | null;
    followed: boolean;
}

type djError = {
    message: string,
    cause: {
        [key: string]: any;
    }
}

type PaginationProps = {
    queryParams: {
        query?: string | string[];
        page: number;
    };
    totalPages: number;
    setPage: (page: number) => void;
}

type FeedUser = {
    username?: string;
    url?: string;
    id?: number;
    profile_picture?: string;
}

type Feed = {
    user: FeedUser;
    action: string;
    target: Target;
    created: string;
}

interface Target extends FeedUser {
    name?: string;
}

type FeedProps = {
    openFeed: boolean;
    setOpenFeed: (val: boolean) => void;
}


type ProfileForm = {
    username: string;
    bio: string;
    profile_picture?: FileList
}

type ChatProps = {
    receiver: string;
    sender: string;
    ws: WebSocket | null;
}

type Message = {
    message: string;
    receiver: string;
    sender: string;
    timestamp: string;
}

type ChatMessageProps = {
    content: Message['content'];
    isSender: boolean;
    timestamp: Message['timestamp'];
}


type ChatBoxState = {
    user: string;
    open: boolean;
    conversation: Message[];
    active: boolean;
}

type UserId = {
    id: number;
    username: string;
}

type MessageResponse = {
    message: string;
    receiver: UserId;
    sender: UserId;
    timestamp: string;
}