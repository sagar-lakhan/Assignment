import React,{Component} from "react";
import { View, Text, TouchableOpacity, TextInput,StyleSheet } from "react-native";
import { connect } from "react-redux";

import { addFoodItem, removeFoodItem } from "../action";

class FoodItem extends Component{
    constructor(props){
        super(props);
        this.state={
            product:props.productName,
            price:props.productPrice+"",
            quantity:"1",
            editable:props.editable,
            added:props.componentName=="Cart"?true:false,
            totalCost:0
        }
    }

    ChangeTextInput=async (field,value)=>{
        const { componentName } = this.props;
        this.setState({[field]:value+""});
        if(field=="quantity" && componentName=="Cart" )
        {
           await this.updateRequest();
        }
    }

    updateRequest= async ()=>{
      this.addProduct();
      this.addProduct(); 
    }


    addProduct=async ()=>{
        const { product, price, quantity, added } = this.state;
        if(!added)
        {
            await this.props.addFoodItem({productName:product, price:price, quantity:quantity});
            this.setState({added:true});
        }
        else 
        {
            await this.props.removeFoodItem(await this.props.foodRequest.filter(foodItem=>{return foodItem.productName!=this.props.productName}));
            this.setState({added:false});
        }     
       
       
        if(!!this.props.foodRequest)
        {
            let calculations=0;
            for(let foodItem of this.props.foodRequest)
            {
                calculations=calculations+(parseInt(foodItem.quantity) * parseFloat(foodItem.price));
            }
            this.props.calculate(calculations);
        }

        
    }
    

    render(){ 
        const { product, price, quantity, editable, added } = this.state;
        const { componentName } =this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.nameText}>{product}</Text>
                {componentName=="Cart"?<Text style={styles.priceText}>{price}</Text>:<TextInput 
                style={styles.priceTextInput} 
                value={price+""} 
                keyboardType="number-pad" 
                disabled={!product.editable}
                onChangeText={(value)=>this.ChangeTextInput("price",value)}
                >    
                </TextInput>}
                <TextInput 
                style={styles.quantityTextInput} 
                value={quantity}
                keyboardType="number-pad"
                onChangeText={(value)=>this.ChangeTextInput("quantity",value)}
                ></TextInput>
                <View style={styles.bottomView}>
                  <TouchableOpacity 
                    style={[styles.button,{backgroundColor:!!added?"#ff0000":"#00cc66"}]}
                    onPress={()=>this.addProduct()}>
                        <Text style={styles.buttonText}>{!!added?"-":"+"}</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{height:60,flexDirection:"row", justifyContent:"space-evenly",alignItems:"center"},
    nameText:{flex:3,color:"#00cc66",fontSize:16, paddingLeft:10},
    priceText:{flex:2,color:"#00cc66",fontSize:16, paddingLeft:10},
    priceTextInput:{flex:2, width:"90%", height:40, borderWidth:1, color:"#00cc66", fontSize:16, marginHorizontal:10, paddingLeft:10},
    quantityTextInput:{flex:2, width:"90%", height:40, borderWidth:1, color:"#00cc66", fontSize:16, marginHorizontal:10, paddingLeft:10},
    bottomView:{flex:1,justifyContent:"center",alignItems:'center'},
    button:{justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius:15},
    buttonText:{color:"#fff", fontSize:18}
});

const ReduxConnectedCompoment = connect(state => ({ foodRequest: state.data.request }), {
    addFoodItem,
    removeFoodItem
  })(FoodItem);

export default ReduxConnectedCompoment;