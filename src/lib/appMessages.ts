/// Messages that are relayed to all of the clients
export type AppMessage =
    | ReceiveGameRoomUrl

export interface ReceiveGameRoomUrl {
    type: "receive-game-room-url";
    payload: string;
}

/// Internal component messages
export type ComponentMessage =
    | GameRoomUrlHasChanged

export interface GameRoomUrlHasChanged {
    type: "game-room-url-changed";
    payload: string;
}

