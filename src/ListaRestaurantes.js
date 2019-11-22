import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';

export default class ListaRestaurantes extends Component {
    static navigationOptions = {
        title: 'Restaurantes',
    };

    constructor(props) {
        super(props);
        this._abrirDetalhes = this._abrirDetalhes.bind(this);
        this._montarItem = this._montarItem.bind(this);
        this._carregarDados = this._carregarDados.bind(this);

        this.state = {
            restaurantes: [],
            carregando: true,
        }
    }

    async componentDidMount() {
        await this._carregarDados();
    }

    async _carregarDados() {
        try {
            this.setState({ carregando: true });
            let response = await fetch(
                'http://restaurantes.surge.sh/restaurantes.json',
            );
            const restaurantes = await response.json();
            this.setState({ restaurantes, carregando: false });
        } catch (error) {
            console.error(error);
        }
    }

    _abrirDetalhes(restaurante) {
        const { navigate } = this.props.navigation;
        navigate('DetalheRestaurante', restaurante);
    }
    _montarItem({ item }) {
        return (
            <TouchableOpacity
                onPress={() => this._abrirDetalhes(item)}
            >
                <View style={styles.item}>

                    <Text style={styles.title}>
                        {item.title}
                        
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    //Toda vez que precisar desenhar os componentes na interface, seja por uma alteração de state/props vai cair aqui
    render() {
        return (
            <View>
                <Text
                style={{
                    fontStyle: 'italic',
                    fontSize: 40,
                }}
                >
                    Tudo o que tem
                </Text>
                <View
                style={{
                    padding:50,
                }}
                >

                    <FlatList
                        data={this.state.restaurantes}
                        renderItem={this._montarItem}
                        keyExtractor={item => item.id}
                        onRefresh={this._carregarDados}
                        refreshing={this.state.carregando}
                        /> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        borderColor:'red',
        borderWidth: 1,
        paddingBottom:5,
    },
    title: {
        fontSize: 32,
    },
});
