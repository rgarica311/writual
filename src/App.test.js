import React from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import WritualUI from './Components/WritualUI/WritualUI'
import ProjectList from './Components/ProjectList/ProjectList'
import ProjectTab from './Components/ProjectTab/ProjectTab'
import ProfileMenu from './Components/ProfileMenu/ProfileMenu'
//import userEvent from '@testing-library/user-event'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import WritualContext from './WritualContext.js';
import mockFetch from './mockFetch.js'
import mockFirebase from './mockFirebase'
import { Router } from 'react-router-dom'
import * as firebase from 'firebase/app';
import { render, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import { MenuProvider } from 'react-native-popup-menu';

//import { fireEvent } from '@testing-library/react-native';


const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxODQ1OWJiYTE2NGJiN2I5MWMzMjhmODkxZjBiNTY1M2UzYjM4YmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicm9yeSBnYXJjaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1ZOFppakZFS2daWS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JmcGRORUdHZUF3dWpvRElLMWx1SHVkZ3ZpM213L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS93cml0dWFsLTllYTJiIiwiYXVkIjoid3JpdHVhbC05ZWEyYiIsImF1dGhfdGltZSI6MTU5NTA1OTA1NCwidXNlcl9pZCI6ImhUYnFjWXZOZTdkR2h4WGFwaHczVUVxTmZlcDIiLCJzdWIiOiJoVGJxY1l2TmU3ZEdoeFhhcGh3M1VFcU5mZXAyIiwiaWF0IjoxNTk1MDk0NDM0LCJleHAiOjE1OTUwOTgwMzQsImVtYWlsIjoicm9yeS5nYXJjaWExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAxOTM3MjAwMzc0OTc2NjkyMTIwIl0sImVtYWlsIjpbInJvcnkuZ2FyY2lhMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.p5dQum4jIyxiMiU0dvNmtFSkbPCv2r2ZGE7zIkpyjdGoH-MYRYxTg2c_RWWocAqNr1QtyvG6-Dzp9pxtI-dwWo-QgbEANKAZkumIc3CLVpC4xQ3TzZOlK5ZNczshKG-P_8_JRc0axF9bxwlOHK75qyyZqkgXnsVZS9d42-T-6NiUNZMAwARzUw5phJ902XjAYV3nmZ_Da57Toy0J5EzrfiEyl3DIiptKGQUVzowyPfxG06UsUGXfGOnjwDmNcSfJBAYFT-LIm5lMeF7Xs2NLbwXiB2P3ff-IAhtMGOLz624_aViYcsV1hihgRHJfjOnWIedjTOv_sMyscBKApLIXkA'             

beforeEach(async () => {
    jest.setTimeout(30000)
    render(<MenuProvider><App/></MenuProvider>)
  })

describe("App", () => {

  it('Login screen displays on App render', () => {
    expect(
      screen.getByText(/Writual Login/i)
      ).toBeInTheDocument()
    
  })

  describe('Logged in tests', () => {
    beforeEach(async () => {
      fireEvent.click(screen.getByText(/Sign in with Google/i))
      await waitForElementToBeRemoved(() => screen.getByText(/Sign In With Google/i))
    })

    afterEach(() => {
      localStorage.clear()
    })

    /*it('Firebase auth triggerd when login clicked', async () => {
      expect(screen.getByText(/Why Writual/i)).toBeInTheDocument()
    })

    it('Project List populates with user projects', async () => {
      expect(await screen.findByText(/Movie One/i)).toBeInTheDocument()
      expect(await screen.findByText(/Test Tv/i)).toBeInTheDocument()
    })

    it('Clicking user project shows Overview', async () => {
      fireEvent.click(screen.getByText(/Movie One/i))
      expect(await screen.getByText(/Title/i)).toBeInTheDocument()
    })*/

    it('Clicking Scenes without project shows none selected', async () => {
      fireEvent.click(screen.getByText(/Scenes/i))
      //await waitForElementToBeRemoved(() => screen.getByText(/Title/i))
      expect(await screen.getByText(/No project/i)).toBeInTheDocument()
    })

    it('Clicking Scenes shows act container', async () => {
      fireEvent.click(screen.getByText(/Movie One/i))
      fireEvent.click(screen.getByText(/Scenes/i))
      //await waitForElementToBeRemoved(() => screen.getByText(/Title/i))
      expect(await screen.getByText(/Ordinary World/i)).toBeInTheDocument()
    })

    it('Clicking Character shows Character Container', async () => {
      fireEvent.click(screen.getByText(/Movie One/i))
      fireEvent.click(screen.getByText(/Characters/i))
      expect(await screen.getByText(/Add Character/i)).toBeInTheDocument()
    })

  })
  

  
})




