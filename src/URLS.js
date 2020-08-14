const prod = {
    API_URL: 'https://calm-temple-47594.herokuapp.com'
}

const dev = {
    API_URL: 'http://192.168.0.13:8000'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod