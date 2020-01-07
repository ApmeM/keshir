import React from "react";
import {connect} from "react-redux";                          
import {fetchProduct} from "./ProductReducer";
import styles from './Product.module.css'
import ProductCard from "../ProductCard/ProductCardContainer";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";

class ProductContainer extends React.Component {
    componentDidMount() {
      this.props.fetchProduct(this.props.match.params.productId);
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed){
            return <Error message="something goes wrong"/>
        }

        if(this.props.product === undefined){
            return <Error message="No product found."/>
        }

        return <div>
            <div className={styles.productHeader}>{this.props.product.name}</div>
            <div dangerouslySetInnerHTML={{__html: this.props.product.description}}></div>
        </div>;
    }
}
const mapStateToProps = state => state.product
export default connect(mapStateToProps, {fetchProduct})(withRouter(ProductContainer))
