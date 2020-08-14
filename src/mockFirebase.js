import * as firebase from 'firebase/app'
import firebaseConfig from './firebaseConfig';
import 'firebase/auth'
import App from './App'
import firebaseSetup from './firebaseSetup'

const mockFirebase = jest.fn( (functionName) => {
    //console.log('mockFirebase', functionName)
    if(functionName.providerId){
      switch(functionName.providerId) {
        case 'google.com': {
            //console.log('google case')
            return Promise.resolve({
              user: {
                displayName: 'Rory Garcia',
                photoUrl: 'https://lh4.googleusercontent.com/-Y8ZijFEKgZY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfpdNEGGeAwujoDIK1luHudgvi3mw/photo.jpg',
                email: 'rory.garcia1@gmail.com',
                uid: 'hTbqcYvNe7dGhxXaphw3UEqNfep2',
                ma: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxODQ1OWJiYTE2NGJiN2I5MWMzMjhmODkxZjBiNTY1M2UzYjM4YmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicm9yeSBnYXJjaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1ZOFppakZFS2daWS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JmcGRORUdHZUF3dWpvRElLMWx1SHVkZ3ZpM213L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS93cml0dWFsLTllYTJiIiwiYXVkIjoid3JpdHVhbC05ZWEyYiIsImF1dGhfdGltZSI6MTU5NTA1OTA1NCwidXNlcl9pZCI6ImhUYnFjWXZOZTdkR2h4WGFwaHczVUVxTmZlcDIiLCJzdWIiOiJoVGJxY1l2TmU3ZEdoeFhhcGh3M1VFcU5mZXAyIiwiaWF0IjoxNTk1MDk0NDM0LCJleHAiOjE1OTUwOTgwMzQsImVtYWlsIjoicm9yeS5nYXJjaWExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAxOTM3MjAwMzc0OTc2NjkyMTIwIl0sImVtYWlsIjpbInJvcnkuZ2FyY2lhMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.p5dQum4jIyxiMiU0dvNmtFSkbPCv2r2ZGE7zIkpyjdGoH-MYRYxTg2c_RWWocAqNr1QtyvG6-Dzp9pxtI-dwWo-QgbEANKAZkumIc3CLVpC4xQ3TzZOlK5ZNczshKG-P_8_JRc0axF9bxwlOHK75qyyZqkgXnsVZS9d42-T-6NiUNZMAwARzUw5phJ902XjAYV3nmZ_Da57Toy0J5EzrfiEyl3DIiptKGQUVzowyPfxG06UsUGXfGOnjwDmNcSfJBAYFT-LIm5lMeF7Xs2NLbwXiB2P3ff-IAhtMGOLz624_aViYcsV1hihgRHJfjOnWIedjTOv_sMyscBKApLIXkA'
              }
            })
        }

        default: {
            throw new Error(`Unhandled firebase request: ${url}`)
        }
      }
    } 
    
}) 

beforeAll(() => {
  jest.spyOn(firebaseSetup.firebaseAppAuth, 'signInWithPopup')
  //jest.spyOn(firebaseSetup.firebaseAppAuth, 'onAuthStateChanged')
})

beforeEach(() => {
  firebaseSetup.firebaseAppAuth.signInWithPopup.mockImplementation(mockFirebase)
  //firebaseSetup.firebaseAppAuth.onAuthStateChanged.mockImplementation(mockFirebase)


})

export default mockFirebase

