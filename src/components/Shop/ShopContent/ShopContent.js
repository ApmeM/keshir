import React from "react";
import styles from './ShopContent.module.css'
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import ProductCard from "../../ProductCard/ProductCard";

class ShopContent extends React.Component {
    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed){
            return <Error message="something goes wrong"/>
        }

        return <div className={styles.shopHeader}>
          { this.props.products.map( p =>
              <ProductCard key={p.id} {...this.props} productCard={p} />
          )}
        </div>
    }
}

export default ShopContent