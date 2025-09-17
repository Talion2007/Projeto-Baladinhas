import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const baseURL = "http://10.136.38.254:3000/baladas";

export default function ListarBaladas() {
    const [baladas, setBaladas] = useState([]);

    const carregarBaladas = async () => {
        try {
            const res = await fetch(baseURL);
            const data = await res.json();
            setBaladas(data);
        } catch (err) {
            Alert.alert("Erro ao carregar baladas", err.message);
        }
    };

    useEffect(() => {
        carregarBaladas();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.button} onPress={carregarBaladas} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Recarregar Lista</Text>
            </TouchableOpacity>

            {baladas.map((baladas) => (
                <View key={baladas.id} style={styles.card}>
                    <Text style={styles.info}>ID: {baladas.id}</Text>
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
    button: { backgroundColor: "#2196F3", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 15 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
    info: { fontSize: 14, marginBottom: 5 },
});
