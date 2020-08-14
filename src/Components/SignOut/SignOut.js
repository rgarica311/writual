import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { View, Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import WritualContext from "../../WritualContext";


export default function SignOut(props){
    const context = useContext(WritualContext)
    const history = props.history
    const styles = StyleSheet.create({
        authContainerSignOut: {
                    backgroundColor: "white",
                    width: wp("15%"),
                    height: hp("40%"),
                    borderRadius: 10,
                    position: 'absolute',
                    marginTop: 60,
                    marginRight: 20,
                    right: 0, 
                    elevation: 2,
                    filter: "drop-shadow(0 0 .25rem grey)",
                    padding: 10,
                    zIndex: 1, 
                    justifyContent: 'space-evenly'
                }
    })
    return(
        <View style={styles.authContainerSignOut}>
            <ProfileMenu>
                <View style={{ cursor: 'pointer', justifyContent: 'space-evenly', width: wp("15%"), flexDirection: 'row'}}>
                    <FontAwesomeIcon onClick={e => context.handleSignout(history)} icon={faSignOutAlt} className='fa-sm iconHover'/>
                    <Text>Sign Out</Text>
                </View>
            </ProfileMenu>
        </View>
    )
}