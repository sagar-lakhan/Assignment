import React,{Component} from "react";
import { Text, View, TouchableOpacity } from "react-native";


import { styles } from "./styles";

class PlacedOrder extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.header}>
                    Thank you for order.
                </Text>
                <TouchableOpacity style={styles.button} 
                onPress={()=>this.props.navigation.navigate("HomeScreen")}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default PlacedOrder;