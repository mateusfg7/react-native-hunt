import React, { useEffect, useState } from 'react'

import api from '../services/api'

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

function Main({ navigation }) {

    const [state, setState] = useState({
        productInfo: {},
        docs: [],
        page: 1,
    })

    async function loadProducts(page = 1) {
        const response = await api.get(`/products?page=${page}`)
        const { docs, ...productInfo } = response.data
        setState({
            docs: [...state.docs, ...docs],
            productInfo,
            page
        })
    }

    useEffect(()=>{
        loadProducts()
    }, [])

    const loadMore = () => {
        const { page, productInfo } = state
        
        if (page === productInfo.pages) {
            return
        }
        else {
            const pageNumber = page + 1;
            loadProducts(pageNumber)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>

                <TouchableOpacity
                    style={styles.productButton}
                    onPress={() => {
                        navigation.navigate('Product', { product: item })
                    }}
                >
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list} 
                data={state.docs}
                keyExtractor={item => item._id}
                renderItem={item => renderItem(item)}
                onEndReached={loadMore()}
                onEndReachedThreshold={0.1}
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