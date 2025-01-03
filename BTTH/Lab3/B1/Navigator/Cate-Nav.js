import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Cate1 from './Cate-Nav/Categories1';
import Cate2 from './Cate-Nav/Categories2';
import Cate3 from './Cate-Nav/Categories3';

const TopTab= createMaterialTopTabNavigator();

function Nav() {
    return (
        <TopTab.Navigator initialRouteName="Login">
            <TopTab.Screen name="Categories1" component={Cate1} options={{ headerShown: false }} />
            <TopTab.Screen name="Categories2" component={Cate2} />
            <TopTab.Screen name="Categories3" component={Cate3} />
        </TopTab.Navigator>
    );
}
export default Nav;