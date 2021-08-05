const prod = {
    API_URL: 'https://www.writualapp.com'
}
const dev = {
    API_URL: 'http://192.168.0.14:8000'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod