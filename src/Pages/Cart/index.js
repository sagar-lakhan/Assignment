import React,{Component} from "react";
import {View,Text,FlatList, TouchableOpacity} from "react-native";
import ActivityLoader from "../../util/ActivityLoader";
import { connect } from "react-redux";

import { styles } from "./styles";
import { addFoodItem, removeFoodItem, resetClient,  } from "../../action";
import FoodItem from "../../components/foodItem";

class CartScreen extends Component{
    constructor(Props){
        super(Props);
        this.state={
            data:[],
            totalCost:0,
            client:{}
        }
    }

    componentDidMount(){
        this.setInitialData();
    }

    setInitialData=async ()=>{
        this.setState({
            data:this.props.foodRequest,
            client:this.props.client
        });
        let calculatation=0;
        for(let foodItem of this.props.foodRequest)
        {
            calculatation=calculatation+(parseFloat(foodItem.price)*parseInt(foodItem.quantity));
            this.calculateTotalCost(calculatation);
        }
        
    }


    renderRows=(item)=>{
        let product=item.item;
        return (<FoodItem productName={product.productName} productPrice={product.price} editable={product.editable} componentName="Cart" calculate={this.calculateTotalCost}></FoodItem>);
    }

    calculateTotalCost=async (value)=>{
        console.log(value);
        this.setState({totalCost:value});
    }

    navigateToNext=()=>{
        this.props.removeFoodItem([]);
        this.props.resetClient({});
        this.props.navigation.navigate("PlaceOrderScreen")
    }

    render(){
        const {showLoader, data, totalCost} =this.state;
        const { AddressLine1, AddressLine2, City, State, Country } = this.props.client;
        return(<>
            <View style={styles.container}>
                 {showLoader && <ActivityLoader showLoader={showLoader} />}
                 <View style={styles.header}>
                         <Text style={styles.headerTitle}>Your Food Order </Text>  
                         <View style={styles.clientDetailsView}>
                            <Text style={styles.clientDetailsText}>Delivery Address</Text>
                            <Text style={styles.clientDetailsText} numberOfLines={3}>{!!AddressLine1&&AddressLine1+","} {!!AddressLine2&&AddressLine2+","} {!!City&&City+","} {!!State&&State+","} {!!Country&&Country} </Text>
                         </View>
                 </View>
                 <View style={styles.lstFoodHeading}>
                     <View style={styles.lstRowView}>
                        <Text style={styles.lstFoodItemHeading}>Food Item</Text>
                        <Text style={styles.priceHeading}>Price</Text>
                        <Text style={styles.priceHeading}>Quantity</Text>
                        <Text style={{flex:1}}></Text>
                     </View>
                 </View>
                 <FlatList
                    style={styles.flatList}
                    data={data}
                    renderItem={this.renderRows}
                    maxToRenderPerBatch={10}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item) => String(item.productName)}
                    />
               
            </View>
             <View style={styles.bottomView}>
            
             <TouchableOpacity 
             style={styles.placeHolderButton}
             onPress={this.navigateToNext}
             >
                 <Text style={styles.placeHolderButtonText}>Place Order</Text>
            </TouchableOpacity>
            <View style={{marginVertical:10,}}>
                 <Text style={styles.TotalCostText}>Order Cost</Text>
                 <Text style={styles.TotalCostText}>{totalCost}</Text>
             </View>
         </View>
         </>
        );
    }
}

const ReduxConnectedCompoment = connect(state => ({ client: state.data.client, foodRequest: state.data.request }), {
    removeFoodItem,
    resetClient,
    addFoodItem
  })(CartScreen);

export default ReduxConnectedCompoment;