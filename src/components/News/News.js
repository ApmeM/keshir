import React from "react";
import {connect} from "react-redux";
import {fetchNews} from "./NewsReducer";
import styles from './News.module.css'
import ProductCard from "../ProductCard/ProductCard";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {compose} from "redux";

class News extends React.Component {
    componentDidMount() {
        this.props.fetchNews(["1", "4", "10"]);
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed) {
            return <Error message="something goes wrong"/>
        }

        return <div className={styles.news}>
            <ProductCard {...this.props} productCard={this.props.products.filter(p => p.id === "1")[0]}/>
            <ProductCard {...this.props} productCard={this.props.products.filter(p => p.id === "4")[0]}/>
            <ProductCard {...this.props} productCard={this.props.products.filter(p => p.id === "10")[0]}/>
        </div>
    }
}

const mapStateToProps = state => state.news;
export default compose(
    connect(mapStateToProps, {fetchNews})
)(News)
