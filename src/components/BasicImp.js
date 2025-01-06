import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const MULTIPLY = 'MULTIPLY';
const DIVIDE = 'DIVIDE';
const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const addValue = (value) => {
    return {
        type: ADD,
        payload: {
            value,
        }
    }
}

const subtractValue = (value) => {
    return {
        type: SUBTRACT,
        payload: {
            value,
        }
    }
}

const multiplyBy = value => {
    return {
        type: MULTIPLY,
        payload: {
            value,
        }
    }
}

const divideBy = value => {
    return {
        type: DIVIDE,
        payload: {
            value,
        }
    }
}

const defaultValue = 20;

const counterReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case ADD:
            return state + action.payload.value;
        case SUBTRACT:
            return state - action.payload.value;
        default:
            return state;
    }
}

const multiply = 100;
const multiReducer = (state = multiply, action) => {
    switch (action.type) {
        case MULTIPLY:
            return state * action.payload.value;

        case DIVIDE:
            return Math.floor(state / action.payload.value);

        default:
            return state;
    }
}

const init = {
    data: [],
    loading: false,
    error: ''
}

const asyncReducer = (state = init, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.data,
            }
        default:
            return state;
    }
}

const fetchProducts = () => {
    return {
        type: FETCH_PRODUCTS,
    }
}

const fetchProductsSuccess = (data) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
            data,
        }
    }
}

const fetchProductsFailure = (data) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: {
            data,
        }
    }
}

const store = createStore(combineReducers({ basic: counterReducer, advance: multiReducer, products: asyncReducer }));

const Addition = () => {
    const count = useSelector(state => state.basic);
    const dispatch = useDispatch();

    return (
        <div>
            <div>Child1 count - {count}</div>
            <button onClick={() => dispatch(addValue(1))}>Add</button>
            <Multiplication />
        </div>
    )
}

const Subtraction = () => {
    const count = useSelector(state => state.basic);
    const dispatch = useDispatch();

    return (
        <div>
            <div>Child2 count - {count}</div>
            <button onClick={() => dispatch(subtractValue(1))}>Subtract</button>
            <Products />
        </div>
    )
}

const Multiplication = (value) => {
    const count = useSelector(state => state.advance);
    const dispatch = useDispatch();

    return (
        <div>
            <div>GrandChild1 count - {count}</div>
            <button onClick={() => dispatch(multiplyBy(2))}>Multiply</button>
            <Division />
        </div>
    )
}

const Division = (value) => {
    const count = useSelector(state => state.advance);
    const dispatch = useDispatch();

    return (
        <div>
            <div>GrandChild2 count - {count}</div>
            <button onClick={() => dispatch(divideBy(2))}>Divide</button>
        </div>
    )
}

const Products = () => {
    const { loading, error, data } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            dispatch(fetchProducts());
            try {
                const res = await fetch('https://dummyjson.com/products');
                const data = await res.json();
                dispatch(fetchProductsSuccess(data.products));
            }
            catch (err) {
                dispatch(fetchProductsFailure(err));
                console.log(err)
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            Products:
            <ul>
                {
                    loading
                        ? <li>Loading...</li>
                        : error
                            ? <li>Error</li>
                            : data && data.length > 0
                                ? data.map((item, index) => <li key={index}>{item.title}</li>)
                                : null
                }
            </ul>
        </div>
    )
}

function BasicImp() {
    return (
        <Provider store={store}>
            <div>BasicImp</div>
            <Addition />
            <Subtraction />
        </Provider>
    )
}

export default BasicImp