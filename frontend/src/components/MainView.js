import React, {useCallback, useState} from 'react';
import ImagesList from './image/ImagesList';
import ContainersList from './containers/ContainersList';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';

const MainView = ({children}) => {
    const [searchFilter, setSearchFilter] = useState(null);
    const onSearch = useCallback((e) => {
        setSearchFilter(e.target.value);
    });

    return (
        <Router>
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-inverse navbar-embossed navbar-expand-lg" role="navigation">
                        <Link className="navbar-brand" to="/">Docker Manager</Link>

                        <div className="collapse navbar-collapse" id="navbar-collapse-01">
                            <ul className="nav navbar-nav mr-auto">
                                <li><Link to="/images">Images</Link></li>
                                <li><Link to="/containers">Containers</Link></li>
                            </ul>
                            <form className="navbar-form form-inline my-2 my-lg-0" action="#" role="search">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input className="form-control" id="navbarInput-01" type="search"
                                               placeholder="Search"
                                               onChange={onSearch}
                                        />
                                        <span className="input-group-btn">
                                        <div type="submit" className="btn"><span className="fui-search"/></div>
                                    </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </nav>

                    <Switch>
                        <Route path="/images">
                            <ImagesList filter={searchFilter}/>
                        </Route>

                        <Route path="/containers">
                            <ContainersList filter={searchFilter}/>
                        </Route>
                        <Redirect from="/" to="/images"/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default MainView;