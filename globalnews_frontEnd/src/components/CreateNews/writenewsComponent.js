import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { Modal, ModalHeader, ModalBody,  Card, CardImg, CardText, CardBody,Button, Breadcrumb, BreadcrumbItem,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import "../../css/writenews.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../css/commentForm.css';
import '../../css/newsdetail.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
import RenderNavbar from "../UI/NavBarComponent";

export default class TextEditor extends Component {




  state = {
    editorState: EditorState.createEmpty(),
    title: "",
    subheader: "",
    headerImage : "../assets/images/news1.jpg",
    thumbnail : "../assets/images/news0.jpg",
    tag: "",
    category: "",
    reporterID: "",
    isModalOpen : false,
    headerPic:'',
    authorImage: '',
    authorName:'', 
    dropdownOpen:false 
  };


  toggle = () => {
    this.setState((prevState)=>{
      return({dropdownOpen:!prevState.dropdownOpen})
    })

  }

  changeHeaderPic=(event)=>{
    this.setState({
      headerPic:event.target.files[0]
    })
  }


  onSubmit(event){
    event.preventDefault();

    const formData= new FormData();

    formData.append("headerPic",this.state.headerPic)

    axios.post(`http://localhost:3000/upload/${this.state.id}`,formData)
    
    .then( (res)=>{
    console.log(res)
     } 
    ).catch(error=>{
      console.log(error)
    })


  }




  toggleModal = (e) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  componentDidMount(){ 
    console.log("request send");
    axios.get("http://localhost:3000/dashboard",{
      headers : {
        "auth-token": localStorage.getItem("token")
      }
    })
    .then( (res)=>{
      this.setState({
        reporterID:res.data.id,
        authorImage:res.data.profilePic,
        authorName:res.data.fullName + " " + res.data.lastName,
        // fullName: res.data.fullName,
        // email: res.data.email

      })
        console.log(res.data)
        console.log(res.data.id);
    }).catch(()=>{
      window.location = "/signin"
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  submitNews = (e) => {
    const { editorState } = this.state;
      console.log("Database inpyt is-");
      console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));


      const formData= new FormData();

      formData.append("headerPic",this.state.headerPic)
      formData.append("title",this.state.title)
      formData.append("subheader",this.state.subheader)
      formData.append("body",draftToHtml(convertToRaw(editorState.getCurrentContent())))
      formData.append("category",this.state.category)
      formData.append("tag",this.state.tag)
      formData.append("date",new Date().toISOString)
      formData.append("reporterID",this.state.reporterID)
      formData.append("headerImage",this.state.headerImage)
      formData.append("thumbnail",this.state.thumbnail)
      
    

      axios.post("http://localhost:3000/writenews", formData)
      .then((res) => {
          console.log("After post");
          console.log(res.data);
      })
      .catch((err) => {
          console.log(err);
      })
    }
    DropdownChangeHandler = (event) => {
      //console.log(event.currentTarget.textContent)
      this.setState({category:event.currentTarget.textContent})
      
    };

    myChangeHandler = (event) => {
      let fn = event.target.name;
      let fv = event.target.value;

      console.log("Testing");
      console.log(fn,":",fv);
      
      
      this.setState({
        [fn]: fv,
      });
    }

    confirmDialog = (e) => {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to submit?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.submitNews()
          },
          {
            label: 'No',
            onClick: () => null
          }
        ]
      })
    }

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    

    const news = {
      title : this.state.title,
      headerPic : this.state.headerPic,
      subheader : this.state.subheader,
      body : draftToHtml(convertToRaw(editorState.getCurrentContent())),
      category :this.state.category,
      tag: this.state.tag,
      date : new Date().toISOString,
      reporterID : this.state.reporterID,
      reportername: this.state.authorName,
  }

  console.log("HeaderPic log---");
  console.log(news.headerPic);

  console.log("AuthorImage log---");
  console.log(this.state.authorImage);

  console.log("Authorname log---");
  console.log(this.state.authorName);
    return (
      <div>
        <RenderNavbar/>
      <div className="row">
        
           <div className="col-md-4">
              <form id="headers">

              <div className="form-group" >
               
                  <input  type="file" placeholder="Upload Image"
                  fileName="headerPic"
                  onChange={this.changeHeaderPic}
                  
                  className="form-control-file"
                  />

              </div>


                <h3 className="col-md-12">Title</h3>
                <textarea className="col-md-12 textfont" rows="5" name="title" onChange={this.myChangeHandler}></textarea>

                <h3 className="col-md-12">Sub-Header</h3>
                <textarea className="col-md-12 textfont" rows="3" name="subheader" onChange={this.myChangeHandler}></textarea>

                {/* <h3 className="col-md-12">Category</h3>
                <textarea className="col-md-12 textfont" name="category" onChange={this.myChangeHandler}></textarea> */}


                <h3 className="col-md-12" >Tag</h3>
                <textarea className="col-md-12 textfont" name="tag" onChange={this.myChangeHandler}></textarea>

                <Dropdown size="lg" direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                        {this.state.category?this.state.category:"Category"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.DropdownChangeHandler}>Politics</DropdownItem>
                        <DropdownItem onClick={this.DropdownChangeHandler}>International</DropdownItem>
                        <DropdownItem onClick={this.DropdownChangeHandler}>Technology</DropdownItem>
                        <DropdownItem onClick={this.DropdownChangeHandler}>Sports</DropdownItem>
                        <DropdownItem onClick={this.DropdownChangeHandler}>Op-Ed</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                <Button className=" col-md-12 btn-lg btn-warning submitButton"
                        onClick = {this.toggleModal} > Preview </Button>

                <Button className=" col-md-12 btn-lg btn-success submitButton"
                        onClick = {this.confirmDialog} > Submit </Button>
              </form>

              <Modal size="xl" className="modalwidth" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Preview</ModalHeader>
                    <ModalBody>
                    <div>
                      <Card>
                          <h3>{news.title}</h3>
                          <CardImg className="heading"  top  src={process.env.PUBLIC_URL + '/assets/writeNews/'+ news.headerPic.name} alt={news.title} />
                          <CardBody>
                            {/*<CardTitle>{news.name}</CardTitle>*/}
                            <CardText className="wordwrap">
                                <div>
                                    <span>
                                      <img align="left" className="authorImage" src={process.env.PUBLIC_URL + '/assets/uploads/'+ this.state.authorImage} alt="AuthorImage"/>
                                    </span>
                                  
                                  <div className="authorInfo">
                                      {this.state.authorName}<br/>
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
                    </ModalBody>
               </Modal>


           </div>
           <div className="newsEditor col-md-8">
                <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
                />
           </div>

            <div className="col-md-2">
                
            </div>
      </div>
      </div>
    );
  }
}