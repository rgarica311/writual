import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View } from 'react-native';
import WritualHeader from './Components/WritualHeader/WritualHeader';
import StoryForm from './Components/StoryForm/StoryForm';
import StoryCard from './Components/StoryCard/StoryCard';
import Outline from './Components/Outline/Outline';
import LandingPage from './Components/LandingPage/LandingPage'
import Login from './Components/Login/Login'
import WritualUI from './Components/WritualUI/WritualUI'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import WritualContext from './WritualContext.js';
import './App.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseSetup from './firebaseSetup'
import debounce from 'lodash/debounce'
import ErrorBoundary from './ErrorBoundary'
import * as io from 'socket.io-client'
import { config } from './URLS'

const url = config.API_URL

const firebaseApp = firebaseSetup.firebaseApp

const firebaseAppAuth = firebaseSetup.firebaseAppAuth

const providers = { googleProvider: new firebase.auth.GoogleAuthProvider() }
providers.googleProvider.setCustomParameters({
  prompt: 'select_account'
})

let contextValue = undefined

class App extends Component {
  constructor(props){
    super(props)
    this.runTimes = 0
    this.getProjectsOnUpdate = debounce(() => {
      this.getAllUserProjects()
    }, 1000)
    this.state = {
      idToken: null,
      history: this.props.history,
      userAccount: this.props.user,
      signOut: this.props.signOut,
      signInWithGoogle: this.props.signInWithGoogle,
      history: this.props.history,
      steps: [],
      author: {
        value: '',
      },
      title: {
        value: '',
      },
      budget: {
        value: '',
      },
      timeperiod: {
        value: ''
      },
      similarprojects: {
        value: ''
      },
      projformat: {
        value: 'Select Format',
      },
      genre: {
        value: 'Select Genre',
      },
      framework: {
        value: 'Select Framework',
      },
      bottle_episode: {
        value: 'Bottle Episode No',
      },
      episode_title:{
        value: '',
      },
      
      logline: {
        value: '',
      },
      hasError: false,

      charAge: {
        value: '',
      },

      charName: {
        value: '',
      },

      charGender: {
        value: '',
      },

      currentActInstructions: undefined,
      userStatus: false,
      renderProfileMenu: false,
      projects: undefined,
      projCharacters: undefined,
      projScenes: undefined,
      tabTitles: undefined,
      projTitles: undefined,
      addProject: false,
      addEpisode: false,
      addCharacter: false,
      tabSelectBorderColor: undefined,
      tabSelectBorderWidth: undefined,
      acts: ['1', '2', '3'],
      currentActOneStep: undefined,
      currentActTwoStep: undefined,
      currentActThreeStep: undefined,
      current_project_id: undefined, 
      renderUpArrow: true,
      renderUpTvArrow: true,
      renderSharedUpArrow: true, 
      renderUpTvArrowShared: true,
      showHiddenMode: false,
      showHiddenModeShared: false,
      showHiddenModeEp: false,
      showHiddenModeSharedEp: false,
      openChats: [],
      socket: io.connect(url),
      unreadMessagesStatus: [],
      unreadArgs: [],
      unreadMessages: undefined,
      activeDetail: false,
      deleteScenes: false,
      sharedProjects: undefined,
      photoUrls: [],
      currentUserProjectShared: undefined,
      idToken: localStorage.getItem('token'),
      photoUrl: localStorage.getItem('photoUrl')
     
      
    }
    this.abortController = new AbortController()

  }

closeChatWindow = (e, uni_id, project_id) => {
  let index = this.state.openChats.indexOf(this.state.openChats.find(chat => chat.uni_id === uni_id))
  let chatProxy = this.state.openChats
  chatProxy.splice(index, 1)
  this.setState({
    openChats: chatProxy
  })
  //console.log('e', e)
}

getSharedProjects = async () => {
  return new Promise(async (resolve, reject) => {
    if(this.state.getSharedProjectsRan === undefined) {
        this.setState({
          getSharedProjectsRan: true
        })
      }
      try {
        let response = await fetch(`${url}/shared/projects` ,    {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': this.state.idToken
          },
        })
        if(!response.ok){
          throw new Error(response.status)
        } else {
          this.setState({
            sharedProjects: await response.json()
          }, () => {
            //this.createUnreadArgs(true)
            resolve(true)
          })
        }

      } catch (error) {
        reject(new Error(error))
        //console.error('error:', error)
      }
  })
  
}

getEpisodes = async () => {
  //console.log('debug connections: getEpisodes running')
  return new Promise(async (resolve, reject) => {
    if(this.state.getEpisodes === undefined) {
        this.setState({
          getEpisodesRan: true
        })
      }
      try {
        let response = await fetch(`${url}/episodes`,   {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': this.state.idToken
            },
        })
        if(!response.ok){
          throw new Error(response.status)
        } else {
            this.setState({
              episodes: await response.json()
            }, () => {
              resolve(false)
            })
        }
          

      } catch (error) {
          reject(new Error(error))
          console.error('error:', error)
      }

  })
}

getSharedEpisodes = async () => {
  //console.log('debug connections: getSharedEpisodes running')
  return new Promise(async (resolve, reject) => {
    if(this.state.getSharedEpisodesRan === undefined) {
    this.setState({
      getSharedEpisodesRan: true
    })
  }
  try {
    let response = await fetch(`${url}/shared/episodes`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': this.state.idToken
        },
    })
    if(!response.ok){
      throw new Error(response.status)
    } else {
        this.setState({
          sharedEpisodes: await response.json()
        }, () => {
          resolve(true)
        })
    }
      

  } catch (error) {
      reject(new Error(error))
      console.error('error:', error)
  }
  })
     
}

getAuthToken = async () => {
  //console.log('details debug flow: get auth token running')
  const idToken = await firebaseAppAuth.currentUser.getIdToken(/* forceRefresh */ true)
  //console.log(`idToken in getAuthToken ${idToken}`)
  this.setState({
    idToken: idToken
  })
  return idToken

}


getProjects =  async () => {
  //console.log('debug connections: get projects running idToken', this.state.idToken)
  return new Promise(async (resolve, reject) => {
    if(this.state.getProjectsRan === undefined) {
      this.setState({
        getProjectsRan: true
      })
    }
    try {
      let response = await fetch(`${url}/projects`,   {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': this.state.idToken
          },
        })
      if(!response.ok){
        
        throw new Error(response.status)
          
      }
      else {
        //console.log('proj response', await response.json())
        this.setState({
          projects: await response.json()
        }, () => {
          resolve(false)
        })
        
      }

    } catch (error) {
      //console.log('Error fetching projects this.state.idToken', this.state.idToken)
      reject(new Error(error))
      //console.error('error:', error)
    }
  })
  
  
}

getProjectCharacters = async (project_id, sharedProj, episode_id) => {
    let response
   
    //console.log('new char added getProjectCharacters running')
    try {

      if(sharedProj === undefined || sharedProj === false) {
        response = await fetch(`${url}/characters/${project_id}/${episode_id}`,   {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': this.state.idToken
          }
        })
      } else {
          //console.log(`shared route project_id ${this.state.project_id}`)
          response = await fetch(`${url}/shared/characters/${project_id}/${episode_id}`,   {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': this.state.idToken
            }
        })
      }
      
      if(!response.ok){
        throw new Error(response.status)
      } else {
        this.setState({
          projCharacters: await response.json()
        })
      }
    } catch(error) {
      console.error('error:', error)
    }
}

handleSearchUpdate = async (currentAct, currentStep, searchTerm) => {
    if(searchTerm) {
       let act = `Act ${currentAct}`
        try {
            let response = await fetch(`${url}/scenes/${this.state.current_project_id}/${act}/${currentStep}/${searchTerm}`,   {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': await this.getAuthToken()
                }
            })
            if(!response.ok) {
                throw new Error(response.status)
            } else {
                this.setState({
                    projScenes: await response.json()
                })
            }

        } catch(err) {
            console.error('error:', err)
        }
    } else {
      this.getProjectScenes(this.state.current_project_id, false, this.state.episode_id)
    }
   
}

getProjectScenes = async (project_id, sharedProj, episode_id) => {
  let sceneResponse
    try {
      if(sharedProj === false ) {
        sceneResponse = await fetch(`${url}/scenes/${project_id}/${episode_id}`,   {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })

      } else {
          sceneResponse = await fetch(`${url}/shared/scenes/${project_id}/${episode_id}` ,   {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': await this.getAuthToken()
            }
          })
      }
      
      if(!sceneResponse.ok){
        throw new Error(sceneResponse.status)
      } else {
        this.setState({
          projScenes: await sceneResponse.json()
        })
      }
    } catch(error) {
      console.error('error:', error)
    }
}



verifyEmail = async (email, message, projectName) => {
    
}

deleteSceneMode = () => {
  this.setState({
    deleteScenes: !this.state.deleteScenes
  })
}

updateDimensions = () => {
  let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  this.setState({ windowWidth, windowHeight });
}

componentWillUnmount() {
  window.removeEventListener("resize", this.updateDimensions);
  this.abortController.abort()
}

handleGoogleLogin = async (history) => {
  let usersResponse
  firebaseAppAuth.signInWithPopup(providers.googleProvider)
    .then(async result => {
      localStorage.setItem('logged_in', true)
      this.setState({
        idToken: await this.getAuthToken(),
        displayName: result.user.displayName,
        photoUrl: result.user.photoURL,
        email: result.user.email,
        uid: result.user.uid, 
      }, async () => {
          history.push('/writual')
          //this.getAuthToken()
          setTimeout(() => {
            this.getAllUserProjects()
          }, 500)
          const loggedInUser = {
            user_name: this.state.displayName,
            email: this.state.email,
            photo_url: this.state.photoUrl,
          }

          usersResponse = await fetch(`${url}/users`,   {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': await this.getAuthToken()
            },
            body: JSON.stringify(loggedInUser),
            }).then().catch(error => console.error('Error:', error));
        })
      }).catch(error => {
      console.error(`error signing in ${error.code}: ${error.message}`)
    })
    
}

handleSignout = (history) => {
  localStorage.clear()
  this.setState({
    userAccount: undefined,
    displayName: undefined,
    photoUrl: undefined,
    email: undefined,
    uid: undefined,
    idToken: undefined
  })
  setTimeout(() => {
    firebaseAppAuth.signOut().then(function() {
      window.location.assign('https://writualapp.com/')
    }).catch(function(error) {
      console.error('sign out error:', error)
    })
  }, 1000)
  
}

checkGetProjEp = () => {
  let {getProjectsRan, getSharedProjectsRan, getEpisodesRan, getSharedEpisodesRan} =  this.state
  if( getProjectsRan === true && getSharedProjectsRan === true && getEpisodesRan === true && getSharedEpisodesRan === true ) {
    this.setState({
      allGetsRan: true
    })
  } else {
    setTimeout(() => {
      this.checkGetProjEp()
    }, 500)
    
  }
}

checkAllGetsRan = () => {
  if(this.state.allGetsRan === true) {
    setTimeout(() => {
      this.getUnread()
    }, 500)
  }
   else {
    this.checkAllGetsRan()
  }
}

componentDidMount = async () => {
  window.addEventListener("resize", this.updateWindowDimensions)
  
  firebaseAppAuth.onAuthStateChanged(async user => {
    
    if(user) {
      this.setState({
        displayName: user.displayName,
        uid: user.uid,
        photoUrl: user.photoURL,
        idToken: await this.getAuthToken(),
        email: user.email

      }, () => {
        this.getAllUserProjects()
      })
    } else {
        this.setState({
          userAccount: null,
          renderSignOut: false,
          renderProfileMenu: false,
        })
    }

  })

  this.state.socket.on('new-scene-added', (project_id, episode_id) => {
    if(this.state.projects.find(proj => proj.id === project_id) !== undefined || this.state.sharedProjects.find(proj => proj.id === project_id) !== undefined) {
      if(this.state.current_project_id === project_id) {
        this.getProjectScenes(project_id, this.state.sharedProjClicked, episode_id)
      }
    } 
  }) 

  this.state.socket.on('new-character-added', (project_id, episode_id) => {
    if(this.state.projects.find(proj => proj.id === project_id) !== undefined || this.state.sharedProjects.find(proj => proj.id === project_id) !== undefined) {
      if(this.state.current_project_id === project_id) {
        this.getProjectCharacters(project_id, this.state.sharedProjClicked, episode_id)
      }
    }
  })

  this.state.socket.on('project-shared', uid => {
    if(uid !== null) {
      if(this.state.uid === uid.uid) {
        this.getSharedProjects()
        this.getSharedEpisodes()
      } 
    }
    
  })

  this.state.socket.on('check-unread-msgs', (projStatus) => {
    projStatus.map(proj => {
      const unreadStatus = {
        title: proj.length > 0 ? proj[0].proj : undefined,
        unreadMsgs: proj.length > 0 ? true : false,
        numUnreadMsgs: proj.length,
        sender_uid: proj.length > 0 ? proj[0].sender_uid : undefined
      }
      
      if( this.state.unreadMessagesStatus.find(msg => msg.title === unreadStatus.title && msg.sender_uid === unreadStatus.sender_uid) ) {
        if( this.state.unreadMessagesStatus.find(msg => msg.title === unreadStatus.title && msg.sender_uid === unreadStatus.sender_uid).numUnreadMsgs !== unreadStatus.numUnreadMsgs ) {
          this.setState(prevState => ({
            unreadMessagesStatus: prevState.unreadMessagesStatus.map( obj => 
              obj.title === unreadStatus.title && obj.sender_uid === unreadStatus.sender_uid && obj.numUnreadMsgs !== unreadStatus.numUnreadMsgs 
                ? {...obj, numUnreadMsgs: unreadStatus.numUnreadMsgs, unreadMsgs: unreadStatus.unreadMsgs} 
                : obj
            ),
          }))
        }
      } else {
          this.setState({
            unreadMessagesStatus: [...this.state.unreadMessagesStatus, unreadStatus],
          })
      }

    })

  })

}

getUnread = () => {
  setTimeout(() => {
    this.state.socket.emit('check-unread-msgs', this.state.unreadArgs)
  }, 500)
}

createUnreadArgs = (state) => {
  if(state) {
    if(this.state.sharedProjects !== undefined) {
      this.state.sharedProjects.map(project => {
        if(project.projformat === 'Television' && this.state.sharedEpisodes !== undefined ) {
          if(this.state.sharedEpisodes.find(ep => ep.show_title === project.title) !== undefined) {
            let episodeTitle = this.state.sharedEpisodes.find(ep => ep.show_title === project.title).episode_title
              this.setState({
                unreadArgs: [...this.state.unreadArgs, [this.state.uid, episodeTitle]]
              })
          }
          
        } else {
            if(this.state.sharedProjects.find(proj => proj.title === project.title) !== undefined) {
              let projTitle = this.state.sharedProjects.find(proj => proj.title === project.title).title
              this.setState({
                unreadArgs: [...this.state.unreadArgs, [this.state.uid, projTitle]]
              })
            }
            
        }
      })
    }
  } else {
      //console.log(`refactor unread: this.sate.projects !== undefined: ${JSON.stringify(this.state.projects)}`)
      this.state.projects.map(proj => {
        //console.log(`refactor unread: this.state.projects proj ${JSON.stringify(proj)}`)
        if(proj.projformat === 'Television' && proj.has_episodes === true) {
          //console.log(`refactor unread: debug checkunreadstatus: projformat: ${proj.projformat} proj.has_episodes: ${proj.has_episodes}`)
          const runCheckEpisodes = () => {
            //console.log(`refactor unread: debug checkunreadstatus: runCheckEpisodes running`)
            let episode_title
            if(this.state.episodes) {
              //console.log(`refactor unread: this.state.epsidoes: ${this.state.episodes}`)
              this.state.episodes.forEach(ep => {
                //console.log(`refactor unread: ep: ${ep} json ep: ${JSON.stringify(ep)}`)
                let episode_title = ep.episode_title
                this.setState({
                  unreadArgs: [...this.state.unreadArgs, [this.state.uid, episode_title]]
                })
              })
              
            }
            else {
              setTimeout(() => {
                runCheckEpisodes()
              }, 100) 
            }
          }
          runCheckEpisodes()
        } else {
            //console.log(`refactor unread: projformate !== 'Television: ${proj.projformat} && proj.has_epsiodes === true: ${proj.hasEpisodes}`)
            this.setState({
              unreadArgs: [...this.state.unreadArgs, [this.state.uid, proj.title]]
            })
        }
      })
  }


}
//figure out how to update context.currentpoj
getAllUserProjects = async () => {
  //console.log('get all user projects')
  Promise.all([
    this.getProjects(),
    this.getSharedProjects(),
    this.getEpisodes(),
    this.getSharedEpisodes()
  ])
  .then((sharedProj) => {
    sharedProj.forEach(state => { 
      this.createUnreadArgs(state)
      //console.log(` get all user projects: refactor unread: this.state.unreadArgs after each create call ${JSON.stringify(this.state.unreadArgs)}`)
    })
  })
  .then(() => this.getUnread())
  if(this.state.current_project_id !== undefined) {
    console.log('setting currentproj')
    this.setState({
      currentProj: this.state.projects.find(obj => obj.id === this.state.current_project_id) !== undefined ? this.state.projects.find(obj => obj.id === this.state.current_project_id).title : this.state.episodes.find(obj => obj.uni_id === this.state.current_project_id).episode_title
    })
  }
  
}





componentDidUpdate = (prevProps) => {
  //console.log(`debug connections: App did update`)
  //this.getProjectsOnUpdate()
  
}

getChatIconUrls = async (project_id, shared, episode) => {
  //console.log(`getChatIcons running: project_id:  ${project_id} shared: ${shared}`)
  try {
      let response = await fetch(`${url}/projects/iconurls/${project_id}/${shared}/${episode}`,   {
      method: 'GET',
      headers: {
      'content-type': 'application/json',
      'Authorization': await this.getAuthToken()
      }
  })
  if(!response.ok){
      throw new Error(response.status)
      } else {

        const ShareBlock = {
          project_id: project_id,
          photoUrls: await response.json()
        }

        let photoUrlsProxy = this.state.photoUrls
        photoUrlsProxy.push(ShareBlock)
        
        this.setState({
          photoUrls: photoUrlsProxy
        })
      }

  } catch (error) {
  console.error('error', error)
  }
}


handleAddCharFormSubmit = async () => {
  
    const { charName,
            charAge,
            charGender,
            currentProj } = this.state
      
    const shared = []

    if(charName.value !== '' && charAge.value !== '' && charGender.value !== '') {

      const shared = []
      if(this.state.sharedProjClicked === true) {
        shared.push(this.state.uid)
      } else if (this.state.currentUserProjectShared) {
        this.state.photoUrls.find(obj => obj.project_id === this.state.current_project_id).photoUrls.map(obj => shared.push(obj.uid))
      }

      //console.log(`shared in add char ${shared}`)
        
      const newChar = {
        project_name: currentProj,
        uid: this.state.sharedProjClicked === true ? this.state.sharedProjects.find(proj => proj.title === currentProj).shared_by_uid : null,
        project_id: this.state.sharedProjClicked === false ? this.state.projects.find(proj => proj.title === this.state.currentProj).id : this.state.sharedProjects.find(proj => proj.title === this.state.currentProj).id,
        episode_id: this.state.isEpisode ? this.state.current_project_id : null,
        name: charName.value,
        age: charAge.value,
        gender: charGender.value,
        details: ['Bio', 'Want', 'Need'],
        shared: shared || null
      }

      fetch(`${url}/characters`,   {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': await this.getAuthToken()
        },
        body: JSON.stringify(newChar),
        }).then( () => {
          this.setState({
            addCharacter: false,
            currentTab: 'Characters',
          }, () => {
              this.getProjectCharacters(this.state.current_project_id, this.state.sharedProjClicked, this.state.episode_id)
              this.state.socket.emit('new-character-added', this.state.current_project_id)
          })
        }
        ).catch(error => console.error('Error:', error));
    }
}



addEp = (e, show_title, project_id, sharedProj, shared) => {
  e.stopPropagation()
  this.setState({
    addEpisode: true,
    show_title: show_title,
    project_id: project_id,
    sharedProjClicked: sharedProj,
    shared: shared,
    currentTab: undefined
  })
}

handleEpFormSubmit = async (e, history) => {
    //console.log('debug episode: handleEpFormSubmit running')
    e.preventDefault()
    const { author,
            episode_title,
            logline,
            genre,
            budget,
            timeperiod,
            similarepisodes,
            framework,
            bottle_episode } = this.state

    if(author.value !== '' && episode_title.value !== '' && logline.value !== '' && genre.value !== 'Select Genre' ){
       /*const shared = []
       if(this.state.sharedProjClicked === true ) {
        this.state.photoUrls.find(obj => obj.proj === this.state.currentProj).photoUrls.map(obj => {
            shared.push(obj.uid)
        })
      }*/
      const newEpisode = {
        show_title: this.state.show_title,
        project_id: this.state.project_id,
        episode_title: episode_title.value,
        author: author.value,
        logline: logline.value,
        genre: genre.value,
        projformat: 'Episode',
        budget: budget.value,
        timeperiod: timeperiod.value,
        similarepisodes: similarepisodes.value,
        framework: framework.value,
        bottle_episode: bottle_episode.value, 
        shared: false,
        visible: true, 
        show_hidden: false
      }

      //console.log('new epispde in handle submit', newEpisode)
      const authToken = await this.getAuthToken()
      //console.log('authToekn', authToken)
      fetch(`${url}/episodes`,   {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': authToken
        },
        body: JSON.stringify(newEpisode),
        }).then( () => {
          this.getEpisodes()
          this.setState({
            addEpisode: false
          })
          this.handleFormReset()
        }
        ).catch(error => console.error('Error:', error));
    } else {
      //console.log('debug episode: info missing')
    }

}


//Validate all form inputs have been changed
handleFormSubmit = async (e, history) => {

  e.preventDefault()
  const { author,
          title,
          logline,
          genre,
          projformat,
          budget,
          timeperiod,
          similarprojects,
          framework } = this.state

  const fields = []
    
  if(budget.value !== '' && timeperiod.value !== '' && similarprojects.value !== '' && framework.value !== 'Select Framework' && author.value !== '' && title.value !== '' && logline.value !== '' && genre.value !== 'Select Genre' && projformat.value !== 'Select Format') {

    const newProject = {
      title: title.value,
      author: author.value,
      logline: logline.value,
      genre: genre.value,
      projformat: projformat.value,
      budget: budget.value,
      timeperiod: timeperiod.value,
      similarprojects: similarprojects.value,
      framework: framework.value
    }

    //console.log('new project in handle submit', newProject)
    const authToken = await this.getAuthToken()
    //console.log('authToekn', authToken)
    if(this.state.projects.find(proj => proj.title === newProject.title) === undefined ) {
      fetch(`${url}/projects`,   {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': authToken
      },
      body: JSON.stringify(newProject),
      }).then( () => {
        this.getProjects()
        this.setState({
          addProject: false
        }, () => this.handleFormReset())
      }
      ).catch(error => console.error('Error:', error));
    } else {
      this.setState({
        projectFormError: true,
        projectFormErrorMsg: 'Project title already exists!',
        projectFormErrorField: undefined
      })
      
    }
    
  } else {
      for(const field of ['author', 'title', 'logline', 'genre', 'projformat', 'budget', 'timeperiod', 'similarprojects', 'framework']) {
        if(this.state[field].value === '' || this.state[field].value === 'Select Format' || this.state[field].value === 'Select Genre' || this.state[field].value === 'Select Framework' ) {
          //console.log(`if field: ${field} this.state.field.value ${this.state[field].value}`)
          
          fields.push(field)
          this.setState({
            projectFormError: true,
            projectFormErrorField: fields,
            projectFormErrorMsg: undefined 
          })
        } else {
          //console.log(`else field: ${field} this.state.field.value ${this.state[field].value}`)
        }
      }
    }
      
}

handleLandingClick = (e, history) => {
      history.push('/story-form');
}

  //Reset the form to default values
handleFormReset = (e) => {
    //e.preventDefault();
    this.setState({
      title: {
        value: '',
        touched: false
      },
      projformat: {
        value: 'Select Format',
        touched: false
      },
      framework: {
        value: 'Select Framework'
      },
      genre: {
        value:'Select Genre',
        touched: false
      },
      logline: {
        value: '',
        touched: false
      },
      author:{
        value: '',
        touched: false
      }
    })
}

  handleUpdateTitle = (e) => {
    if(this.state.addEpisode ===  true ) {
      //console.log(`debug episode: handleUpdateTile running this.state.addEpisode ${this.state.addEpisode}`)
      this.setState({
        episode_title: {
          value: e.target.value,
          touched: true
        }
      })
    } else {
        //console.log(`debug episode: handleUpdateTile running this.state.addEpisode ${this.state.addEpisode}`)

        this.setState({
          title: {
            value: e.target.value,
            touched: true
          }
        })
    }
    
  }

  handleUpdateFormat = (format) => {
    this.setState({
      projformat:
        {
          value: format,
          touched: true
        }
    })
  }

  handleUpdateBottle = (bottleEp) => {
    this.setState({
      bottle_episode:
        {
          value: bottleEp,
          touched: true
        }
    })
  }

  handleUpdateGenre = (genre) => {
    this.setState({
      genre: {
        value: genre,
        touched: true
      }
    })
  }

  handleUpdateLogline = (e) => {
    this.setState({
      logline: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateAuthor = (e) => {
    this.setState({
      author: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateBudget = (e) => {
    this.setState({
      budget: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateTimePeriod = (e) => {
    this.setState({
      timeperiod: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateSimilarProjects = (e,) => {
    if(this.state.addEpisode === false ) {
      this.setState({
      similarprojects: {
        value: e.target.value,
        touched: true
      }
    })
    }
    this.setState({
      similarepisodes: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateCharName = (e) => {
    this.setState({
      charName: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateCharAge = (e) => {
    this.setState({
      charAge: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateCharGender = (e) => {
    this.setState({
      charGender: {
        value: e.target.value,
        touched: true
      }
    })
  }

  handleUpdateFramework = (framework) => {
    this.setState({
      framework: {
        value: framework,
        touched: true
      }
    })
  }



  handleUserImgClick = (e) => {
    this.setState({
      renderProfileMenu: !this.state.renderProfileMenu
    })
  }

 



  updateCharacterDetail = async (raw) => {
    //console.log(`details saveState ran and tiggered updateCharacterDetail`)
    //console.log(`details path: updateCharaterDetails onChange raw: ${JSON.stringify(raw)}`)
     const shared = []
      if(this.state.sharedProjClicked === true ) {
        shared.push(this.state.uid)
        
      }
    let newDetail = {
      proj_name: this.state.currentProj,
      character_name: this.state.currentChar, 
      bio: this.state.currentAttribute === 'Bio' ? raw : null,
      want: this.state.currentAttribute === 'Want' ? raw : null,
      need: this.state.currentAttribute === 'Need' ? raw : null,
      project_id: this.state.sharedProjClicked === false ? this.state.projects.find(proj => proj.title === this.state.currentProj).id : this.state.sharedProjects.find(proj => proj.title === this.state.currentProj).id
    }
    //console.log(`details: newDetail in updateCharacterDetail ${JSON.stringify(newDetail)}`)
    //console.log( `details path eidtorFull true rendering `)
    try {
      let response = await fetch(`${url}/details/existing/${this.state.currentAttribute.toLowerCase()}/${this.state.currentChar}/${this.state.project_id}`,   {
        method: 'POST',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': await this.getAuthToken()
        },
        body: JSON.stringify(newDetail)
      })
      .then(() => this.state.socket.emit('update-detail', this.state.project_id))

    } catch (error) {
      console.error('error: ', error)
    }
  
  }

  updateProjectTreatment = async (raw) => {
    let updatedTreatment = {
      proj_name: this.state.currentProj,
      project_id: this.state.sharedProjClicked === false ? this.state.projects.find(proj => proj.title === this.state.currentProj).id : this.state.sharedProjects.find(proj => proj.title === this.state.currentProj).id,
      treatment: raw,
    }

    try {
      await fetch(`${url}/treatments`,   {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await this.getAuthToken()
        },
        body: JSON.stringify(updatedTreatment)
      })
      .then(() => this.state.socket.emit('update-treatment', this.state.project_id))

    } catch(error) {
      console.error(`error: ${error}`)
    }
  }

  //setup backend for feedback dont forget sockets
  updateFeedback = async (raw) => {
    let updatedFeedback = {
      proj_name: this.state.currentProj,
      project_id: this.state.sharedProjClicked === false ? this.state.projects.find(proj => proj.title === this.state.currentProj).id : this.state.sharedProjects.find(proj => proj.title === this.state.currentProj).id,
      treatment: raw,
    }

    try {
      await fetch(`${url}/feedback`,   {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await this.getAuthToken()
        },
        body: JSON.stringify(updatedFeedback)
      })
      .then(() => this.state.socket.emit('update-feedback', this.state.project_id))

    } catch(error) {
      console.error(`error: ${error}`)
    }
  }

  //fix sharing scenes for episodes when scenes exist before project is shared, same for characters probably 
  onProjectClick = async (e, proj, projformat, framework, sharedProj, shared, episode_id, project_id, isEpisode, showTitle) => {
    //console.log(`project_id onProjectClick: ${project_id} episode_id: ${episode_id}`)
    //console.log(`onProjectClick isEp ${isEpisode}`)
    e.stopPropagation()
    this.setState({
      currentProj: this.state.current_project_id !== undefined 
                    ? this.state.projects.find(proj => proj.id === this.state.current_project_id) !== undefined 
                        ? this.state.projects.find(proj => proj.id === this.state.current_project_id).title
                        : this.state.episodes.find(ep => ep.uni_id === this.state.current_project_id).episode_title
                    : proj,
      currentProjFormat: projformat,
      currentChar: undefined,
      currentAttribute: undefined, 
      currentTab: projformat === "Television" || projformat === "Episode" 
                    ? "Overview" 
                    : this.state.currentTab === undefined 
                        ? "Overview" 
                        : this.state.currentProjFormat === 'Television' || this.state.currentProjFormat === 'Episode' 
                            ? "Overview" 
                            : this.state.currentTab,
      sharedProjClicked: sharedProj,
      currentUserProjectShared: shared,
      current_project_id: project_id,
      episode_id: episode_id,
      isEpisode: isEpisode,
      showTitle: showTitle

      }, () => {
        this.getProjectCharacters(project_id, sharedProj, episode_id)
        if(projformat !== 'Television') {
          this.getProjectScenes(project_id, sharedProj, episode_id)
        }
        //console.log('currentTab:', this.state.currentTab)
    })
    this.setTable(framework)
  }

  setTable = (framework) => {
    //console.log(`set Table running framework: ${framework}`)
    switch (framework) {
      case "The Hero's Journey":
        this.setState({
          tableName: 'hero'
        })
        break

      case "The Anatomy of Story":
        this.setState({
          tableName: 'anatomy'
        })
        break

      case "Save The Cat":
        this.setState({
          tableName: 'cat'
        })
        break
    }
  }

  onTabClick = (e, tab) => {
    //console.log('tab', tab)
    this.setState({
      currentTab: tab,
    })
  }

  onCharacterClick = (char) => {
    this.setState({
      currentChar: char,
      currentAttribute: 'Bio',
      activeDetail: true
    })
  }

   onAttributeClick = async (attr, body) => {
    this.setState({
      currentAttribute: attr,
      activeDetail: true
    })
    
  }

  goHome = () => {
    this.setState({
      currentProj: undefined,
      currentTab: undefined
    })
  }

  _addScene = (e, currentAct) => {
    this.setState({
      addScene: true, 
      currentAct: currentAct
    })
  }

  handleAddSceneSubmit = async (currentProj, currentAct, currentStep, sharedProjectClicked, scene_heading, thesis, antithesis, synthesis) => {
    //e.stopPropagation()
    //console.log(`debug handleSceneSubmit currentStep ${currentStep}`)
    const shared = []

    if(this.state.sharedProjClicked === true ) {
      shared.push(this.state.uid)
    } else if (this.state.currentUserProjectShared) {
        this.state.photoUrls.find(obj => obj.project_id === this.state.current_project_id).photoUrls.map(obj => shared.push(obj.uid))
    }
    const newScene = {
      project_name: currentProj,
      act: `Act ${currentAct}`,
      step_name: currentStep,
      scene_heading: scene_heading,
      thesis: thesis,
      antithesis: antithesis,
      synthesis: synthesis,
      uid: this.state.sharedProjClicked === true 
            ? this.state.sharedProjects.find(proj => proj.title === currentProj) !== undefined 
                ? this.state.sharedProjects.find(proj => proj.title === currentProj).shared_by_uid 
                : this.state.sharedEpisodes.find(proj => proj.episode_title === currentProj).shared_by_uid 
            : this.state.uid,
      project_id: this.state.current_project_id,
      episode_id: this.state.isEpisode ? this.state.episode_id : null,
      shared: shared || null
    }
    
    try {
        let response = await fetch(`${url}/scenes/${this.state.current_project_id}/${this.state.episode_id}`,   {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': await this.getAuthToken()
            },
            body: JSON.stringify(newScene)
        }).then(() => {
            this.setState({
              addScene: false
            })
            //console.log(`debug scenes: line 1048 this.state.project_id ${this.state.current_project_id}`)
            
            this.getProjectScenes(this.state.current_project_id, sharedProjectClicked, this.state.episode_id)
            this.state.socket.emit('scene-added', this.state.current_project_id, this.state.episode_id)
        }).catch(error => {
            console.error('Error:', error)
          });

    } catch(err) {
        console.error(`error: ${err}`)
    }
  }

  closeAddScene = () => {
    this.setState({
      addScene: false
    })
  }

  closeAddChar = () => {
    this.setState({
      addCharacter: false
    })
  }

  addChar = (char) => {
    //console.log('add char running')
    this.setState({
      addCharacter: true,
    })
  }

  deleteChar = async (e, charId) => {
    //console.log('delete charId', charId)
    fetch(`${url}/characters/${charId}`,   {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization': await this.getAuthToken()
        },
        }).then( () => {
          this.getProjectCharacters(this.state.current_project_id, this.state.sharedProjClicked, this.state.episode_id)
          this.setState({
            currentChar: undefined
          })
        }
        ).catch(error => console.error('Error:', error));
  }

  closeAddProj = () => {
    this.handleFormReset()
    this.setState({
      addProject: false,
      projectFormError: false,
      projectFormErrorFiled: ''

    })
  }

  closeAddEp = () => {
    this.setState({
      addEpisode: false
    })
  }

 

  addProj = () => {
    this.setState({
      addProject: true,
      
    })
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  episodeSelected = selectedEpisode => {
    this.setState({ selectedEpisode })
  }

  showShareProject = (project, project_id, projFormat, framework, sharedProj) => {
   
    this.setState({
      renderShareComponent: true,
      projectToShare: project_id,
      currentProjFormat: projFormat,
      currentProj: project,
      current_project_id: project_id,
      sharedProjClicked: sharedProj
    })
    this.setTable(framework)
  }

  shareProject = async (e, email, message, episodes, permission) => {
    //console.log(`debug share project: client shareProject ran`)
    e.stopPropagation()
    this.setState({
      renderShareComponent: false
    })
    //console.log('sharing episodes: episodes', episodes)
    //console.log('sharing episodes: object key episodes', Object.keys(episodes))
    //console.log('sharing episodes: some', episodes.some(ep => ep.checked === true))
    //episodes.forEach(ep => //console.log('sharing episodes: ep.checked', ep.checked))
    const shareEpisodes = []
    let titles = []
    if(episodes.length > 0) {
      episodes.forEach( ep => ep.checked === true ? titles.push(ep.title) : null )
    } else {
      titles = null
    }
    try {
      //console.log(`sharing episodes: object keys shareEpisodes: ${Object.keys(shareEpisodes)}`)
      //console.log('sharing episodes: titles', titles)

      let response = await fetch(`${url}/verify/user/${email}/proj/${this.state.current_project_id}/${this.state.currentProjFormat}/${message}/${permission}/?titles[]=${titles}`,   {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': await this.getAuthToken()
        },
      })
      
    } catch(error) {
        console.error('error:', error)
    }
    this.state.socket.emit('project-shared', email)
    setTimeout(() => {
      this.getProjects()
      this.getEpisodes()
    }, 1500)
    
  }

  openUserChat = (e, title, recipient_uid, email, sharedProj, uni_id, project_id) => {
    //console.log(`open user chat uni_id ${uni_id}`)
    e.stopPropagation()
    
    const chats = this.state.openChats
    const chat = {
      title: title,
      recipient_uid: recipient_uid,
      email: email,
      uni_id: uni_id,
      project_id: project_id,
      shared: sharedProj
    }
    if(this.state.unreadMessagesStatus.find(obj => obj.title === title)) {
      let statusProxy = this.state.unreadMessagesStatus.find(obj => obj.title === title)
      let indexObjUpdate = this.state.unreadMessagesStatus.indexOf(statusProxy)
      statusProxy.numUnreadMsgs = null
      let unreadMessagesStatusProxy = this.state.unreadMessagesStatus
      unreadMessagesStatusProxy.splice(indexObjUpdate, 1, statusProxy)
      this.setState({
        unreadMessagesStatus: unreadMessagesStatusProxy
      })
    }
   
    chats.push(chat)
    this.setState({
      openChats: chats,
      unReadMessages: undefined,
      
    }, () => {
      setTimeout(() => {
        //this.createUnreadArgs(sharedProj)
        this.getAllUserProjects()
      }, 2000)
      //console.log(`debug notification openUserChat this.state.unReadMessages: ${JSON.stringify(this.state.unReadMessages)}`)
    })
    
    //console.log(`running open user chat`)
   

  }

  

  showHiddenEpisodes = async (e) => {
    //console.log('debug hide/show: show hidden episodes running')
    this.setState({
      showHiddenModeEp: ! this.state.showHiddenModeEp
    }, async () => {
      try {
        fetch(`${url}/episodes/showhidden/${this.state.showHiddenModeEp}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then( () => {
          this.getEpisodes()
        })

      } catch(error) {
          console.error('error', error)
      }
    })

    
  }

  showHiddenSharedEpisodes = async (e) => {
    //console.log('debug hide/show: show hidden shared episodes running')
    this.setState({
      showHiddenModeSharedEp: ! this.state.showHiddenModeSharedEp
    }, async () => {
      try {
        //console.log(`debug hide/show: this.state.showHiddenModeSharedEp ${this.state.showHiddenModeSharedEp}`)
        fetch(`${url}/shared/episodes/showhidden/${this.state.showHiddenModeSharedEp}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then( () => {
          this.getSharedEpisodes()
        })

      } catch(error) {
          console.error('error', error)
      }
    })

    
  }

  showHiddenProjects = async (e) => {
    //console.log('debug hide/show: show hidden projects running')
    this.setState({
      showHiddenMode: ! this.state.showHiddenMode
    }, async () => {
      try {
        fetch(`${url}/projects/showhidden/${this.state.showHiddenMode}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then( () => {
          this.getProjects()
        })

      } catch(error) {
          console.error('error', error)
      }
    })

    
  }

  showHiddenSharedProjects = async (e) => {
    //console.log(`debug hide/show: showHiddenSharedPRojects running`)
    e.stopPropagation()
    this.setState({
      showHiddenModeShared: ! this.state.showHiddenModeShared
    }, async () => {
      try {
        fetch(`${url}/shared/projects/showhidden/${this.state.showHiddenModeShared}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then( () => {
            this.getSharedProjects()
        })

      } catch(error) {
          console.error('error', error)
      }
    })

  }

   unHideEpisode = async (e, show, episode, sharedProj) => {
    e.stopPropagation()
    //console.log('debug hide/show: unhide episode running')
    try {
      this.setState({
        projectHidden: sharedProj === false ? true : false, 
        sharedProjectHidden: sharedProj === true ? true : false, 
        showHiddenMode: this.state.projects.filter(proj => proj.visible === false).length === 1 ? false : true,
        showHiddenModeSharedEp: sharedProj === true ? this.state.sharedEpisodes.filter(proj => proj.visible === false).length === 1 ? false : true : this.state.showHiddenModeSharedEp

      })
      if(sharedProj === false ) {
        fetch(`${url}/episodes/unhide/${show}/${episode}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getEpisodes()
        })
      }
      else {
        fetch(`${url}/shared/episodes/unhide/${show}/${episode}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getSharedEpisodes()
        })
      }
      

    } catch(error) {
      console.error('error:', error)
    }
  }

  hideEpisode = async (e, show, episode, sharedProj) => {

    e.stopPropagation()
    //console.log(`debug hide/show: episode running: show: ${show}, episode: ${episode}, sharedProj: ${sharedProj}`)
    try {
      this.setState({
        projectHidden: sharedProj === false ? true : false, 
        sharedProjectHidden: sharedProj === true ? true : false, 
      })

      if(sharedProj === false ) {
        fetch(`${url}/episodes/hide/${show}/${episode}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getEpisodes()
        })
      }
      else {
        //console.log('debug hide/show: shared episode being hidden, show, episode', show, episode)
        fetch(`${url}/shared/episodes/hide/${show}/${episode}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getSharedEpisodes()
        })
      }

    } catch(error) {
      console.error('error:', error)
    }
  }

  unHideProj = async (e, proj, sharedProj) => {
    //console.log('debug hide/show: unHideProj running')
    //console.log(`debug hide/show: e: ${e}, proj: ${proj}, sharedProj: ${sharedProj}`)
    if(e !== undefined) {
      e.stopPropagation()
    }
    try {
      this.setState({
        projectHidden: sharedProj === false ? true : false, 
        sharedProjectHidden: sharedProj === true ? true : false, 
        showHiddenMode: this.state.projects.filter(proj => proj.visible === false).length === 1 ? false : true,
        showHiddenModeShared: sharedProj === true ? this.state.sharedProjects.filter(proj => proj.visible === false).length === 1 ? false : true : this.state.showHiddenModeShared
       
      })
      if(sharedProj === false ) {
        fetch(`${url}/projects/unhide/${proj}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getProjects()
        })
      }
      else {
        fetch(`${url}/shared/projects/unhide/${proj}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getSharedProjects()
        })
      }
      

    } catch(error) {
      console.error('error:', error)
    }
  }

  hideProj = async (e, proj, sharedProj) => {
    //console.log('debug hide/show: hideProj running')
    if(e !== undefined) {
      e.stopPropagation()
    }
    try {
      this.setState({
        projectHidden: sharedProj === false ? true : false, 
        sharedProjectHidden: sharedProj === true ? true : false, 
      })

      if(sharedProj === false ) {
        fetch(`${url}/projects/hide/${proj}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getProjects()
        })
      }
      else {
        fetch(`${url}/shared/projects/hide/${proj}`,   {
          method:'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': await this.getAuthToken()
          }
        })
        .then(() => {
          this.getSharedProjects()
        })
      }
      
      
      

    } catch(error) {
      console.error('error:', error)
    }
  }

  deleteProj = async (...args) => {
    //console.log(`delete proj args: ${args}`)
    let table
    let id = args[1]
    let event
    if(args.length > 2) {
      table = 'episodes'
      event = args[0]
      event.stopPropagation()
    } else {
      table ='projects'
    }
    
    //console.log('prject id delete: ', projId)
    this.setState({
      currentTab: undefined,
      currentProj: undefined
    })
   //console.log(`projId in deleteProj ${projId}`)
    fetch(`${url}/${table}/${id}`,   {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization': await this.getAuthToken()
        },
        }).then( () => {
          this.getProjects()
          this.getEpisodes()

        }
        ).catch(error => console.error('Error:', error));

  }

  updateUser = (user) => {
    this.setState({
      user: user
    })
  }

   collapseTvShowList = (proj) => {
    this.setState({
      renderUpTvArrow: false,
      tvArrowProj: proj
    })
  }

  expandTvShowList = (proj) => {
    this.setState({
      renderUpTvArrow: true,
      tvArrowProj: proj
    })
  }

  collapseProjectList = () => {
    this.setState({
      renderUpArrow: false,
    })
    this.getProjects()
  }

  expandProjectList = () => {
    this.setState({
      renderUpArrow: true,
    })
  }

  collapseSharedProjectList = () => {
    this.setState({
      renderSharedUpArrow: false,
    })
  }

  expandSharedProjectList = () => {
    this.setState({
      renderSharedUpArrow: true,
    })
  }

  collapseSharedTvList = (proj) => {
    this.setState({
      renderUpTvArrowShared: false,
      tvSharedArrowProj: proj
    })
  }

  expandSharedTvList = (proj) => {
    this.setState({
      renderUpTvArrowShared: true,
      tvSharedArrowProj: proj
    })
  }

  closeShareComponent = () => {
    this.setState({
      renderShareComponent: false
    })
  }

  render(){
    //console.log('App Render')

    contextValue = {
      _addScene: this._addScene,
      activeDetail: this.state.activeDetail,
      addChar: this.addChar,
      addCharacter: this.state.addCharacter,
      addEp: this.addEp,
      addEpisode: this.state.addEpisode,
      addProj: this.addProj,
      addProject: this.state.addProject,
      addScene: this.state.addScene,
      author: this.state.author,
      bottle_episode: this.state.bottle_episode, 
      budget: this.state.budget,
      charAge: this.state.charAge,
      charName: this.state.charName,
      closeAddChar: this.closeAddChar,
      closeAddEp: this.closeAddEp,
      closeAddProj: this.closeAddProj,
      closeAddScene: this.closeAddScene,
      closeChatWindow: this.closeChatWindow,
      closeShareComponent: this.closeShareComponent,
      collapseProjectList: this.collapseProjectList,
      collapseSharedProjectList: this.collapseSharedProjectList,
      collapseSharedTvList: this.collapseSharedTvList,
      collapseTvShowList: this.collapseTvShowList,
      createUnreadArgs: this.createUnreadArgs,
      current_project_id: this.state.current_project_id,
      currentAct: this.state.currentAct,
      currentActInstructions: this.state.currentActInstructions,
      currentActOneStep: this.state.currentActOneStep,
      currentActThreeStep: this.state.currentActThreeStep,
      currentActTwoStep: this.state.currentActTwoStep,
      currentAttribute: this.state.currentAttribute,
      currentChar: this.state.currentChar,
      currentProj: this.state.currentProj,
      currentProjFormat: this.state.currentProjFormat, 
      currentTab: this.state.currentTab,
      currentUserProjectShared: this.state.currentUserProjectShared,
      deleteChar: this.deleteChar,
      deleteProj: this.deleteProj,
      deleteSceneMode: this.deleteSceneMode,
      deleteScenes: this.state.deleteScenes,
      detailContent: this.state.detailContent,
      displayName: this.state.displayName,
      editorState: this.state.editorState,
      email: this.state.email,
      episode_id: this.state.episode_id,
      episode_title: this.state.episode_title,
      episodes: this.state.episodes,
      episodeSelected: this.episodeSelected,
      episodeTitle: this.state.episodeTitle,
      expandProjectList: this.expandProjectList,
      expandSharedProjectList: this.expandSharedProjectList,
      expandSharedTvList: this.expandSharedTvList,
      expandTvShowList: this.expandTvShowList,
      framework: this.state.framework,
      genre: this.state.genre,
      getAllUserProjects: this.getAllUserProjects,
      getAuthToken: this.getAuthToken,
      getChatIconUrls: this.getChatIconUrls,
      getEditorState: this.getEditorState,
      getEpisodes: this.getEpisodes,
      getProjectScenes: this.getProjectScenes,
      getSteps: this.getSteps,
      getUnread: this.getUnread,
      goHome: this.goHome,
      handleAddCharFormSubmit: this.handleAddCharFormSubmit,
      handleAddSceneSubmit: this.handleAddSceneSubmit,
      handleEpFormSubmit: this.handleEpFormSubmit,
      handleFormReset: this.handleFormReset,
      handleFormSubmit: this.handleFormSubmit,
      handleGoogleLogin: this.handleGoogleLogin,
      handleLandingClick: this.handleLandingClick,
      handleSearchUpdate: this.handleSearchUpdate,
      handleSignout: this.handleSignout,
      handleUpdateAuthor: this.handleUpdateAuthor,
      handleUpdateBottle: this.handleUpdateBottle, 
      handleUpdateBudget: this.handleUpdateBudget,
      handleUpdateCharAge: this.handleUpdateCharAge,
      handleUpdateCharGender: this.handleUpdateCharGender,
      handleUpdateCharName: this.handleUpdateCharName,
      handleUpdateFormat: this.handleUpdateFormat,
      handleUpdateFramework: this.handleUpdateFramework,
      handleUpdateGenre: this.handleUpdateGenre,
      handleUpdateLogline: this.handleUpdateLogline,
      handleUpdateSimilarProjects: this.handleUpdateSimilarProjects,
      handleUpdateTimePeriod: this.handleUpdateTimePeriod,
      handleUpdateTitle: this.handleUpdateTitle,
      handleUserImgClick: this.handleUserImgClick,
      hideEpisode: this.hideEpisode,
      hideProj: this.hideProj,
      history: this.state.history,
      idToken: this.state.idToken,
      isEpisode: this.state.isEpisode,
      logline: this.state.logline,
      onAttributeClick: this.onAttributeClick,
      onCharacterClick: this.onCharacterClick,
      onProjectClick: this.onProjectClick,
      onSelectedItemsChange: this.onSelectedItemsChange,
      onTabClick: this.onTabClick,
      openChats: this.state.openChats,
      openUserChat: this.openUserChat,
      photoUrl: this.state.photoUrl,
      photoUrls: this.state.photoUrls,
      projCharacters: this.state.projCharacters,
      projectFormError: this.state.projectFormError,
      projectFormErrorField: this.state.projectFormErrorField,
      projectFormErrorMsg: this.state.projectFormErrorMsg,
      projectHidden: this.state.projectHidden, 
      projects: this.state.projects,
      projectToShare: this.state.projectToShare,
      projformat: this.state.projformat,
      projScenes: this.state.projScenes,
      projTitles: this.state.projTitles,
      renderProfileMenu: this.state.renderProfileMenu,
      renderShareComponent: this.state.renderShareComponent,
      renderSharedUpArrow: this.state.renderSharedUpArrow,
      renderSignOut: this.state.renderSignOut,
      renderUpArrow: this.state.renderUpArrow, 
      renderUpTvArrow: this.state.renderUpTvArrow,
      renderUpTvArrowShared: this.state.renderUpTvArrowShared,
      selectedEpisode: this.state.selectedEpisode, 
      selectedItems: this.state.selectedItems, 
      sharedEpisodes: this.state.sharedEpisodes, 
      sharedProjClicked: this.state.sharedProjClicked, 
      sharedProjectClicked: this.state.sharedProjClicked,
      sharedProjectHidden: this.state.sharedProjectHidden,
      sharedProjects: this.state.sharedProjects,
      sharedWith: this.state.sharedWith,
      shareProject: this.shareProject,
      showHiddenEpisodes: this.showHiddenEpisodes,
      showHiddenMode: this.state.showHiddenMode,
      showHiddenModeEp: this.state.showHiddenModeEp,
      showHiddenModeShared: this.state.ShowHiddeModeShared, 
      showHiddenModeSharedEp: this.state.ShowHiddeModeSharedEp, 
      showHiddenProjects: this.showHiddenProjects,
      showHiddenSharedEpisodes: this.showHiddenSharedEpisodes,
      showHiddenSharedProjects: this.showHiddenSharedProjects,
      showShareProject: this.showShareProject,
      signInWithGoogle: this.state.signInWithGoogle,
      signOut: this.state.signOut,
      similarepisodes: this.state.similarepisodes,
      similarProjects: this.state.similarprojects,
      steps: this.state.steps,
      tableName: this.state.tableName,
      tableName: this.state.tableName,
      tabSelectBorderColor: this.state.tabSelectBorderColor,
      tabSelectBorderWidth: this.state.tabSelectBorderWidth,
      tabTitles: this.state.tabTitles,
      timeperiod: this.state.timeperiod,
      title: this.state.title,
      tvArrowProj: this.state.tvArrowProj,
      uid: this.state.uid,
      unHideEpisode: this.unHideEpisode,
      unHideProj: this.unHideProj,
      unreadMessages: this.state.unreadMessages,
      unreadMessagesStatus: this.state.unreadMessagesStatus,
      updateCharacterDetail: this.updateCharacterDetail,
      updateProjectTreatment: this.updateProjectTreatment,
      updateFeedback: this.updateFeedback,
      updateUser: this.updateUser,
      userAccount: this.state.userAccount,
      validateAuthorName: this.validateAuthorName,
      validateFormatName: this.validateFormatName,
      validateGenreName: this.validateGenreName,
      validateLoglineVal: this.validateLoglineVal,
      validateTitleName: this.validateTitleName,
      windowHeight: this.state.windowHeight,
      windowWidth: this.state.windowWidth,

    }
    
    return (
      <WritualContext.Provider value={contextValue}>
        <View style={{width: '100%', height: hp('100%')}}>
          <BrowserRouter>
            <Route exact path='/' componentName='Login' render={props =>
                <Login uid={this.state.uid} history={props.history}/>
            }/>
            <ErrorBoundary getAuthToken={this.getAuthToken}>
              <ProtectedRoute email={this.state.email} exact path='/writual' history={this.props.history} component={WritualUI}/>
            </ErrorBoundary>
          </BrowserRouter>

        </View>
    </WritualContext.Provider>
    );
  }

}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App, contextValue);