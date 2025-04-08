interface messageI {
    _id: string;
    roomId: string;
    senderId: {
        _id: string;
        username: string;
    }| string;
    content: string;
    timestamp: string;
}

export default messageI;