import React, { useState } from 'react';
import { StyleSheet, View, } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty, } from "lodash";
import firebase from 'firebase/compat';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';


export default function FormLogin(toast) {
    /* objeto para el toast */
    const { toastRef } = toast;
    const [mostrar, setMostrar] = useState(false);
    const [Rmostrar, setRMostrar] = useState(false);
    /* constante para los valores de los capos */
    const [datos, setDatos] = useState(valoreDefault);
    /* Método que nos ayudara a visulizar los datos en la consola */
    const navigation = useNavigation();
    const onSubmit = () => {
        //console.log(datos);
        //Verificamos que no se envíen datos vacíos
        if (isEmpty(datos.email) || isEmpty(datos.password)) {
            //console.log("No puedes dejar campos vacios");
            //Enviamos el mensaje al cuerpo del toast para hacerlo visible
            toastRef.current.show("No puedes dejar los campos vacios");
        }//Validados la estructura del email
        else if (!validarEmail(datos.email)) {
            //console.log("La estructura del Correo Electronico no es valida");
            toastRef.current.show("Estructura del email es incorrecta");
        }//Validamos que la contraseña tenga al menos 6 carácteres
        else if (size(datos.password) < 6) {
            //console.log("La contraseña debe tener al menos 6 caracteres");
            toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
        }
        //Si todo es correcto visualizaremos los datos
        else {
            toastRef.current.show("¡Bienvenido!");
            console.log(datos);
            /* Se ejecuta por eamil y password el signInWithEmailAndPassword*/
            firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
                .then(respuesta => {
                    navigation.navigate("cuentas");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    if (errorCode === 'auth/wrong-password') {
                        toastRef.current.show("La contraseña es incorrecta.");
                    } else {
                        toastRef.current.show("El Email no esta regitrado");
                    }
                });
        }
    };

    /* Método que se activa al escribir en el formulario. */
    const onChange = (e, type) => {
        setDatos({ ...datos, [type]: e.nativeEvent.text });
    };

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electrónico"
                containerStyle={styles.inputForm}
                /* Al escribir en el input se activa el evento y se envia al método onChange el evento y el campo a modificar */
                onChange={(e) => onChange(e, "email")}
                rightIcon={
                    <Icon
                        type="material-community-icon"
                        name="alternate-email"
                        iconStyle={styles.icono}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={true}
                secureTextEntry={mostrar ? false : true}
                /*Al escribir en el campo se activa el evento y 
                procedemos a enviar al método onChange el evento y 
                el campo a modificar*/
                onChange={(e) => onChange(e, "password")}
                rightIcon={
                    <Icon
                        type="material-community-icon"
                        name={mostrar ? "visibility" : "visibility-off"}
                        iconStyle={styles.icono}
                        onPress={() => setMostrar(!mostrar)}
                    />
                }
            />
            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                /* Al dar click activamos el método onSubmit */
                onPress={onSubmit}
            />
        </View>
    );
}

/* Funcion que nos ayudará a almacenar los datos */
function valoreDefault() {
    return {
        email: "",
        password: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainer: {
        marginTop: 20,
        width: "100%",
    },
    btn: {
        backgroundColor: "#0A6ED3",
    },
    icono: {
        color: "#c1c1c1"
    },
});