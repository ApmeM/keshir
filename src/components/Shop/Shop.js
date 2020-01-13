import React from "react";
import {connect} from "react-redux";                          
import {fetchTypes, fetchProducts} from "./ShopReducer";
import styles from './Shop.module.css'
import ShopHeader from "./ShopHeader/ShopHeader";
import ShopContent from "./ShopContent/ShopContent";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";

class Shop extends React.Component {
    state = {
        categoryName: '',
        needReload: true
    };

    static getDerivedStateFromProps(props, state) {
        return {
            categoryName: props.match.params.categoryName,
            needReload: props.match.params.categoryName !== state.categoryName
        };
    }

    componentDidMount() {
        if(this.state.needReload)
        {
            this.props.fetchTypes(this.state.categoryName, this.props.types.currentType);
        }
    }

    componentDidUpdate() {
        if(this.state.needReload)
        {
            this.props.fetchTypes(this.state.categoryName, this.props.types.currentType);
        }
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed){
            return <Error message="something goes wrong"/>
        }

        return <div className={styles.shop}>
            <ShopHeader {...this.props.types} fetchProducts={(type)=>this.props.fetchProducts(this.state.categoryName, type)}/>
            <ShopContent {...this.props.products}/>
        </div>
    }
}
const mapStateToProps = state => state.shop
export default connect(mapStateToProps, {fetchTypes, fetchProducts})(withRouter(Shop))