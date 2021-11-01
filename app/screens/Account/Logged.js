import React from "react";
import { View, Text, Button } from "react-native";
import firebase from 'firebase/compat';

export default function logged() {
    return (
        <View>
            <Text>Logueado!!</Text>
            <Button
                title="Cerrar Sesión"
                onPress={() => firebase.auth().signOut()}
            />
        </View>
    );
}