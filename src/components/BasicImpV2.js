import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

const basicDefault = 10;
const basicReducer = (state = basicDefault, action) => {
    switch (action.type) {
        case 'add':
            return state + action.value;
        case 'subtract':
            return state - action.value;
        default:
            return state;
    }
}

const asyncDefault = {
    loading: false,
    data: [],
    err: ''
}
const asyncReducer = (state = asyncDefault, action) => {
    switch (action.type) {
        case 'init':
            return { ...state, loading: true }

        case 'success':
            return { ...state, data: action.data, loading: false }

        case 'failure':
            return { ...state, err: action.data, loading: false }

        default:
            return state;
    }
}

const fetchData = () => async (dispatch) => {
    dispatch({ type: 'init' });

    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        dispatch({ type: 'success', data: data.products });
    }
    catch (data) {
        dispatch({ type: 'failure', data });
    }
}

const store = createStore(combineReducers({ basic: basicReducer, async: asyncReducer }), applyMiddleware(thunk));

function BasicImpV2() {
    return (
        <Provider store={store}>
            <Child />
            <Todos />
        </Provider>
    )
}

function Child() {
    const dispactch = useDispatch();
    const basic = useSelector(state => state.basic);
    return (
        <div><button onClick={() => dispactch({ type: 'add', value: 1 })}>+ Basic</button> Basic - {basic} <button onClick={() => dispactch({ type: 'subtract', value: 1 })}>- Basic</button> <GrandChild /></div>
    )
}

function GrandChild() {
    const basic = useSelector(state => state.basic);
    return (
        <div>GrandChild - {basic}</div>
    )
}

function Todos() {
    const dispatch = useDispatch();
    const { loading, err, data } = useSelector(state => state.async);

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    return (
        <ul>
            {
                err ? err : loading ? 'loading' :
                    data?.map((item, index) => <li key={index}>{item.title}</li>)
            }
        </ul>
    )
}

export default BasicImpV2;