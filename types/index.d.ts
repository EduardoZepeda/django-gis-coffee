type resetPasswordType = {
    email: string;
}

type reviewSchemaType = {
    recommended: boolean;
    content: string;
    shop: string;
}

type NewUserType = {
    username: string
    email: string;
    password1: string;
    password2: string;
}

interface propsWithChildren {
    children: React.ReactNode
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
}

interface CoffeeShopsResponse extends ApiResponse {
    results: CoffeeShops;
}

type CoffeeShops = {
    type: string;
    features?: (CoffeeShopEntity)[] | null;
}

type CoffeeShopEntity = {
    id: number;
    type: string;
    geometry: Geometry;
    properties: CoffeeShopProperties;
}

type Geometry = {
    type: string;
    coordinates: [number, number];
}
type CoffeeShopProperties = {
    name: string;
    address: string;
    city: string;
    created_date: string;
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
    rating: CoffeeShopProperties["rating"]
}

type LikesProps = {
    likes: CoffeeShopProperties["likes"]
    id: CoffeeShopEntity["id"]
    liked: CoffeeShopProperties["liked"]
}

type LikeCoffeeShopType = CoffeeShopEntity["id"]

type CustomMarkerProps = {
    id: number
    coordinates: LatLngExpression
    name: CoffeeShopProperties["name"]
    address: CoffeeShopProperties["address"]
    roaster: CoffeeShopProperties["roaster"]
    rating: CoffeeShopProperties["rating"]
}

interface Reviews extends ApiResponse {
    results: (ReviewResultsEntity)[] | null;
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

type ReviewPostUpdateRequest = {
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

interface RecommendedUsers extends ApiResponse {
    results: FollowingOrFollowersEntity[]
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
    following: FollowingOrFollowersEntity[];
    followers: FollowingOrFollowersEntity[];
    followed: boolean;
    reviews_count: number;
}

type FollowingOrFollowersEntity = {
    username: string;
    url: string;
    id: number;
    profile_picture?: string | null;
    followed: boolean;
}

type djError = {
    message: string;
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
    fetched: boolean;
}

type Message = {
    message: string;
    receiver: userId;
    sender: userId;
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
    fetched: boolean;
}

type UserId = {
    id: number;
    username: string;
}


type ApiMessageResponse = {
    message: string;
    receiver: UserId;
    sender: UserId;
    timestamp: string;
}

type crossProps = {
    show: boolean;
    handleClick: () => void;
}

interface socketStatuses {
    [index: number]: string;
}


interface Chat extends ApiResponse {
    results?: (ChatResultsEntity)[] | null;
}

type ChatResultsEntity = {
    message: string;
    sender: SenderOrReceiver;
    receiver: SenderOrReceiver;
    active: boolean;
    timestamp: string;
}

type SenderOrReceiver = {
    id: number;
    username: string;
}
