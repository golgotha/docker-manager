import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import 'flat-ui/bootstrap/css/prettify.css';
import 'flat-ui/bootstrap/css/bootstrap.css';
import 'flat-ui/css/flat-ui.css';
import '../css/styles.scss';
import ImagesList from './components/image/ImagesList';
import MainView from './components/MainView';

const renderPage = () => {
    ReactDOM.render(
        <MainView/>, document.getElementById('container'));
}

renderPage();

if (module.hot) {
    module.hot.accept('./index.js', () => {
        // const updatedRoutesTemplate = require('./entry.js'); // eslint-disable-line global-require
        renderPage();
    });
}