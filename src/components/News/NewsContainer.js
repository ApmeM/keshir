import React from "react";
import {connect} from "react-redux";                          
import {fetchShop} from "../Shop/ShopReducer";
import styles from './News.module.css'
import ProductCard from "../ProductCard/ProductCardContainer";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

class NewsContainer extends React.Component {
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

        return <div className={styles.news}>
            <ProductCard {...this.props} productCard={ this.props.products.filter(p=>p.id === "6")[0] } />
            <ProductCard {...this.props} productCard={ this.props.products.filter(p=>p.id === "3")[0] } />
            <ProductCard {...this.props} productCard={ this.props.products.filter(p=>p.id === "10")[0] } />
        </div>
    }
}
const mapStateToProps = state => state.shop
export default connect(mapStateToProps, {fetchShop})(NewsContainer)
