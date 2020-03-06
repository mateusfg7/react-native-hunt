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

    return (
        <View>
            <FlatList 
                data={documents.docs}
                keyExtractor={item => item._id}
                //renderItem={renderItem()}
            />
        </View>
    )
}
Main.navigationOptions = {
    title: 'JSHunt',
}

export default Main