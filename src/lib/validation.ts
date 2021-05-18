const URL_REGEX = "https:\/\/([\w\.-]+\.)?gartic.io"

export function isValidGameRoomUrl(url: string) {
    return url && url.match(URL_REGEX);
}