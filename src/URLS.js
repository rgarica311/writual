const prod = {
    API_URL: 'https://calm-temple-47594.herokuapp.com'
}

const dev = {
    API_URL: 'http://localhost:8000'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod