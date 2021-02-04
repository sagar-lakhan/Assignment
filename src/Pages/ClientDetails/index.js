import React, { Component } from "react";
import { View,Text,TextInput,TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";

import { setClient, resetClient } from "../../action";
import { styles } from "./styles";
const clientDetails=["AddressLine1","AddressLine2","City","State", "Country"];


class ClientDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            AddressLine1:"mumbai",
            AddressLine2:"maharashtra",
            City:"",
            State:"",
            Country:"",
        }
    }

    changeTextInput=(field,value)=>{
        this.setState({[field]:value});
    }

    navigateToNextPage=async ()=>{
        const{ AddressLine1, AddressLine2, City, State, Country } = this.state;
        if(!!AddressLine1 && !!AddressLine2 && !!City && !!State && !!Country)
        {
            await this.props.resetClient({});
            await this.props.setClient({AddressLine1:AddressLine1, AddressLine2:AddressLine2, City:City, State:State, Country:Country});
            this.props.navigation.navigate("CartScreen");
        }
        else
        {
            Alert.alert("All field required","Please fill all the fields");
        }
        
    }

    render(){
        return(

        <ScrollView style={styles.scrollContainer}>
            <View style={styles.heading}>
                         <Text style={styles.headingText}>Client Details</Text>
                 </View>
            {clientDetails.map(field=>{
                return  <View key={field} style={styles.rowView}>
                        <Text style={styles.fieldHeadingText}>{field}</Text>
                    <TextInput 
                    style={[styles.textInputStyle,{height:field=="AddressLine1" || field=="AddressLine2"?90:50,}]} 
                    onChangeText={(value)=>this.changeTextInput(field,value)}
                    >
                    </TextInput>
                </View>
                })
            }
            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.previousButton} 
                onPress={()=>this.props.navigation.navigate("HomeScreen")}>
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.previousButton} 
                onPress={this.navigateToNextPage}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        
        );
    }
}

const ReduxConnectedCompoment = connect(state => ({ client: state.data.client }), {
    setClient,
    resetClient
  })(ClientDetails);

export default ReduxConnectedCompoment;