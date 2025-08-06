import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, put, call } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

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

const thunkStateDefault = {
    loading: false,
    data: [],
    err: ''
}
const thunkReducer = (state = thunkStateDefault, action) => {
    switch (action.type) {
        case 'thunk_init':
            return { ...state, loading: true }

        case 'thunk_success':
            return { ...state, data: action.data, loading: false }

        case 'thunk_failure':
            return { ...state, err: action.data, loading: false }

        default:
            return state;
    }
}

const fetchData = () => async (dispatch) => {
    dispatch({ type: 'thunk_init' });
    try {
        const res = await fetch('https://dummyjson.com/products?limit=5&skip=0');
        const data = await res.json();

        dispatch({ type: 'thunk_success', data: data.products });
    }
    catch (data) {
        dispatch({ type: 'thunk_failure', data });
    }
}

const sagaStateDefault = {
    loading: false,
    data: [],
    err: ''
}
const sagaReducer = (state = sagaStateDefault, action) => {
    switch (action.type) {
        case 'saga_init':
            return { ...state, loading: true }

        case 'saga_success':
            return { ...state, data: action.data, loading: false }

        case 'saga_failure':
            return { ...state, err: action.data, loading: false }

        default:
            return state;
    }
}

function* fetchDataSaga() {
    yield put({ type: 'saga_init' });
    try {
        const res = yield call(fetch, 'https://dummyjson.com/products?limit=5&skip=5');
        const data = yield call([res, 'json']);
        yield put({ type: 'saga_success', data: data.products });
    } catch (err) {
        yield put({ type: 'saga_failure', data: err.message });
    }
}

function* rootSaga() {
    yield takeLatest('FETCH_SAGA', fetchDataSaga);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers({ basic: basicReducer, thunkState: thunkReducer, sagaState: sagaReducer }),
    composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

function Child() {
    const dispatch = useDispatch();
    const basic = useSelector(state => state.basic);
    return (
        <div>
            <p>Basic Reducer</p>
            <hr />
            <button onClick={() => dispatch({ type: 'add', value: 1 })}>+ Basic</button>
            Basic - {basic}
            <button onClick={() => dispatch({ type: 'subtract', value: 1 })}>- Basic</button>
            <GrandChild />
        </div>
    );
}

function GrandChild() {
    const basic = useSelector(state => state.basic);
    return (
        <div>GrandChild - {basic}</div>
    );
}

function Items() {
    const dispatch = useDispatch();
    const { loading, err, data } = useSelector(state => state.thunkState);

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    return (
        <>
            <br />
            <p>React Thunk</p>
            <hr />
            <ul>
                {
                    err ? err : loading ? 'loading' :
                        data.filter((item, index) => index < 5).map((item, index) => <li key={index}>{item.title}</li>)
                }
            </ul>
        </>
    )
}

function ItemsSaga() {
    const dispatch = useDispatch();
    const { loading, err, data } = useSelector(state => state.sagaState);

    useEffect(() => {
        dispatch({ type: 'FETCH_SAGA' });
    }, []);

    return (
        <>
            <br />
            <p>Redux Saga</p>
            <hr />
            <ul>
                {
                    err ? err : loading ? 'loading' :
                        data.filter((item, index) => index < 5).map((item, index) => <li key={index}>{item.title}</li>)
                }
            </ul>
        </>
    )
}

function BasicImp() {
    return (
        <Provider store={store}>
            <Child />
            <Items />
            <ItemsSaga />
        </Provider>
    )
}

export default BasicImp;