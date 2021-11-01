import React, { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
    View,
    Text,
} from "react-native";

//Importaciones de las otras Screenss
import Logged from "./Logged";
import Invitado from "./Invitados";

export default function Cuentas() {
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            !user ? setLogin(false) : setLogin(true);
        })
    }, []);
    if (login === null) return <Text>Cargando...</Text>;

    return login ? <Logged /> : <Invitado />;
}