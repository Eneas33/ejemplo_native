import React, { useState } from 'react';
import { StyleSheet, View, Text, } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty, } from "lodash";
import firebase from 'firebase/compat';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';


export default function FormRegistro(toast) {
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
        if (isEmpty(datos.email) || isEmpty(datos.password) || isEmpty(datos.repeatedPassword)) {
            //console.log("No puedes dejar campos vacios");
            //Enviamos el mensaje al cuerpo del toast para hacerlo visible
            toastRef.current.show("No puedes dejar los campos vacios");
        }//Validados la estructura del email
        else if (!validarEmail(datos.email)) {
            //console.log("Estructura del email incorrecta");
            toastRef.current.show("Estructura del email incorrecta");
        }//Validamos que la contraseña tenga al menos 6 carácteres
        else if (size(datos.password) < 6) {
            //console.log("La contraseña debe tener al menos 6 caracteres");
            toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
        }//Validamos que las contraseñas sean iguales
        else if (datos.password !== datos.repeatedPassword) {
            //console.log("Las contraseñas deben ser iguales");
            toastRef.current.show("Las contraseñas deben ser iguales");
        }//Si todo es correcto visualizaremos los datos
        else {
            toastRef.current.show("Registro Exitoso");
            console.log(datos);
            /* Se ejecuta la autenticacion por email lo funcion que lo hace posible es createUserWithEmailAndPassword*/
            firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
                .then(respuesta => {
                    navigation.navigate("cuentas");
                })
                .catch(() => {
                    toastRef.current.show("El correo electronico ya esta en uso, intente con un correo diferente");
                    // console.log(err);
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
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                /*Si mostrar es false se oculta el texto 
                de lo contrario se muestra*/
                secureTextEntry={true}
                /*Al escribir en el campo se activa el evento y 
                procedemos a enviar al método onChange el evento y 
                el campo a modificar*/
                secureTextEntry={Rmostrar ? false : true}
                onChange={(e) => onChange(e, "repeatedPassword")}
                rightIcon={
                    <Icon
                        type="material-community-icon"
                        /*Si mostrar es false se muestra el icono 
                        de ocultar contraseña de lo contrario se muestra
                        el icono de ver contraseña*/
                        name={Rmostrar ? "visibility" : "visibility-off"}
                        iconStyle={styles.icono}
                        onPress={() => setRMostrar(!Rmostrar)}
                    />
                }
            />
            <Button
                title="Registrar"
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
        repeatedPassword: "",
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