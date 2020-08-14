import React from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';


export function WebIcons() {

    return (
         <View style={{flexDirection: 'row', width: 400, justifyContent: 'space-evenly', }}> 
                <FontAwesomeIcon color='white' className='fa-2x' icon={faKeyboard}/>
                <FontAwesomeIcon color='white' className='fa-2x' icon={faLightbulb}/>
                <FontAwesomeIcon color='white' className='fa-2x' icon={faPencilAlt}/>
                <FontAwesomeIcon color='white' className='fa-2x' icon={faBookOpen}/>
                <FontAwesomeIcon color='white' className='fa-2x' icon={faStickyNote}/>
        </View>
    )
    
}


export default WebIcons

