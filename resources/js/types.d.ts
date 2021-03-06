declare function route(name?:string, params?: any):any;

interface TagInterface {
    name?: string,
    id?:number,
    created_at?:string
}


interface UserInterface {
    id?:number,
    created_at?:string
    name?: string,
    email?: string,
    password?: string,
    is_admin?: boolean,
}

interface PhotoInterface {
    categories?:[],
    imgUrl?:string,
    thumbnail?:string
    id?:number,
    created_at?:string
    name?: string,
}


type PagePropsType =
    PageProps & {
        errors: Errors & ErrorBag
        items:any,
        flash:any
    }

