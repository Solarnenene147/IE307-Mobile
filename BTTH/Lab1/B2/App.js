import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import G1 from './G1';
import G2 from './G2';

const fruits_vegetables = [
    {
        title: 'Fruits',
        url: 'https://cdn-icons-png.flaticon.com/512/1625/1625099.png',
        data: ['Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'],
    },
    {
        title: 'Vegetables',
        url: 'https://cdn-icons-png.flaticon.com/512/2153/2153788.png',
        data: ['Carrot', 'Broccoli', 'Spinach', 'Beets & Beet Greens', 'Kale'],
    },
];

const workouts = [
    { id: '1', type: 'Push-ups' },
    { id: '2', type: 'Squats' },
    { id: '3', type: 'Planks' },
    { id: '4', type: 'Groiner' },
    { id: '5', type: 'Spider Crawl' },
    { id: '6', type: 'Glute Bridge' },
    { id: '7', type: 'Dumbbell rows' },
    { id: '8', type: 'Burpees' },
    { id: '9', type: 'Standing Long Jump' },
    { id: '10', type: 'Lunges' },
];

function App() {
    const [selectedItems, setSelectedItems] = useState([]); // Chỉ sử dụng một trạng thái để theo dõi tất cả các mục đã chọn

    const handleSelectWorkout = (id) => {
        const workout = workouts.find(w => w.id === id);
        if (!workout) return;

        if (selectedItems.includes(workout.type)) {
            setSelectedItems(selectedItems.filter(item => item !== workout.type)); // Bỏ chọn
        } else {
            setSelectedItems([...selectedItems, workout.type]); // Chọn
        }
    };

    const handleSelectFruitVegetable = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(fruitVeg => fruitVeg !== item)); // Bỏ chọn
        } else {
            setSelectedItems([...selectedItems, item]); // Chọn
        }
    };

    const getSelectedItemsString = () => {
        return selectedItems.join(', ').trim(); // Trả về chuỗi
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FlatList - Workouts</Text>
            <ImageBackground
                source={{ uri: 'https://thumbs.dreamstime.com/b/fitness-workout-background-dumbbells-wooden-floor-old-iron-exercise-weights-extra-plates-old-deck-table-image-77162783.jpg' }}
                resizeMode="cover"
            >
                <ScrollView style={styles.scrollitems}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                    {workouts.map((workout) => (
                        <G1
                            key={workout.id}
                            item={workout}
                            isSelected={selectedItems.includes(workout.type)} // Kiểm tra xem bài tập có được chọn không
                            onSelect={() => handleSelectWorkout(workout.id)}
                        />
                    ))}
                </ScrollView>
            </ImageBackground>

            <Text style={styles.title}>SectionList - Fruits & Vegetables</Text>
            <ImageBackground 
            source={{uri:"https://wallpapers.com/images/featured/vegetable-background-qcibuq2u4uedy321.jpg"}}
            resizeMode="cover"
            >
                <ScrollView style={styles.scrollvege}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                    <G2 data={fruits_vegetables} onSelectFruitVegetable={handleSelectFruitVegetable} />
                </ScrollView>
            </ImageBackground>


            <StatusBar style="auto" />
            <View style={styles.selectedcontain}>
                <Text style={styles.selected}>SELECTED ITEMS:</Text>
                <Text style={styles.selectedString}>{getSelectedItemsString()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: 'blue',
        marginBottom: 10,
    },
    scrollitems: {
        height: '37%',
        padding: 10,
    },
    scrollvege: {
        height: '37%',
    },
    selected: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
    },
    selectedcontain: {
        position: 'absolute',
        top: '90%',
        width: '100%',
        alignSelf: 'center',
    },
    selectedString: {
        textAlign: 'center',
    },
});

export default App;
