import React, { Component } from 'react'
import {View, Text, TouchableHighlight, Image, StyleSheet, TextInput} from 'react-native'
import colorSwatches from '../../colorSwatches'
import { config } from '../../URLS'

const url = config.API_URL

const { princetonOrange, yankeesBlue, projectHeader, oldLace, detailContainer} = colorSwatches

export default class FeedbackFrom extends Component {
    constructor(props){
        super(props)
        this.state = {
            getAuthToken: props.getAuthToken,
            name: {
                touched: false,
                value: ''
            },
            email: {
                touched: false,
                value: '',
            },
            title: {
                touched: false,
                value: '',
            },
            description: {
                touched: false,
                value: ''
            },
        }
    }

    updateName = (e) => {
        this.setState({
            name: {
                value: e.target.value, 
                touched: true
            }
        })
    }

    updateEmail = (e) => {
        this.setState({email: {value: e.target.value, touched: true}})
    }   

     updateTitle = (e) => {
        this.setState({title: {value: e.target.value, touched: true}})
    }   

    updateDesc = (e) => {
        this.setState({description: {value: e.target.value, touched: true}})
    }

    submitFeedbackForm = async () => {
        console.log('submit feedback from url:', url)
        const {name, email, title, description} = this.state

        if(name.touched === true && email.touched == true && title.touched == true) {
            const userFeedback = {
                name: name.value,
                email: email.value,
                title: title.value,
                description: description.value
            }
            try {
                fetch(`${url}/user_feedback`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': await this.state.getAuthToken()
                    },
                    body: JSON.stringify(userFeedback)
                }).then(() => window.location.assign('https://writualapp.com/'))
            } catch (error) {
                console.error('error submitting feedback: ', error)
                window.location.assign('https://writualapp.com/')
                
            }
        }
        
    }

    render() {
        const styles = StyleSheet.create({
             container: {
                backgroundColor: detailContainer,
                borderRadius: 8,
                width: 800,
                minHeight: 500, 
                height: "60%",
                filter: "drop-shadow(0 0 .26rem grey)",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: 200,
                justifyContent: "space-evenly",
                alignItems: "center"
            },

            errorNotification: {
                alignItems: "center",
                height: "40%",
                justifyContent: "space-evenly"
            },

            text: {
                fontFamily: "Varela Round",
                fontSize: 22, 
                fontWeight: "bold"
            },

             image: {
                width: 50,
                height: 50,
            },

            button: {
                backgroundColor: yankeesBlue,
                width: 200,
                height: 75,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center"
            },

            buttonSubmit: {
                backgroundColor: yankeesBlue,
                width: "100%",
                height: 45,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: 'center',
            },

            form: {
                width: '80%',
                padding: 20,
                backgroundColor: 'white',
                border: 5,
                borderBottomLeftRadius: 5, 
                borderBottomRightRadius: 5, 
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            },

            formSection: {
                display: 'flex',
                marginBottom: 15,
                width: '100%',
            },

            label: {
                fontWeight: 'bold'
            },

            textInput: {
                backgroundColor: '#EDEDED',
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                padding: 5,
            },

            textInputError: {
                backgroundColor: '#EDEDED',
                height: 200,
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                padding: 5,
            },
        })
        return (
             <View style={styles.container}>
                    <Image style={styles.image} source={require('../../Assets/logo_t.png')}/>
                    {
                        <View style={styles.form}>

                            <View style={styles.formSection}>
                                <Text style={styles.label}>Name:</Text>
                                <TextInput  placeholder='Name' 
                                            style={styles.textInput} 
                                            required 
                                    onChange={ e => this.updateName(e) }
                                    type='text' name='name'></TextInput>
                            </View>

                            <View style={styles.formSection}>
                                <Text style={styles.label}>Email:</Text>
                                <TextInput placeholder='Email' style={styles.textInput}  required 
                                    onChange={e => this.updateEmail(e)} 
                                    type='text' name='email'></TextInput>
                            </View>

                            <View style={styles.formSection}>
                                <Text style={styles.label}>Title:</Text>
                                <TextInput placeholder='Your feedback' style={styles.textInput}  required 
                                    onChange={e => this.updateTitle(e)} 
                                    type='text' name='email'></TextInput>
                            </View>

                            <View style={styles.formSection}>
                                <Text style={styles.label}>Description:</Text>
                                <TextInput placeholder='Provide more detail if you would like (optional)' style={styles.textInputError} 
                                    onChange={e => this.updateDesc(e)} 
                                    type='text' name='error'></TextInput>
                                
                            </View>

                                <TouchableHighlight onPress={this.submitFeedbackForm} style={styles.buttonSubmit}>
                                <Text style={{fontSize: 18, fontWeight: '600', fontFamily: 'Montserrat', color:'white'}}>Submit</Text>
                            </TouchableHighlight>
                        
                        </View>
                                
                            
                    }
                </View>
        )
    }
}