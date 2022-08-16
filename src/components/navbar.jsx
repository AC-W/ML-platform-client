import React, { Component } from 'react'
import './navbar.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { NavLink } from "react-router-dom";

import socket from '../socket.js'

class NavBar extends Component {

    constructor(){
        super()

        this.state = {
            model:'Models',
            status:'Server Status'
        }

        this.socket = socket

        this.socket.on("connect", () => {
            console.log("connected");
        });

        this.socket.on('connection msg', (data) =>{
            this.setState({model:this.state.model,status:data.msg})
            
        })
    }

    changeModel = name =>{
        console.log(name)
        this.setState({model:this.state.model,status:'loading model...'})
        this.socket.emit('model_connect',{model:name})
        this.setState({model:name,status:this.state.status})
        return
    }
    
    render() { 
        return (
            
            <div className='nav_bar_container'>
                <div className='nav_bar_items'>
                    <DropdownButton id="dropdown-basic-button" title={this.state.model}>
                        <Dropdown.Item onClick={ () => this.changeModel('car_model_recognition')}>Car Model Recognition</Dropdown.Item>
                        <Dropdown.Item onClick={ () => this.changeModel('Model 2')}>Model 2</Dropdown.Item>
                        <Dropdown.Item onClick={ () => this.changeModel('Model 3')}>Model 3</Dropdown.Item>
                    </DropdownButton>
                </div>
                    
                <div className='nav_bar_items'>
                    <h4 className='status'>{this.state.status}</h4>
                </div>
                    
                <div className='nav_bar_items'>
                    <h4 className='title'>Home</h4>
                </div>
            </div>
        );
    }
    
}
 
export default NavBar;