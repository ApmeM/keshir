import React from "react";
import {connect} from "react-redux";                          
import {fetchShop} from "./ShopReducer";
import styles from './Shop.module.css'
import ProductCard from "../ProductCard/ProductCardContainer";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";

class ShopContainer extends React.Component {
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
            this.props.fetchShop(this.state.categoryName);
        }
    }

    componentDidUpdate() {
        if(this.state.needReload)
        {
            this.props.fetchShop(this.state.categoryName);
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
          { this.props.products.map( p =>
                <ProductCard key={p.id} {...this.props} productCard={p} />
          )}
        </div>
    }
}
const mapStateToProps = state => state.shop
export default connect(mapStateToProps, {fetchShop})(withRouter(ShopContainer))