import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'

class NavBar extends Component{

    constructor() {
        super()
        this.state = {

        }

    }

    render(){

        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)', marginBottom: '0%'}}>
                <a className="navbar-brand my_nav" href="http://127.0.0.1:3000/home" style={{color: 'white', fontSize: '2em', fontStyle: 'bold'}}>Świdnik Analysis</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item active">
                    <a className="nav-link" href="#" style={{color: 'white', fontSize: '1.2em'}}>Mapy</a>
                    </li>

                    <li className="nav-item active">
                    <a className="nav-link" href="/streets" style={{color: 'white', fontSize: '1.2em'}}>Ulice</a>
                    </li>

                    <li className="nav-item active">
                    <a className="nav-link" href="/bicycles" style={{color: 'white', fontSize: '1.2em'}}>Rowery miejskie</a>
                    </li>
                
                </ul>
                
                </div>
            </nav>
        )
    }
}

export default NavBar