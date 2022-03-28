import React, { Component,useState } from 'react';
import {Nav, NavItem,Row } from 'reactstrap';

import {NavLink } from 'react-router-dom';  
const RenderNavbar=(props)=> {
	return(
		<div>
			<div>
			<Nav className="col-xs-12 offset-sm-2 col-sm-8" justified>
				<NavItem>
		          <NavLink className="nav-link" to="/home">Home</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/politics">Politics</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/oped">Op-Ed</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/international">World</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/technology">Technology</NavLink>
		        </NavItem>
		        <NavItem>
		          <NavLink className="nav-link" to="/lists/sports">Sports</NavLink>
		        </NavItem>
				</Nav>
			</div>
			<div>
			 <Nav className="col-xs-12 offset-sm-2 col-sm-8" justified>
		        <NavItem>
		          <NavLink className="nav-link" to="/poll">Poll</NavLink>
		        </NavItem>

				<NavItem>
		          <NavLink className="nav-link" to="/user">User Account</NavLink>
		        </NavItem>
				
				<NavItem>
		          <NavLink className="nav-link" to="/signup">SignUp</NavLink>
		        </NavItem>

				<NavItem>
		          <NavLink className="nav-link" to="/signin">SignIn</NavLink>
		        </NavItem>

				
		      </Nav>
			</div>
		      <hr />
	      </div>
		)
}
export default RenderNavbar;