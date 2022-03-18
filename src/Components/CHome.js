import React, { Component } from 'react';

const data = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

class FilterableProductTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterText: '',
      inStockOnly: false,
    }
  }

  setInStockOnly = () => {
    this.setState({
      inStockOnly: !this.state.inStockOnly,
    })
  }

  setFilterText = (event) => {
    this.setState({
      filterText: event.target.value,
    })
  }
  render() {
    return (
      <>
        <SearchBar setInStockOnly={this.setInStockOnly} setFilterText={this.setFilterText} />
        <ProductTable data={this.props.data} inStockOnly={this.state.inStockOnly} filterText={this.state.filterText} />
      </>
    )
  }
}

class SearchBar extends Component {
  render() {
    const setInStockOnly = this.props.setInStockOnly;
    const setFilterText = this.props.setFilterText;
    return (
      <form>
        <input type="text" placeholder='Search...' onChange={(event) => setFilterText(event)} />
        <br />
        <label>
          <input type="checkbox" name="" id="" onChange={setInStockOnly} />Only show products in stock
        </label>
      </form>
    )
  }
}
class ProductTable extends Component {
  render() {
    const row = [];
    let lastCategory = null;
    const inStockOnly = this.props.inStockOnly;

    this.props.data.forEach(product => {
      if (product.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return
      }
      if (product.category !== lastCategory) {
        row.push(<ProductCategoryRow category={product.category} key={product.category} />)
      }
      row.push(<ProductRow product={product} key={product.name} />)
      lastCategory = product.category;
    })

    return (
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {row}
        </tbody>
      </table>
    )
  }
}
class ProductCategoryRow extends Component {
  render() {
    return (
      <tr>
        <td colSpan={2}>
          {this.props.category}
        </td>
      </tr>
    )
  }
}
class ProductRow extends Component {
  render() {
    const product = this.props.product;
    const name = product.stocked
      ? product.name
      : <span style={{ color: 'red' }}>{product.name}</span>
    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          {this.props.product.price}
        </td>
      </tr>
    )
  }
}

class CHome extends Component {
  render() {
    return (
      <>
        <h1 className="heading">Hi from home page class</h1>
        <FilterableProductTable data={data} />
      </>
    )
  }
}

export default CHome;