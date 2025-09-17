import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";

const baseURL = "http://10.136.38.254:3000/baladas";

export default function CriarBalada() {
    const [cidade, setCidade] = useState("");
    const [endereco, setEndereco] = useState("");
    const [data_evento, setDataEvento] = useState("");
    const [tipo, setTipo] = useState("");

    const criar = async () => {
        if (!cidade || !endereco || !data_evento || !tipo) return Alert.alert("Erro", "Preencha todos os campos");
        await fetch(baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cidade, endereco, data_evento, tipo }),
        });
        Alert.alert("Balada criada!");
        setCidade(""); setEndereco(""); setDataEvento(""); setTipo("");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput placeholder="Cidade" value={cidade} onChangeText={setCidade} style={styles.input} />
            <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} style={styles.input} />
            <TextInput placeholder="Data (YYYY-MM-DD)" value={data_evento} onChangeText={setDataEvento} style={styles.input} />
            <TextInput placeholder="Tipo" value={tipo} onChangeText={setTipo} style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={criar} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Criar Balada</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#f2f2f2", flexGrow: 1 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "#fff" },
    button: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 15 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
