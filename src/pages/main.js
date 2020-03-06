import React from 'react'
import api from '../services/api'

import { View, Text } from 'react-native'

function Main() {
    return (
        <View>
            <Text>Página Main</Text>
        </View>
    )
}
Main.navigationOptions = {
    title: 'JSHunt',
}

export default Main