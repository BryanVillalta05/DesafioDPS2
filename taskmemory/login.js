import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [userr, setuserr] = useState('');
    const [psww, setpsww] = useState('');

    const compararDatos = async () => {
        const usuario = await AsyncStorage.getItem('user');
        const pass = await AsyncStorage.getItem('psw');
        if(userr.trim() ===  usuario && psww.trim() === pass)
        {
            navigation.navigate('Inicio');
        }else{
            Alert.alert('Error', 'Usuario no encontrado');
            navigation.navigate('Login');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                autoCapitalize="none"
                onChangeText={(text) => setuserr(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={(text) => setpsww(text)}
            />
            <TouchableOpacity style={styles.button} onPress = { compararDatos }>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.registerLink}>¿No tienes una cuenta? Regístrate aquí</Text>
            </TouchableOpacity>
            <Text style={styles.foot}>©znt_CO</Text>
        </View>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 30,
        fontFamily: 'serif',
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#4d4d4d',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        color: '#ffffff',
        fontFamily: 'serif',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'serif',
    },
    registerLink: {
        marginTop: 20,
        color: '#1F7AF5',
        fontSize: 16,
        fontFamily: 'serif',
    },
    foot: {
        marginTop: 20,
        color: '#9E9E9E',
        fontSize: 10,
        fontFamily: 'serif',
    },
});
