import React, { useRef } from "react";
import { StyleSheet, View, Text, } from "react-native";
import Toast from "react-native-easy-toast";
import FormSuc from "../../components/Sucursales/FormSuc";

export default function AgreagarSuc() {
    const toastRef = useRef();
    return (
        <View>
            <FormSuc
                toastRef={toastRef}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    );
}
const styles = StyleSheet.create({})