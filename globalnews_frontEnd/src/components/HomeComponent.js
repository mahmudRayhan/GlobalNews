import React, { Component,useState } from 'react';
import { Collapse, Button, CardBody, Card, Jumbotron, Nav, NavItem, Media,
CardImg, CardText, CardTitle, CardSubtitle, CardImgOverlay, Row, Col, ListGroup, CardGroup, Container } from 'reactstrap';

import { Link, NavLink } from 'react-router-dom';         
import '../css/lists.css';
import '../css/home.css';
import '../css/footer.css';
import axiosNew from '../axiosNew' 
import chalk from 'chalk';
import Backdrop from '../components/UI/Backdrop'
import Spinner from '../components/UI/Spinner'
import RenderNavbar from './UI/NavBarComponent';

function RenderJumbotron({toggle,isOpen,news}) {
	console.log(chalk.red("Inside RenderJumbptron"));
	console.log(news.title);
	return(
		<Jumbotron id="jumboheight">
		  <div className="row">
		  	<div className="col-sm-12">
			  	  <div id="toggler">
			      	  <Button className="dotMenu"  color="primary" onClick={toggle}>
			      	  	<i className="fa fa-bars fa-lg"></i>
			      	  </Button>
						<div className="projectdTitle" >Global News</div>
				      <Collapse navbar isOpen={isOpen}>
				        <Card id="idmediabody">
				          <CardBody>
				            <Nav navbar className="sideNav">
                                <div className="row">
                                	<div className="col-12 align-items-start">
                                		<NavItem>
		                                    <NavLink className="nav-link"  to='/home'><h3> Home</h3></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link" to='/lists/1'><h3>Politics</h3></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link"  to='/lists/international'><h3> World</h3></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link" to='/lists/sports'><h3> Sports</h3></NavLink>
		                                </NavItem>
		                                <hr color="black"/>
                                	</div>
                                	<div className="col-12 align-items-center">
                                		<NavItem>
		                                    <NavLink className="nav-link"  to='/lists/4'><h3> Entertainment</h3></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link" to='/lists/5'><h3> Justice</h3></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link"  to='/'><h3> Opinions</h3></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link" to='/'><h3>Polls</h3></NavLink>
		                                </NavItem>
		                                <hr color="black"/>
                                	</div>
                                	<div className="col-12 align-items-center">
                                		<NavItem>
		                                    <NavLink className="nav-link"  to='/'><h4> About us</h4></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link" to='/'><h4> Contact Us</h4></NavLink>
		                                </NavItem>
		                                <NavItem>
		                                    <NavLink className="nav-link"  to='/'><h4>Our Policies</h4></NavLink>
		                                </NavItem>
                                	</div>
                                </div>
                            </Nav>
				          </CardBody>
				        </Card>
				      </Collapse>
			  	   </div>
		  	</div>
		  	<div className="col-12">
	          <Link className="newslinkhome" to={'/news/43a6ab17-c376-4741-bea6-a64a831a65fb?id=51'}>
			  	  <h1 id="title1" >{news.title}</h1>
				  <h6 id="title2" >Mahmud Rayhan</h6>
				</Link>  
		  	</div>
		  </div>
		</Jumbotron>
		)
}


function RenderMedialeft ({news}) {
      return (
          <Link className="newslinkhome" to={'/news/'+news._id}>
              <div className="row justify-content-start topmedia">
			      <div id="pbottom" className="col-xs-12 col-sm-4 topmedia">
			      	<Media right href="#" >
				        <Media object src={news.thumbnail} alt="Generic placeholder image" />
				    </Media>
			      </div>
			      <div className="col-xs-12 ml-sm-5 mediabody col-sm-5">
			      	<Media body className="align-self-center">
			        <Media className="stitle" heading>
			          {news.title}
			        </Media>
			        {/* <p className="newdescription" >{news.body}</p> */}
			      </Media>
			      </div>
			  </div>
          </Link>   
      );
  }



function RenderMediaright ({news}) {
	let width = window.innerWidth;
	if(width>=576)
	  return (
          <Link className="newslinkhome" to={'/news/'+news._id}>
	          <div className="row  topmedia">
			    	<div className="">
			    		<Media>
			    		  <Media body className="col-xs-12 rmediabody col-sm-5 align-self-center" left>
					        <Media className="media-heading stitle" heading left>
					          {news.title}
					        </Media>
					        {/* <p className="newdescription">{news.body}</p> */}
					      </Media>
					      <Media className="col-xs-12 offset-sm-1 col-sm-4 " href="#">
					        <Media object src={news.thumbnail} alt="Generic placeholder image" />
					      </Media>
					    </Media>
			    	</div>	
			    </div>
	      </Link>
	  );

	else
	  return (
          <Link to={'/news/43a6ab17-c376-4741-bea6-a64a831a65fb?id=51'}>
              <div className="row justify-content-start topmedia">
			      <div id="pbottom" className="col-xs-12 col-sm-4 topmedia">
			      	<Media right href="#" >
				        <Media object src={news.thumbnail} alt="Generic placeholder image" />
				    </Media>
			      </div>
			      <div className="col-xs-12 ml-sm-5 mediabody col-sm-5">
			      	<Media body className="align-self-center">
			        <Media className="stitle" heading>
			          {news.title}
			        </Media>
			        {/* <p className="newdescription">{news.body}</p> */}
			      </Media>
			      </div>
			  </div>
          </Link>
	  );
}


function SingleCard({news,cid}) {
	let cardid = cid

	if(cardid)
		return (
          <Link className="newslinkhome" to={'/news/'+news._id}>
	          <div className="row justify-content-end" id="sidemedia">
			      <Card className="col-md-12">
			        <CardImg top  src={news.thumbnail} alt="Card image cap" />
			        <CardBody>
			          <CardTitle id="smalltitle">{news.title}</CardTitle>
			          <CardSubtitle  tag="p" className="mb-2 text-muted subtitle ">{news.category}</CardSubtitle>
			        </CardBody>
			      </Card>
			   </div>
	      </Link>
	  );

	else
		return (
          <Link className="newslinkhome" to={'/news/43a6ab17-c376-4741-bea6-a64a831a65fb?id=51'}>
	          <div className="row ">
			      <Card className="col-md-12">
			        <CardImg top className="cardimg" src={news.image} alt="Card image cap" />
			        <CardBody>
			          <CardTitle className="stitle">{news.name}</CardTitle>
			          <CardSubtitle  tag="p" className="mb-2 text-muted subtitle">{news.category}</CardSubtitle>
			        </CardBody>
			      </Card>
			   </div>
	      </Link>
	  );
}

function SmallMedia({news}) {
	return (
		<div>
		
          <Link className="newslinkhome" to={'/news/43a6ab17-c376-4741-bea6-a64a831a65fb?id=51'}>
				<Media className="row">
			      <Media className="col-md-6" href="#" >
			        <Media object src={news.thumbnail} alt="Generic placeholder image" />
			      </Media>
			      <Media body className="col-md-6 mediabody">
			        <Media heading id="smalltitle">
			          dummy
			        </Media>
			        {news.category}
			      </Media>
			    </Media>
		    </Link>
		    <div className="row">
				<div className="col-md-12">
					<hr />
				</div>
			</div>
		</div>
		)
}


function RenderSideCards({news}) {
	var arr=[1,2,3]

	return (
		<div>
			{arr.map(i => {
				return(
					<div key={i}>
						<SingleCard news={news} cid={true}/>
					</div>	
					)
			})}
		</div>
    );
}


function RenderOpinions({news}) {
	var arr=[1,2]
	return(
		<div>
			<div className="row">
				<div className="col-md-12">
					<hr color="black"/>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12 mediabody">
					<h1>Opinions</h1>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					<hr />
				</div>
			</div>

			<div>
			
				{arr.map(i => {
					return(
						<div key={i}>
							<SmallMedia news={news}/>
						</div>	
						)
				})}
			</div>
			
		</div>
		)
}


function RenderVideo({news}) {
	return(
		<div>
			<div className="row">
     				<div className="col-md-12">
     					<hr color="black"/>
     				</div>
 				</div>

 				<div className="row">
     				<div className="col-md-12 mediabody">
     					<h1>Videos</h1>
     				</div>
 				</div>

 				<div className="row">
     				<div className="col-md-12">
     					<hr />
     				</div>
 				</div>

 				<div className="row">
	 				<SingleCard news={news} cid={false} />
			    </div>
		</div>	
		)
}

function RenderImages({news}) {
	return(
		<div>
			<div className="row">
				<div className="col-md-12">
					<hr color="black"/>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12 mediabody">
					<h1>Images</h1>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					<hr />
				</div>
			</div>

			<div className="row justify-content-end">
		      <Card className="col-md-12">
		        <CardImg top  src="logo48.png" alt="Card image cap" />
		        <CardBody>
		          <CardTitle tag="h5">Card title</CardTitle>
		        </CardBody>
		      </Card>
		    </div>

		    <div className="row justify-content-end">
		      <Card className="col-md-12">
		        <CardImg top  src="logo48.png" alt="Card image cap" />
		        <CardBody>
		          <CardTitle tag="h5">Card title</CardTitle>
		        </CardBody>
		      </Card>
		    </div>
		</div>	
		)
}



function DisplayNews({news}){
	let url=null
	if(news.url !== undefined)
	url= news.url
	else 
	url = "/news/"+news._id;
	console.log(url)
		return (
          <a href={url} target="_blank">
	          <div id="sidemedia" style={{marginRight:'10px'}}>
			      <Card border="primary" bg='dark' style={{ width: '17rem' }}>
			        <CardImg top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt="Card image cap" />
			        <CardBody>
			          <CardTitle id="smalltitle">{news.title}</CardTitle>
			          <CardSubtitle  tag="p" className="mb-2 text-muted subtitle ">{news.category}</CardSubtitle>
			        </CardBody>
			      </Card>
			   </div>
	      </a>
	  );

}
function RenderSection({news}){
	return(
		<div>	
			<Row>
				{news.map(item=>{
					return(
					<DisplayNews news={item}/>)
				})}
			</Row>	
		</div>
		)
}

function NewsAtom({news}){
	let url=null
	if(news.url !== undefined)
	url= news.url
	else 
	url = "/news/"+news._id;
	console.log(url)
		return (
          <a href={url} target="_blank">
	          <div id="sidemedia" style={{marginRight:'10px'}}>
			      <Card border="primary" bg='dark' style={{ width: '17rem' }}>
			        <CardImg top  src={news.thumbnail} alt="Card image cap" />
			        <CardBody>
			          <CardTitle id="smalltitle">{news.title}</CardTitle>
			          <CardSubtitle  tag="p" className="mb-2 text-muted subtitle ">{news.category}</CardSubtitle>
			        </CardBody>
			      </Card>
			   </div>
	      </a>
	  );

}

function RenderAggSection({news}) {
	//console.log(news);
	return(
		<div>	
			<Row>
				{news.map(item=>{
					return(
					<NewsAtom news={item}/>)
				})}
			</Row>	
		</div>
		)
}

class Home extends Component {
  
	state={
		isOpen:false,
		news:null,
		loading:true,
		bbcnews:[],
		sportsnews:[],
		worldnews:[],
		technews:[]
	}
  toggle = () => {
	this.setState((prevState,props)=>{
		return{isOpen:!prevState.isOpen};
	})
  };
  componentDidMount(){
		axiosNew.get('/home')
			.then(res=>{
				console.log(res);
				this.setState((prevState,props)=>{
					return{news:res.data.mainnews,
						loading:false,
						bbcnews:res.data.bbcnews,
						sportsnews:res.data.sportsnews,
						worldnews:res.data.worldnews,
						cnnnews:res.data.cnnnews,
						technews:res.data.technews};
				})
				//console.log(this.state.loading,this.state.news[0]);
			}).catch(err=>{
				console.log(err);
			})
			axiosNew.get("/dashboard",{
				headers : {
				  "auth-token": localStorage.getItem("token")
				}
			  })
			  .then( (profile)=>{

				console.log(profile.data);
			  }).catch((err)=>{
				console.log(err);
			  })
  }
  
  render(){
	  let listCode=(
        <div className="Spinner" >
            <Backdrop show={true}/>
            <Spinner show={true}/>
        </div>);
	if(!this.state.loading)
	{
		listCode=(
			<div>
			  
			  <RenderJumbotron toggle={this.toggle} isOpen={this.state.isOpen} news={this.state.news[0]}/>
			  <div className="container">
					<RenderNavbar />
			  </div>

			  <div className="container">
				<div className="row">
					{/*top stories section*/}
					<div className="col-12 col-sm-9">
						<div className="row justify-content-start">
							<div className=" col-12">
								<h1>Top Stories</h1>	
							</div>	
						</div>
				
					<RenderMedialeft news={this.state.news[0]} />
					<RenderMediaright news={this.state.news[1]} />
					<RenderMedialeft news={this.state.news[2]} />
					</div>
  
				{/*right side stories section*/}
					<div className="col-12 col-sm-3">
					<RenderSideCards news={this.state.news[0]}/>
					</div>
			  	</div>
			  </div>
			  	   {/*opinion,videos and images section*/}

			{/* <div className="container">
		   		<RenderSection news1={this.state.news[0]} news2={this.state.news[1]} news3={this.state.news[3]}/>
	   		</div> */}

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>World </h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.worldnews} />
			</div>

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Technology </h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.technews} />
			</div> 

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Sports</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderSection news={this.state.sportsnews} />
			</div>

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Top News From BBC</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderAggSection news={this.state.bbcnews} />
			</div>

			<div className='container' style={{marginBottom:'8%'}}>
				<h1 style={{color:'steelblue'}}>Top News From CNN</h1>
				<hr color='black'/>
			</div>
			<div className='container' style={{marginTop:'2%'}}>
				<RenderAggSection news={this.state.cnnnews} />
			</div>
  
			
		  </div>
		);
	}
	  return(
		  <div>
			  {listCode}
		  </div>
	  );
	// return (
	// 	//main div start
	//   <div>
	// 	{/*homepage image jumbotron*/}
	// 	<RenderJumbotron toggle={this.toggle} isOpen={this.state.isOpen} news={this.props.news}/>
  
	// 	{/*navbar */}

  
  

  
  

  
  
	//    {/*politics main story and side stories section*/}

  
	//   </div>
  
	// );
  }
  
}

export default Home;