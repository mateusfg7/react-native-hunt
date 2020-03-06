import React, { useEffect, useState } from 'react'

import api from '../services/api'

import { View, Text, FlatList, TouchableOpacity } from 'react-native'

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
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>

                <TouchableOpacity style={styles.productButton} onPress={() => {}} >
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={StyleSheet.list} 
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