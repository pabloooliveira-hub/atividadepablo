import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { useState } from "react";
import { supabase } from '../../src/supabaseClient';
import Toast from "react-native-toast-message";

export default function App() {
    const [textNome, setNome] = useState('');
    const [textEmail, setEmail] = useState('');
    const [textMsg, setMsg] = useState('');

    const dados = {
        nome: textNome,
        email: textEmail,
        msg: textMsg,
    }

    const enviarDados = async () => {
        const { data, error } = await supabase
            .from('contato')
            .insert([
                { nome: dados.nome, email: dados.email, msg: dados.msg }
            ])
            .select()
        if (error) {
            //window.alert("Erro ao gravar" + error.message);
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: "Erro ao cadastrar",
            });
        } else {
            //window.alert("Dados Gravados")
            Toast.show({
                type: "sucess",
                text1: "Sucesso!",
                text2: "Dados gravados com sucesso!",
            });

            setNome("");
            setEmail("");
            setMsg("");
        }
    }


    // const enviar = () => {
    //     window.alert(textNome + '' + textEmail);
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Fale Conosco</Text>
            <TextInput
                style={styles.campoTexto}
                value={textNome}
                onChangeText={setNome}
                placeholder='    Informe seu nome'
            />
            <TextInput
                style={styles.campoTexto}
                value={textEmail}
                onChangeText={setEmail}
                placeholder='    Informe seu E-mail'
            />
            <TextInput
                style={styles.campoTexto}
                value={textMsg}
                onChangeText={setMsg}
                placeholder='    Digite sua mensagem'
            />
            <TouchableOpacity style={styles.botao} onPress={enviarDados}>
                Enviar
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        verticalAlign: 'middle',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 45,
        padding: 5,
        alignItems: 'center',
        textAlign: 'center'
    },
    campoTexto: {
        backgroundColor: '#fff',
        color: '#000',
        width: '80%',
        height: 45,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,

    },
    botao: {
        backgroundColor: '#21468cff',       // Cor do fundo
        color: '#fff',                      // Cor do texto
        textAlign: 'center',                // Alinhamento do texto
        padding: 10,                        // Espaçamento interno
        width: '50%',                       // Largura
        borderRadius: 10,                    // Arredondamento da borda
        fontFamily: 'sans-serif'             // Fonte de texto
    }
})