import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MenuScreen({ navigation }) {
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Add')}>
                <Text style={styles.menuText}>Añadir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.menuText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function HomeScreen({ navigation }) {
    const [act, setAct] = useState('');
    const [mat, setMat] = useState('');
    const [inte, setInte] = useState('');
    const [hora, sethora] = useState('');
    const [fech, setFech] = useState('');
    const [nomUser, setnomUser] = useState('');
    useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        const nom = await AsyncStorage.getItem('user');
        setnomUser(nom);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const act = await AsyncStorage.getItem('act');
            const mat = await AsyncStorage.getItem('mat');
            const inte = await AsyncStorage.getItem('inte');
            const hora = await AsyncStorage.getItem('hora');
            const fech = await AsyncStorage.getItem('fech');

            setAct(act);
            setMat(mat);
            setInte(inte);
            sethora(hora);
            setFech(fech);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const deleteData = async () => {
        try {
            await AsyncStorage.multiRemove(['act', 'mat', 'inte', 'hora', 'fech']);
            Alert.alert('Actividad eliminada', 'La actividad se ha eliminado correctamente.');
        } catch (error) {
            console.error('Error al eliminar los datos:', error);
        }
    };

    const modifyData = () => {
        navigation.navigate('Add');
    };

    const cardColor = () => {
        const today = new Date();
        const entrega = new Date(fech);

        if (entrega.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
            return 'green';
        } else if (entrega < today) {
            return 'red';
        } else {
            return 'blue';
        }
    };

    return (
        <Drawer.Navigator drawerContent={(props) => <MenuScreen {...props} />}>
            <Drawer.Screen name="Inicio">
                {() => (
                    <View style={styles.container}>
                        <Text style = {styles.title}>Bienvenido {nomUser}</Text>
                        <View style={[styles.cardContainer, {backgroundColor: cardColor()}]}>
                            <Text style={styles.cardText}>Actividad: {act}</Text>
                            <Text style={styles.cardText}>Materia: {mat}</Text>
                            <Text style={styles.cardText}>Integrantes: {inte}</Text>
                            <Text style={styles.cardText}>Hora: {hora}</Text>
                            <Text style={styles.cardText}>Fecha: {fech}</Text>
                            <TouchableOpacity style={styles.button} onPress={deleteData}>
                                <Text style={styles.buttonText}>Borrar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={modifyData}>
                                <Text style={styles.buttonText}>Modificar</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={() => navigation.navigate('Add')}>
                            <Text style={styles.floatingButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 30,
        fontFamily: 'serif',
    },
    foot: {
        marginTop: 20,
        color: '#9E9E9E',
        fontSize: 10,
        fontFamily: 'serif',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007bff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    floatingButtonText: {
        color: '#ffffff',
        fontSize: 24,
    },
    menuContainer: {
        flex: 1,
        backgroundColor: '#ACACAC',
        paddingTop: 50,
        paddingLeft: 20,

    },
    menuItem: {
        marginBottom: 20,
    },
    menuText: {
        fontSize: 18,
        color: '#5C5B5B',
    },
    cardContainer:{
        height: 200,
        width: 300,
        color: "#000",
        fontSize: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 30,
        borderRadius: 12,
    }
});
