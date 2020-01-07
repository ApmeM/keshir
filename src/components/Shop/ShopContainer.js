import React from "react";
import {connect} from "react-redux";                          
import {fetchShop} from "./ShopReducer";
import styles from './Shop.module.css'
import ProductCard from "../ProductCard/ProductCardContainer";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

class ShopContainer extends React.Component {
    componentDidMount() {
      this.props.fetchShop();
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed){
            return <Error message="something goes wrong"/>
        }

        return <div>
          { this.props.products.map( p =>
            <div key={p.id} className={styles.shopElement}> 
                <ProductCard {...this.props} productCard={p} />
            </div>
          )}
        </div>
    }
}
const mapStateToProps = state => state.shop
export default connect(mapStateToProps, {fetchShop})(ShopContainer)