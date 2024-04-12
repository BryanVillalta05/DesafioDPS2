import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function AddScreen({ navigation }) {
    const [act, setAct] = useState('');
    const [mat, setMat] = useState('');
    const [inte, setInte] = useState('');
    const [hora, sethora] = useState('');
    const [fech, setFech] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        setFech(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
        sethora(hora.toLocaleString('es-ES', opciones));
        hideTimePicker();
    };


    const guardarDatos = async () => {
        try {
            await AsyncStorage.setItem('act', act);
            await AsyncStorage.setItem('mat', mat);
            await AsyncStorage.setItem('inte', inte);
            await AsyncStorage.setItem('hora', hora);
            await AsyncStorage.setItem('fech', fech);

        } catch (error) {
            console.error('Error al guardar los datos de registro:', error);
        }

        if (act.trim() === '' || mat.trim() === '' || inte.trim() === '' || hora.trim() === '' || fech.trim() === '') {
            Alert.alert('Error', 'El campo está vacío.');
            navigation.navigate('Add');
        } else {
            navigation.navigate('Inicio', { updatedData: 'Datos actualizados' });
            Alert.alert('Actividad guardada', 'La actividad se ha guardodo correctamente.');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Añadir una actividad</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la actividad"
                onChangeText={(text) => setAct(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Materia"
                onChangeText={(text) => setMat(text)}
            />
            <TextInput
                style={[styles.input, styles.textArea]} 
                placeholder="Integrantes"
                onChangeText={(text) => setInte(text)}
                multiline={true} 
                numberOfLines={4} 
            />
            <View>
                <Button style={styles.button} title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS="Elige la fecha"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{fech}</Text>
            </View>
            <View>
                <Button style={styles.button} title="Seleccionar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una Hora"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{hora}</Text>
            </View>


            <TouchableOpacity style={styles.button} onPress={guardarDatos}>
                <Text style={styles.buttonText}>Guardar Actividad</Text>
            </TouchableOpacity>
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
    textArea: {
        height: 200,
        textAlignVertical: 'top', 
    },
});
