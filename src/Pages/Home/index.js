import React,{Component} from "react";
import {View,Text,FlatList,TouchableOpacity, Alert} from "react-native";
import { connect } from "react-redux";

import ActivityLoader from "../../util/ActivityLoader";
import FoodItem from "../../components/foodItem";
import { styles } from "./styles";


class HomeScreen extends Component{
    constructor(Props){
        super(Props);
        this.state={
            showLoader:false,
            data:[{name:"Product 1", quantity:0, price:10, editable:true}, 
            {name:"Product 2", quantity:0, price:8}, 
            {name:"Product 3", quantity:0, price:9}, 
            {name:"Product 4", quantity:0, price:7}, 
            {name:"Product 5", quantity:0, price:11, editable:true}, 
            {name:"Product 6", quantity:0, price:12, editable:true}, 
            {name:"Product 8", quantity:0, price:15, editable:true}],
            totalCost:0
        }
    }

    componentDidMount(){
        
    }

    toggleLoader = (showLoader) => this.setState({ showLoader });

    renderRows=(item)=>{
        let product=item.item;
        return (<FoodItem productName={product.name} productPrice={product.price} editable={product.editable} componentName="MenuList" calculate={this.calculateTotalCost}></FoodItem>);
    }

    calculateTotalCost=async (value)=>{
        this.setState({totalCost:value});
    }

    navigateToNextScreen=()=>{
        const{ totalCost } = this.state
        console.log(!!totalCost);
        if(!!totalCost)
        {
            this.props.navigation.navigate("ClientDetailsScreen");
        }
        else
        {
            Alert.alert("Empty Cart","Please add atleast one food item");
        }
        
    }

    render(){
        const {showLoader,data,totalCost} =this.state;
        return(<>
            <View style={styles.container}>
                 {showLoader && <ActivityLoader showLoader={showLoader} />}
                 <View style={styles.header}>
                         <Text style={styles.headerText}>Menu List</Text>
                 </View>
                 <View style={styles.lstFoodHeadingView}>
                     <View style={styles.lstFoodHeading}>
                     <Text style={styles.lstFoodHeadingText}>Food Item</Text>
                     <Text style={styles.lstHeadingText}>Price</Text>
                     <Text style={styles.lstHeadingText}>Quantity</Text>
                     <Text style={{flex:1}}></Text>
                     </View>
                 </View>
                 <FlatList
                style={styles.flatList}
          data={data}
          renderItem={this.renderRows}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => String(item.name)}
          refreshing={false}
          onRefresh={() => this.getInitialData()}
        />
               
            </View>
             <View style={styles.bottomView}>
                <TouchableOpacity style={styles.buttonStyle} onPress={this.navigateToNextScreen}>
                    <Text style={styles.buttonText}>Total Cost {totalCost}</Text>
                </TouchableOpacity>
             </View>
         </>
        );
    }
}

const ReduxConnectedCompoment = connect(state => ({ foodRequest: state.data.request }), {})(HomeScreen);


export default ReduxConnectedCompoment;