import React from "react";
import styles from './ShopHeader.module.css'
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";

class ShopHeader extends React.Component {
    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed){
            return <Error message="something goes wrong"/>
        }

        return <div className={styles.shopHeader}>
          { this.props.types.map( t =>
                <button key={t} onClick={() => this.props.fetchProducts(t)}>{t}</button>
          )}
        </div>
    }
}

export default ShopHeader