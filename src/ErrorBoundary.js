import React, { Component } from 'react'
import {View, Text, TouchableHighlight, Image, StyleSheet, TextInput} from 'react-native'
import colorSwatches from './colorSwatches'
import { config } from './URLS'

const url = config.API_URL

const { princetonOrange, yankeesBlue, projectHeader, oldLace, detailContainer} = colorSwatches

class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false,  
            idToken: props.idToken,
            name: {
                touched: false,
                value: undefined
            },
            email: {
                touched: false,
                value: undefined,
            },
            error: {
                touched: false,
                value: undefined
            },
            getAuthToken: props.getAuthToken

        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
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

    updateError = (e) => {
        this.setState({error: {value: e.target.value, touched: true}})
    }

    openErrorReportForm = () => {
        this.setState({
            showErrorReport: true
        })
    }

    submitErrorForm = async () => {
        const {name, email, error} = this.state

        if(name.touched === true && email.touched == true && error.touched == true) {
            const errorReport = {
                name: name.value,
                email: email.value,
                error: error.value
            }
            try {
                fetch(`${url}/error`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': await this.state.getAuthToken()
                    },
                    body: JSON.stringify(errorReport)
                }).then(() => window.location.assign('https://writualapp.com/'))
            } catch (error) {
                console.error('error submitting form: ', error)
                window.location.assign('https://writualapp.com/')
            }
        }
        
    }

    render(){

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
                width: 100,
                height: 100,
                backgroundSize: 'cover',
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

        if(this.state.hasError) {
            return  (
                <View style={styles.container}>
                    <Image style={styles.image} source={require('./Assets/logo_t.png')}/>
                    {
                        this.state.showErrorReport === true 
                            ?   <View style={styles.form}>

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
                                        <Text style={styles.label}>Error:</Text>
                                        <TextInput placeholder='What were you trying to do?' style={styles.textInputError} required 
                                            onChange={e => this.updateError(e)} 
                                            type='text' name='error'></TextInput>
                                        
                                    </View>

                                     <TouchableHighlight onPress={this.submitErrorForm} style={styles.buttonSubmit}>
                                        <Text style={{fontSize: 18, fontWeight: '600', fontFamily: 'Montserrat', color:'white'}}>Submit</Text>
                                    </TouchableHighlight>
                                
                                </View>
                                
                            :   <View style={styles.errorNotification}>
                                    <Text style={styles.text}>Something Went Wrong!</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 450, height: 75}}>
                                        <TouchableHighlight onPress={e => window.location.assign('https://writualapp.com/')} style={styles.button}>
                                            <Text style={{fontSize: 18, fontWeight: '600', fontFamily: 'Montserrat', color:'white'}}>Go Home</Text>
                                        </TouchableHighlight>

                                        <TouchableHighlight onPress={this.openErrorReportForm} style={styles.button}>
                                            <Text style={{fontSize: 18, fontWeight: '600', fontFamily: 'Montserrat', color:'white'}}>Report Error</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                    }
                </View>
                

                
            )
        }

        return this.props.children
    }

    
    
}

export default ErrorBoundary