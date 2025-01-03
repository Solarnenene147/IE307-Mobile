import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SectionList } from 'react-native';

function G2({ data, onSelectFruitVegetable }) {
    const [isSelected, setIsSelected] = useState([]);

    const handleSelect = (item) => {
        if (isSelected.includes(item)) {
            setIsSelected(isSelected.filter(i => i !== item));
        } else {
            setIsSelected([...isSelected, item]);
        }
        onSelectFruitVegetable(item); // Gọi hàm từ App để gửi tên item
    };

    return (
        <View style={styles.contain}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.itemcontain}>
                        <Text style={styles.itemtxt}>{item}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.buttonText}>{isSelected.includes(item) ? 'Deselect' : 'Select'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderSectionHeader={({ section }) => (
                    <View style={styles.sectionhead}>
                        <Text style={styles.headtxt}>{section.title}</Text>
                        <Image source={{ uri: section.url }} style={styles.headimg

                        } />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contain: {
        padding: 10,
        marginBottom: 10,
    },
    itemtxt: {
        fontSize: 15,
    },
    itemcontain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor:'white',
        borderRadius:10,
        marginVertical:5,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#2BABFF',
    },
    buttonText: {
        color: 'white',
    },
    sectionhead: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: '25%',
    },
    headtxt: {
        fontWeight: 'bold', 
        fontSize: 18,
        color:'white',
    },
    headimg: { 
        width: 30, 
        height: 30, 
        marginLeft: 5, 
    }
});

export default G2;
