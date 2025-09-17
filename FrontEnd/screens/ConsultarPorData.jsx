import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";

const baseURL = "http://10.136.38.254:3000/baladas";

export default function ConsultarPorData() {
    const [data, setData] = useState("");
    const [baladas, setBaladas] = useState([]);

    const buscar = async () => {
        if (!data) return Alert.alert("Erro", "Digite uma data");
        const res = await fetch(`${baseURL}/data/${data}`);
        const dataResp = await res.json();
        setBaladas(dataResp);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                placeholder="Digite a data (YYYY-MM-DD)"
                value={data}
                onChangeText={setData}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={buscar} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Buscar por Data</Text>
            </TouchableOpacity>

            {baladas.map((baladas) => (
                <View key={baladas.id} style={styles.card}>
                    <Text style={styles.info}>Cidade: {baladas.cidade}</Text>
                    <Text style={styles.info}>Endereço: {baladas.endereco}</Text>
                    <Text style={styles.info}>Data: {baladas.data_evento}</Text>
                    <Text style={styles.info}>Tipo: {baladas.tipo}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#f2f2f2", flexGrow: 1 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "#fff" },
    button: { backgroundColor: "#2196F3", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 15 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
    info: { fontSize: 14, marginBottom: 5 },
});
