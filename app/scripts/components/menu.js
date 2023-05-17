/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchProducts: []
        };
        // this.getProducts = this.getProducts();
    }


    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        
        // Start Here
        // ...
        if (!e.target.value.trim()) {
            this.setState({
                searchProducts: []
            })
            return
        }

        fetch(`http://localhost:3035?searchKey=${e.target.value}`)
            .then(async response => {
                if (!response.ok) {
                    console.log("Something went wrong!")
                } else {
                    const data = await response.json()
                    console.log(data);
                    this.setState({
                        searchProducts: data
                    })
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    getProducts() {
        const {searchProducts} = this.state;
        return searchProducts.length > 0 && searchProducts.map((product,index) => {
            return <div className={"card"} key={index}>
                <div className="card-img">
                    <img src={product.picture} alt={product.name}/>
                </div>
                <div className="card-body">
                    <h2>{product.name}</h2>
                    <h4>$ {product.price}</h4>
                    <p>{product.about}</p>
                </div>
            </div>
        })
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <div className="product-list">
                        {this.getProducts()}
                    </div>
                    {/*<div className="">
                        <div className="">Hello</div>
                        <div className="">Hello</div>
                        <div className="">Hello</div>
                        <div className="">Hello</div>
                    </div>*/}
                </div>
            </header>
        );
    }


}

// Export out the React Component
export default Menu;