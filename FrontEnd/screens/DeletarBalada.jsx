import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";

const baseURL = "http://10.136.38.254:3000/baladas";

export default function DeletarBalada() {
    const [id, setId] = useState("");

    const deletar = async () => {
        if (!id) return Alert.alert("Erro", "Digite o ID da balada");
        const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
        if (res.status === 404) Alert.alert("Balada não encontrada");
        else Alert.alert("Balada deletada!");
        setId("");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput placeholder="ID da Balada" value={id} onChangeText={setId} style={styles.input} keyboardType="numeric" />
            <TouchableOpacity style={styles.button} onPress={deletar} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Deletar Balada</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#f2f2f2", flexGrow: 1 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "#fff" },
    button: { backgroundColor: "#F44336", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 15 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
