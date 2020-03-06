import React, { useEffect, useState } from 'react'

import api from '../services/api'

import { View, Text } from 'react-native'

function Main() {

    const [documents, setDocuments] = useState({
        docs: [],
    })

    useEffect(()=>{
        async function fetchData() {
            const response = await api.get('/products')
            const { docs } = response.data
            setDocuments({ docs })
        }
        fetchData()
    }, [])

    return (
        <View>
            <Text>Página Main</Text>
            {documents.docs.map(product => (
                <Text key={product._id}>{product.title}</Text>
            ))}
        </View>
    )
}
Main.navigationOptions = {
    title: 'JSHunt',
}

export default Main