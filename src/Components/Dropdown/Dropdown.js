import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faAngleUp, faAngleDown, faTv } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  

    selector: {
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        height: '30px',
        width: 100,


    },

    
})

export default function Dropdown(props) {
    const [renderUpArrow, setRenderUpArrow] = useState(false)
    return (
        <View>
            <View style={styles.selector}>
                {
                    props.projFormat === 'Television'
                        ? <FontAwesomeIcon icon={faTv} className='fa-lg' />
                        : <FontAwesomeIcon icon={faPencilAlt} className='fa-lg' />

                }
                {
                    renderUpArrow === true
                        ? <FontAwesomeIcon icon={ faAngleUp } onClick={e => setRenderUpArrow(! renderUpArrow) }  style={{marginLeft: 'auto'}} color='black' className='fa-sm iconHover'/>
                        : <FontAwesomeIcon icon={ faAngleDown } onClick = {e => setRenderUpArrow(! renderUpArrow)} color='black' className='fa-sm iconHover' />

                }
            </View>
            {
                renderUpArrow === true
                    ?  props.children
                    

                    :   null
            }
        </View>
    )
}