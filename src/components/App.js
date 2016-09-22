import React, {Component, PropTypes} from 'react';
import Content from './Content/Content';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
