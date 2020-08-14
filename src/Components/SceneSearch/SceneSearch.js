import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import debounce from 'lodash/debounce'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

})

export default function SceneSearch(props) {

    const searchScenes = debounce( (searchTerm) => {
        props.handleSearchUpdate(props.currentAct, props.currentStep, searchTerm)
    }, 500)
    
    return (
        <View style={styles.container}>
            <FontAwesomeIcon color='white' style={{marginRight: 10}} icon={faSearch}/>
            <TextInput onChange={e => searchScenes(e.target.value)} style={{width: '60%', height: '100%', fontSize: '22px', color: 'white'}} placeholderTextColor='white' placeholder='Type to search for scenes'/>
        </View>
    )
}