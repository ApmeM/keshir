import React from "react";
import {connect} from "react-redux";
import ShopElement from "./ShopElement";
import {fetchProducts} from "../../redux/productsReducer";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

class ShopContainer extends React.Component {
    componentDidMount() {
      this.props.fetchProducts();
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
            <ShopElement key={p.id} {...this.props} product={p} />
          )}
        </div>
    }
}
const mapStateToProps = state => state.products
export default connect(mapStateToProps, {fetchProducts})(ShopContainer)