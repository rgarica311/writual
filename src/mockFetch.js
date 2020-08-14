import { config } from './URLS'

const url = config.API_URL

export default async function mockFetch(url) {
    //console.log('mockFetch url', url)
    let icon_url = new RegExp("/http:\/\/192.168.0.13:8000\/projects\/iconurls\/.*?\/.*?\/.*?/")
    switch(url) {
        case `${url}/projects`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        "id": "a1a0fb78-e58d-440e-aee3-0f419e939a8d",
                        "uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "title": "Movie One",
                        "author": "test",
                        "logline": "test",
                        "genre": "Action",
                        "projformat": "Feature",
                        "has_episodes": false,
                        "budget": "test",
                        "timeperiod": "test",
                        "similarprojects": "test",
                        "framework": "The Hero's Journey",
                        "visible": true,
                        "show_hidden": false,
                        "date_created": "2020-07-02T23:58:21.390Z",
                        "shared": false
                    },
                    {
                        "id": "bef2113a-ee12-4298-88c2-d20c948b1830",
                        "uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "title": "Test Tv",
                        "author": "test",
                        "logline": "test",
                        "genre": "Drama",
                        "projformat": "Television",
                        "has_episodes": false,
                        "budget": "test",
                        "timeperiod": "test",
                        "similarprojects": "test",
                        "framework": "The Hero's Journey",
                        "visible": true,
                        "show_hidden": false,
                        "date_created": "2020-07-03T17:49:38.656Z",
                        "shared": false
                    },
                    {
                        "id": "fdf2a9bb-2ab7-4373-b907-dad28b8bdc4d",
                        "uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "title": "Movie Two",
                        "author": "test",
                        "logline": "test",
                        "genre": "Drama",
                        "projformat": "Feature",
                        "has_episodes": null,
                        "budget": "test",
                        "timeperiod": "test",
                        "similarprojects": "test",
                        "framework": "The Anatomy of Story",
                        "visible": true,
                        "show_hidden": false,
                        "date_created": "2020-07-14T00:48:56.609Z",
                        "shared": false
                    },
                    {
                        "id": "79f97a44-9451-4e93-8248-dfa4b2098e44",
                        "uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "title": "Show Show",
                        "author": "test",
                        "logline": "test",
                        "genre": "Action",
                        "projformat": "Television",
                        "has_episodes": null,
                        "budget": "test",
                        "timeperiod": "test",
                        "similarprojects": "test",
                        "framework": "The Anatomy of Story",
                        "visible": true,
                        "show_hidden": false,
                        "date_created": "2020-07-14T00:50:10.598Z",
                        "shared": false
                    }]
                ),
            }
        }
        case `${url}/episodes`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        "uni_id": "3d4ce454-71a8-4283-ab56-31b652196744",
                        "uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "show_title": "Test Tv",
                        "project_id": "bef2113a-ee12-4298-88c2-d20c948b1830",
                        "episode_num": null,
                        "episode_title": "TV Pilot",
                        "author": "test",
                        "logline": "test",
                        "genre": "Horror",
                        "projformat": "Episode",
                        "budget": "test",
                        "timeperiod": "test",
                        "similarepisodes": "test",
                        "framework": "The Hero's Journey",
                        "bottle_episode": "Bottle Episode No",
                        "visible": true,
                        "show_hidden": false,
                        "date_created": "2020-07-14T00:48:20.001Z",
                        "shared": false
                    },
                    {
                        "uni_id": "7fb99a2f-00df-4a28-ba44-00268c3ce095",
                        "uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "show_title": "Show testShow",
                        "project_id": "79f97a44-9451-4e93-8248-dfa4b2098e44",
                        "episode_num": null,
                        "episode_title": "Show Pilot",
                        "author": "test",
                        "logline": "test",
                        "genre": "Action",
                        "projformat": "Episode",
                        "budget": "test",
                        "timeperiod": "test",
                        "similarepisodes": "test",
                        "framework": "Save The Cat",
                        "bottle_episode": "Bottle Episode No",
                        "visible": true,
                        "show_hidden": false,
                        "date_created": "2020-07-14T00:51:29.691Z",
                        "shared": false
                    }]
                )
            }
        }
        case `${url}/shared/episodes`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        "uni_id": "2272bf82-5a74-4cc9-ae6a-fcee230e0999",
                        "id": "2c256538-1055-4b07-a056-220921b77dcb",
                        "episode_num": null,
                        "show_title": "Tv Show",
                        "project_id": "69f3a431-82d6-4af9-8e2f-703f8f534c62",
                        "episode_title": "Episode Three",
                        "author": "test",
                        "logline": "test",
                        "genre": "Drama",
                        "projformat": "Episode",
                        "budget": "test",
                        "timeperiod": "test",
                        "similarepisodes": "test",
                        "framework": "The Hero's Journey",
                        "bottle_episode": "Bottle Episode No",
                        "visible": true,
                        "show_hidden": false,
                        "shared_by_uid": "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        "shared_with_uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "permission": "Can View",
                        "date_created": "2020-07-15T23:46:33.994Z"
                    },
                    {
                        "uni_id": "e85ada15-98a3-43fa-9b4c-a36104bf91c8",
                        "id": "f6045dfd-6de4-4ad5-97a0-0af974c3d003",
                        "episode_num": null,
                        "show_title": "Tv Show",
                        "project_id": "69f3a431-82d6-4af9-8e2f-703f8f534c62",
                        "episode_title": "Pilot",
                        "author": "test",
                        "logline": "test",
                        "genre": "Drama",
                        "projformat": "Episode",
                        "budget": "test",
                        "timeperiod": "test",
                        "similarepisodes": "test",
                        "framework": "The Hero's Journey",
                        "bottle_episode": "Bottle Episode No",
                        "visible": true,
                        "show_hidden": false,
                        "shared_by_uid": "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        "shared_with_uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "permission": "Can Edit",
                        "date_created": "2020-07-16T02:27:16.574Z"
                    },
                    {
                        "uni_id": "9e3bf849-795e-449e-92af-5ca23bb5b8db",
                        "id": "d7a05541-1df5-4c17-ab56-09b610a43822",
                        "episode_num": null,
                        "show_title": "Tv Show",
                        "project_id": "69f3a431-82d6-4af9-8e2f-703f8f534c62",
                        "episode_title": "Episode 2",
                        "author": "test",
                        "logline": "test",
                        "genre": "Drama",
                        "projformat": "Episode",
                        "budget": "test",
                        "timeperiod": "test",
                        "similarepisodes": "test",
                        "framework": "The Hero's Journey",
                        "bottle_episode": "Bottle Episode No",
                        "visible": true,
                        "show_hidden": false,
                        "shared_by_uid": "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        "shared_with_uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "permission": "Can View",
                        "date_created": "2020-07-16T02:27:16.575Z"
                    },
                    {
                        "uni_id": "2696e944-b7dd-4c8c-a38a-4ce8a9c5c5b5",
                        "id": "4cd03a26-42be-4a5b-b7e3-f29fcf67a729",
                        "episode_num": null,
                        "show_title": "Tv Show",
                        "project_id": "69f3a431-82d6-4af9-8e2f-703f8f534c62",
                        "episode_title": "Ep 4",
                        "author": "test",
                        "logline": "test",
                        "genre": "Comedy",
                        "projformat": "Episode",
                        "budget": "test",
                        "timeperiod": "test",
                        "similarepisodes": "test",
                        "framework": "The Anatomy of Story",
                        "bottle_episode": "Bottle Episode No",
                        "visible": true,
                        "show_hidden": false,
                        "shared_by_uid": "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        "shared_with_uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "permission": "Can View",
                        "date_created": "2020-07-16T02:27:16.581Z"
                    }]
                )
            }
        }
        case `${url}/shared/projects`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        "uni_id": "a0cc4f94-32de-4b29-8eb2-63654f7fc3ed",
                        "id": "6e698ef9-0c1f-49eb-8057-3ba04fa692e0",
                        "title": "Movie Three",
                        "author": "test",
                        "logline": "test",
                        "genre": "Horror",
                        "projformat": "Feature",
                        "has_episodes": null,
                        "budget": "test",
                        "timeperiod": "test",
                        "similarprojects": "test",
                        "framework": "Save The Cat",
                        "visible": true,
                        "show_hidden": null,
                        "shared_by_uid": "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        "shared_with_uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "permission": "Can Edit"
                    },
                    {
                        "uni_id": "b934b7dc-a99f-4e59-93e8-9da30da9c8c5",
                        "id": "69f3a431-82d6-4af9-8e2f-703f8f534c62",
                        "title": "Tv Show",
                        "author": "test",
                        "logline": "test",
                        "genre": "Comedy",
                        "projformat": "Television",
                        "has_episodes": true,
                        "budget": "test",
                        "timeperiod": "test",
                        "similarprojects": "test",
                        "framework": "The Hero's Journey",
                        "visible": true,
                        "show_hidden": null,
                        "shared_by_uid": "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        "shared_with_uid": "hTbqcYvNe7dGhxXaphw3UEqNfep2",
                        "permission": "Can View"
                    }]
                )
            }
        }
        case `${url}/projects/iconurls/6e698ef9-0c1f-49eb-8057-3ba04fa692e0/true/false`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        email: 'test@email.com',
                        id: 1,
                        photo_url: "https://lh5.googleusercontent.com/-dsdUn-6ZsUM/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA-DHKVUz1WlofYi3_sfQDDeFf4zg/photo.jpg",
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        user_name: 'testUserName'
                    }]
                )
            }
        }

        case `${url}/projects/iconurls/69f3a431-82d6-4af9-8e2f-703f8f534c62/true/false`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        email: 'test@email.com',
                        id: 1,
                        photo_url: "https://lh5.googleusercontent.com/-dsdUn-6ZsUM/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA-DHKVUz1WlofYi3_sfQDDeFf4zg/photo.jpg",
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        user_name: 'testUserName'
                    }]
                )
            }
        }

        case `${url}/projects/iconurls/6e698ef9-0c1f-49eb-8057-3ba04fa692e0/true/false`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        email: 'test@email.com',
                        id: 1,
                        photo_url: "https://lh5.googleusercontent.com/-dsdUn-6ZsUM/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA-DHKVUz1WlofYi3_sfQDDeFf4zg/photo.jpg",
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        user_name: 'testUserName'
                    }]
                )
            }
        }

        case `${url}/projects/iconurls/2c256538-1055-4b07-a056-220921b77dcb/true/true`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        email: 'test@email.com',
                        id: 1,
                        photo_url: "https://lh5.googleusercontent.com/-dsdUn-6ZsUM/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA-DHKVUz1WlofYi3_sfQDDeFf4zg/photo.jpg",
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        user_name: 'testUserName'
                    }]
                )
            }
        }

        case `${url}/projects/iconurls/d7a05541-1df5-4c17-ab56-09b610a43822/true/true`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        email: 'test@email.com',
                        id: 1,
                        photo_url: "https://lh5.googleusercontent.com/-dsdUn-6ZsUM/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA-DHKVUz1WlofYi3_sfQDDeFf4zg/photo.jpg",
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        user_name: 'testUserName'
                    }]
                )
            }
        }

        case `${url}/projects/iconurls/4cd03a26-42be-4a5b-b7e3-f29fcf67a729/true/true`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        email: 'test@email.com',
                        id: 1,
                        photo_url: "https://lh5.googleusercontent.com/-dsdUn-6ZsUM/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA-DHKVUz1WlofYi3_sfQDDeFf4zg/photo.jpg",
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        user_name: 'testUserName'
                    }]
                )
            }
        }

        case `${url}/projects/iconurls/f6045dfd-6de4-4ad5-97a0-0af974c3d003/true/true`: {
            return {
                ok: true,
                status: 200,
                json: async () => (
                    [{
                        email: 'test@email.com',
                        id: 1,
                        photo_url: "https://lh5.googleusercontent.com/-dsdUn-6ZsUM/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA-DHKVUz1WlofYi3_sfQDDeFf4zg/photo.jpg",
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        user_name: 'testUserName'
                    }]
                )
            }
        }

        
        case `${url}/users` : {
            return 'Post to users ran'
        }

        case `${url}/characters/a1a0fb78-e58d-440e-aee3-0f419e939a8d` : {
            return {
                ok: true, 
                statu: 200,
                json: async () => (
                    [{
                        id: 'b1a8fb68-e68z-250e-age7-3f3759539a8z',
                        project_name: 'Movie One',
                        project_id: 'a1a0fb78-e58d-440e-aee3-0f419e939a8d',
                        name: 'Dane',
                        age: '18',
                        gender: 'Male',
                        details: ['bio', 'want', 'need']
                    }]
                )
            }
        }

        case `${url}/scenes/a1a0fb78-e58d-440e-aee3-0f419e939a8d/undefined` : {
            return {
                ok: true, 
                statu: 200,
                json: async () => (
                    [{
                        id: '4676567787-987-9867-9yufgh-76ghvkjghf',
                        uid: "heWtoH3WexPO84t5dJOiqWF1UlU2",
                        project_name: "Movie One",
                        project_id: "a1a0fb78-e58d-440e-aee3-0f419e939a8d",
                        act: "1",
                        step_name: "Ordinary World",
                        scene_heading: "test heading",
                        thesis: "test thesis",
                        antithesis: "test antithesis",
                        synthesis: "test synthesis"
                    }]
                )
            }
        }

        case `${url}/undefined/undefined` : {
            return {
                ok: true, 
                statu: 200,
                json: async () => (
                    []
                )
            }
        }

        

        case '${url}/hero/1` : {
            return {
                ok: true, 
                statu: 200,
                json: async () => (
                    [
                        {
                            id: 1,
                            step_name: "Ordinary World",
                            step_desc: "This section explores the current state of the hero's everyday life. This is where the hero is grounded in their humanity and we learn important details about how they see themselves and their place in the world.",
                            act: "1",
                        
                        },

                    ]
                )
            }
        }

        case `${url}/hero/2` : {
            return {
                ok: true, 
                statu: 200,
                json: async () => (
                    [
                        {
                            id: 2,
                            step_name: "Tests, Allies, Enemies",
                            step_desc: "The hero is tested in the special world. They must adapt to the rules of the special world. Here they will encounter allies and enemies and must discern who can and cannot be trusted. All of the obstacles in this stage give the audience more insight into who the hero is and they prepare the hero for the largest challenge ahead.",
                            act: "2",
                        
                        },

                    ]
                )
            }
        }

        case '${url}/hero/2` : {
            return {
                ok: true, 
                statu: 200,
                json: async () => (
                    [
                        {
                            id: 3,
                            step_name: "Tests, Allies, Enemies",
                            step_desc: "The hero is tested in the special world. They must adapt to the rules of the special world. Here they will encounter allies and enemies and must discern who can and cannot be trusted. All of the obstacles in this stage give the audience more insight into who the hero is and they prepare the hero for the largest challenge ahead.",
                            act: "3",
                        
                        },

                    ]
                )
            }
        }

        case `${url}/hero/3` : {
            return {
                ok: true, 
                statu: 200,
                json: async () => (
                    [
                        {
                            id: 3,
                            step_name: "The Road Back",
                            step_desc: "The hero prepares to return to the ordinary world but before they can return they often have to be pushed back into the oridinary world. Returning is a choice and the hero often must choose between their superficial goals and a greater good.",
                            act: "3",
                        
                        },
                    ]
                )
            }
        }

        

        default: {
            throw new Error(`Unhandled request: ${url}`)
        }
       
    }
}

beforeAll(() => jest.spyOn(window, 'fetch'))
beforeEach(() => window.fetch.mockImplementation(mockFetch))