import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
    const [user, setuser] = useState('');
    const [mail, setmail] = useState('');
    const [psw, setpsw] = useState('');

    const guardarDatos = async () => {
        try {
            await AsyncStorage.setItem('user', user);
            await AsyncStorage.setItem('mail', mail);
            await AsyncStorage.setItem('psw', psw);
            
        } catch (error) {
            console.error('Error al guardar los datos de registro:', error);
        }

        if(user.trim() === '' || mail.trim() === '' || psw.trim() === '')
        {
            Alert.alert('Error', 'El campo está vacío.');
            navigation.navigate('Registro');
        }else{
            navigation.navigate('Inicio');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                autoCapitalize="none"
                onChangeText={(text) => setuser(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={(text) => setpsw(text)}
            />
            <TouchableOpacity style={styles.button} onPress={guardarDatos }>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerLink}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
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
