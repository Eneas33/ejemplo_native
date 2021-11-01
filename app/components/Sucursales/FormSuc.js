import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";


export default function FormSuc(toast) {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const { toastRef } = toast;

    const agregar = () => {
        console.log(nombre);
        console.log(direccion);
        console.log(descripcion);
    };
    return (
        <ScrollView style={styles.scroll}>
            <Formulario
                setNombre={setNombre}
                setDireccion={setDireccion}
                setDescripcion={setDescripcion}
            />
            <SubirImagen toastRef={toastRef} />
            <Button
                title="Registrar"
                buttonStyles={styles.btn}
                onPress={agregar}
            />
        </ScrollView>
    );
}
function Formulario(propiedades) {
    const {
        setNombre,
        setDireccion,
        setDescripcion
    } = propiedades;
    return (
        <View style={styles.vista}>
            <Input
                placeholder="Nombre"
                containerStyle={styles.form}
                onChange={(e) => setNombre(e.nativeEvent.text)}
            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.form}
                onChange={(e) => setDireccion(e.nativeEvent.text)}
            />
            <Input
                placeholder="Descripción"
                multiline={true}
                containerStyle={styles.textArea}
                onChange={(e) => setDescripcion(e.nativeEvent.text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        height: "100%",
    },
    form: {
        marginLeft: 10,
        marginRight: 10,
    },
    vista: {
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btn: {
        backgroundColor: "#0A6ED3",
        margin: 20,
    },
});