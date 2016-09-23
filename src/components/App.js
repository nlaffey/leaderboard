import React, {Component, PropTypes} from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
