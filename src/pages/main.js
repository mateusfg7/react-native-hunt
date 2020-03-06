import React, { useEffect, useState } from 'react'

import api from '../services/api'

import { View, Text } from 'react-native'

function Main() {

    const [couter, setCouter] = useState({
        couter: 0
    })

    useEffect(()=>{
        async function fetchData() {
            const response = await api.get('/products')
            const { docs } = response.data
            setCouter({ couter: docs.length })
        }
        fetchData()
    }, [])

    return (
        <View>
            <Text>Página Main: {couter.couter}</Text>
        </View>
    )
}
Main.navigationOptions = {
    title: 'JSHunt',
}

export default Main