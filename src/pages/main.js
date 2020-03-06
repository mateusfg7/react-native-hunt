import React, { useEffect, useState } from 'react'

import api from '../services/api'

import { View, Text, FlatList } from 'react-native'

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

    const renderItem = ({ item }) => {
        return (
            <View>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
        )
    }

    return (
        <View>
            <FlatList 
                data={documents.docs}
                keyExtractor={item => item._id}
                renderItem={item => renderItem(item)}
            />
        </View>
    )
}
Main.navigationOptions = {
    title: 'JSHunt',
}

export default Main