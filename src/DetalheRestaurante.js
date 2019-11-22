import React, { Component } from 'react';
import { Text, View, SectionList, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';

export default class DetalheRestaurante extends Component {
    // static navigationOptions = {
    //     title: 'Detalhe',
    // };

    static navigationOptions = ({ navigation }) => {
        const nome = navigation.getParam('title', 'Detalhes');
        return {
            title: nome,
        };
    };

    constructor(props) {
        super(props);
        this._montarItem = this._montarItem.bind(this);
    }

    _montarItem(item) {
        return (
            <Text style={styles.item}>
                {item}
            </Text>
        );
    }

    render() {
        const restaurante = this.props.navigation.state.params;
        return (
            <View
                style={{ 
                    flex: 1,
                    padding:30,
                }}
            >
                <Text
                    style={{
                        fontStyle: 'italic',
                        fontSize: 40,
                    }}
                >
                    {`Nome: ${restaurante.title}`}
                </Text>
                <Text>
                    {`Endereço: ${restaurante.endereco}`}
                </Text>
                <Text>
                    {`Horário de funcionamento: ${restaurante.horario}`}
                </Text>

                <Text>
                    Cardapio:
                </Text>
                <SectionList
                    style={{ flex: 1 }}
                    sections={restaurante.cardapio}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => this._montarItem(item)}
                    renderSectionHeader={({ section: { nome } }) => (
                        <Text style={styles.header}>{nome}</Text>
                    )}
                />
                <Button
                    title={'Ver no mapa'}
                    onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${restaurante.lat},${restaurante.lon}`)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        borderColor: 'black',
        borderWidth: 5,
    },
    title: {
        fontSize: 32,
    },
    header: {
        fontSize: 32,
    },
});
