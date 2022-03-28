
import React,{ Component, PropTypes } from 'react';
import { Card, CardImg, CardText, CardBody,Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../css/commentForm.css';
import '../css/newsdetail.css';
import '../css/writenews.css';
import Backdrop from '../components/UI/Backdrop'
import Comments from './commentsComponent'
import Spinner from '../components/UI/Spinner'
import axios from '../axiosNew'
import {Redirect, Link} from 'react-router-dom'
import qs from 'qs'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import RenderNavbar from './UI/NavBarComponent';
import RenderNewsSection from './RenderNewsSection';


function RenderNews({news}) {
 
      if (news != null){
        return(
          <div>
            <Card>
                <CardImg className="heading"  top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+news.headerImage} alt={news.title} />
                <CardBody>
                  {/*<CardTitle>{news.name}</CardTitle>*/}
                  <CardText>
                      <div>
                          <span>
                             <img align="left" className="authorImage" src={process.env.PUBLIC_URL + '/assets/uploads/'+news.authorImage} alt="Avatar"/>
                          </span>
                        
                        <div className="authorInfo">
                            {news.authorName}<br/>
                            {news.date}
                        </div>
                        
                      </div>

                      <br/>
                      <div className="wordwrap" 
                            dangerouslySetInnerHTML={{ __html: news.body }}>
                      </div>
                    </CardText>
                </CardBody>
            </Card>
          </div>
        );
      }else{
        return(
          <div></div>
        );
      }
          
  }

  const extractNewsId = () =>{
        let url = window.location.href;
        let newsId = window.location.href.slice(url.lastIndexOf('/')+1,url.length);
        console.log(newsId);
        return newsId
  }
;
  class  NewsDetail extends Component {
      state={
        data: {
          comments : []
        },
        newsId : "",
        loading:true,
        redirect:null,
        userData:null,
        comments:null,
        showComments:true,
        tempNews : false,
        recommendedNews:null
      }
     

      async componentDidMount(){
          let newsId = extractNewsId();
          if(this.props.tempNews){
            let link = '/temp/'+newsId;
            await axios.get(link)
                  .then(res=>{
                    axios.get("/dashboard",{
                      headers : {
                        "auth-token": localStorage.getItem("token")
                      }
                    })
                    .then( (profile)=>{
                      this.setState({
                        userData:profile.data,
                        data:res.data,
                        loading:false,
                        comments : res.data.comments,
                        newsId : newsId,
                        tempNews : true,
                      })
                      console.log("Data:",this.state.userData,this.state.data)
                      console.log("STATE:",this.state)
                    }).catch((err)=>{
                      console.log(err);
                    })
  
                  }).catch(err=>{
                      console.log(err);
                  })
          }
          
          else{
            let link = '/news/'+newsId;
            await axios.get(link)
                  .then(res=>{
                    console.log("Received Data--");
                    console.log(res.data);
                    this.setState({
                      data:res.data,
                      loading:false,
                      comments : res.data.comments,
                      newsId : newsId,
                      tempNews : true,
                      recommendedNews:res.data.recommendedNews
                    })
                      console.log("Data:",this.state.userData,this.state.data)
                      console.log("STATE:",this.state)
                  })
          }
      }


      approvalBtnHandler=(event)=>{
        console.log('apprpove');
        axios.post('/approve',{
          news:this.state.data,
          approvedBy:this.state.userData.userID
        }).then(res=>{
          console.log(res.data);
          this.setState({redirect:"/pending"})
        })
      }


      rejectBtnHandler = (event) =>{
        axios.post('/reject',{
          id:this.state.data._id
        }).then(res=>{
          console.log(res.data);
          this.setState({redirect:"/pending"})
        }).catch(err=>{
          console.log(err);
        })
      }


      referBtnHandler = (event) =>{
        axios.post('/refer',{
          id:this.state.data._id
        }).then(res=>{
          console.log(res.data);
          this.setState({redirect:"/pending"})
        }).catch(err=>{
          console.log(err);
        })
      }


      suggestionBtnHandler = (event)=>{
        console.log("Suggest");        
      }


      editBtnHandler = (event)=>{
        console.log("Edit");
      }



      render(){
        console.log("In SingleNews");
        console.log(this.props.tempNews);
        console.log(this.state.newsId);
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        let code=(
          <div  >
              <Backdrop show={true}/>
              <Spinner show={true}/>
          </div>);
        if(!this.state.loading && this.props.tempNews){
        console.log("In SingleNews Temp cond.");
        console.log(this.props.tempNews);
        console.log(this.state.newsId);

          code = (
            <div className="container">
              
            <div className="row">
                <div className="col-12">
                    <h3>{this.state.data.title}</h3>
                    <hr/>
                </div>
            </div>
  
            <div className="row">
                <div  className="col-12">
                    {/* {this.renderNews(selected)} */}
                    <RenderNews news={this.state.data}/>
                </div >
                
                
                {/* <div  className="m-4 col-12">
                    <RenderComments comments={props.comments}  />
                </div> */}
               
               <div className="container" hidden={(this.props.tempNews && (this.state.userData.userRole === "sub-editor" && this.state.userData.userDesk === this.state.data.category) || this.state.userData.userRole === "editor") ? false : true }>
                  <Button color="success"id="approve" onClick={this.approvalBtnHandler.bind(this)}>Approve </Button>{' '}
                  <Button color="primary" onClick={this.suggestionBtnHandler.bind(this)}>Suggestions </Button>{' '}
                  <Button color="primary" 
                  hidden={(this.state.userData.userRole === "editor") ? true : false } 
                  onClick={this.referBtnHandler.bind(this)}
                  disabled={this.state.data.referedTo === 'editor' ? true:false}>Refer to Editor </Button>{' '}
                  <Button color="danger" onClick={this.rejectBtnHandler.bind(this)}>Reject </Button>{' '}

                </div>
                

                {/* <div hidden={!this.state.showComments} className="commentBox offset-4 col-5">
                  
                   <CommentBox  com={this.state.comments} newsId={extractNewsId()}/>
                </div> */}
                <div className="container" hidden={this.state.userData.userID === this.state.data.reporterID ? true : false }>
                  
                  <Button color="warning" size='lg' block onClick={this.editBtnHandler}>Edit </Button>{' '}
                  
                </div>
  
            </div>
          </div>
          );
        }

        else if(!this.state.loading){
          code = (
            <div className="container">
              
            <div className="row">
                <div className="col-12">
                    <h3>{this.state.data.title}</h3>
                    <hr/>
                </div>
            </div>
  
            <div className="row">
                <div  className="col-12">
                    {/* {this.renderNews(selected)} */}
                    <RenderNews news={this.state.data}/>
                </div >

                <div className='container' style={{marginBottom:'8%'}}>
                  <hr color='black'/>
				          <h1 style={{color:'steelblue'}}>News You May LIke</h1>
				          
              </div>
              <div className='container' style={{marginTop:'2%'}}>
                <RenderNewsSection news={this.state.recommendedNews} />
              </div>
                
                
                {/* <div  className="m-4 col-12">
                    <RenderComments comments={props.comments}  />
                </div> */}
                

                {/* <div hidden={!this.state.showComments} className="commentBox offset-4 col-5">
                  
                   <CommentBox  com={this.state.comments} newsId={extractNewsId()}/>
                </div> */}
  
            </div>
          </div>
          );
        }
        return (
          <div>
            <RenderNavbar/>
            {code}
            <Comments comments={this.state.data.comments} newsId={this.state.newsId} tempNews={this.props.tempNews}/>
          </div>
        );
      }
      
  }

 


export default NewsDetail;