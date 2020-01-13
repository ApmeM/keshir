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
            <ul className={styles.shopTypeList}>
              { this.props.types.map( t => {
                      return <li key={t}>
                          <button
                            onClick={() => this.props.fetchProducts(t)}
                            alt={this.props.description}
                            className={'' + (this.props.currentType === t ? styles.active : '')}
                            >{t}</button>
                      </li>
                  }
              )}
            </ul>
        </div>
    }
}

export default ShopHeader