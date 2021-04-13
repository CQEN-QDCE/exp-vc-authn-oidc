export function GET_ISSUER_HOST_URL() {
    let ISSUER_HOST_URL = process.env.REACT_APP_ISSUER_HOST_URL;
    if (ISSUER_HOST_URL === undefined || ISSUER_HOST_URL === '')
        return 'NONE'
    else
        return ISSUER_HOST_URL
}