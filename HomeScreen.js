import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
//import {Header} from 'react-native-elements';

export default class HomeScreen extends React.Component{

    getWord=(word)=>{
        var searchKeyword=word.toLowerCase();
        var url = 'https://rupinwhitehatjr.github.io/dictionary/'+searchKeyword+'.json';
        fetch(url)
        .then(response=>response.json())
        .then(responseJson=>{
            this.setState({
                word:this.state.input,
                definition:responseJson.definitions[0].description,
                lexicalCategory:responseJson.definitions[0].wordtype
            })
        })
        .catch(error=>{
            this.setState({
                word:this.state.input,
                lexicalCategory:'not found',
                definition:'not found'
            })
        })
    }

    constructor(){
        super();
        this.state={
            input:''
        }
    }
    render(){
        return(
            <View>
                

                <TextInput style={styles.textInput} onChangeText={text=>{
                    this.setState({
                        input:text,
                        isSearchPressed:false,
                        word:"Loading...",
                        lexicalCategory:'',
                        examples:[],
                        definition:""
                    });
                }} />

                <TouchableOpacity style={styles.search}
                onPress={()=>{
                    this.setState({isSearchPressed:true})
                    this.getWord(this.state.input);
                }}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>

                <View style={{marginLeft:20}}>
                    
                    
                    
                        <View>
                            <Text style={styles.detailHeading}>Word: {" "}</Text>
                            <Text>
                                {this.state.isSearchPressed===true
                                ?this.state.input
                                :""}
                            </Text>

                            
                            <Text style={styles.detailHeading}>
                                Type: {" "}
                            </Text>
                            
                            <Text>
                                {this.state.lexicalCategory}
                            </Text>

                            <Text style={styles.detailHeading}>
                                Definition:
                            </Text>
                            
                            <Text>
                                {this.state.definition}
                            </Text>
                            
                            
                            
                        </View>
                        
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput:{
        outline:'none',
        borderWidth:4,
        width:'80%',
        marginTop:50,
        height:40,
        alignSelf:'center'
    },
    search:{
        alignSelf:"center",
        marginTop:15,
        backgroundColor:"blue",
        width:100,
        height:35,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20
    },
    searchText:{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
    },
    detailHeading:{
        fontSize:30,
        fontWeight:'bold',
    }
})