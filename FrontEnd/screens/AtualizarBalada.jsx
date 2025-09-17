import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";

const baseURL = "http://10.136.38.254:3000/baladas";

export default function AtualizarBalada() {
    const [id, setId] = useState("");
    const [cidade, setCidade] = useState("");
    const [endereco, setEndereco] = useState("");
    const [data_evento, setDataEvento] = useState("");
    const [tipo, setTipo] = useState("");

    const atualizar = async () => {
        if (!id || !cidade || !endereco || !data_evento || !tipo) return Alert.alert("Erro", "Preencha todos os campos");
        const res = await fetch(`${baseURL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cidade, endereco, data_evento, tipo }),
        });
        if (res.status === 404) Alert.alert("Balada não encontrada");
        else Alert.alert("Balada atualizada!");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput placeholder="ID da Balada" value={id} onChangeText={setId} style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="Cidade" value={cidade} onChangeText={setCidade} style={styles.input} />
            <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} style={styles.input} />
            <TextInput placeholder="Data (YYYY-MM-DD)" value={data_evento} onChangeText={setDataEvento} style={styles.input} />
            <TextInput placeholder="Tipo" value={tipo} onChangeText={setTipo} style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={atualizar} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Atualizar Balada</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#f2f2f2", flexGrow: 1 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "#fff" },
    button: { backgroundColor: "#FF9800", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 15 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
