import React, { useEffect, useState } from 'react'

import api from '../services/api'

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

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
                contentContainerStyle={styles.list} 
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    
    list: {
        padding: 20
    },
    
    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },
    
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },

    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: '#da552f',
        fontWeight: 'bold'
    }
})

export default Main