interface roomI {
    _id: string;
    game: string;
    createdBy: string | {
        _id: string;
        username: string;
        email?: string;
    };
    users: string[] | {
        _id: string;
        username: string;
        email?: string;
    }[];
    createdAt: string;
}

export default roomI;