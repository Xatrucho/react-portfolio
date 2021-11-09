import React, { Component } from "react";
import axios from "axios";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buildForm() {
        let formData = newFormData();
        
        formData.append("portfolio_blog[tilte]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);

        return formData;
    }

    handleSubmit(event) {
        axios.post("https://chocolatswordfish.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), )


        this.props.handleSuccessfullFormSubmission(this.state);
        event.preventDefault();
    }

    handleChange(event) {
       this.setState({
           [event.target.name]: event.target.value
       })
    }
    render() {
        return (
           <form onSubmit={this.handleSubmit}>
            <input
               type="text"
                onChange={this.handleChange} 
                name="title"
                placeholder="Blog Title"
                value={this.state.title}
            />

            <input
               type="text"
                onChange={this.handleChange} 
                name="blog_status"
                placeholder="Blog Status"
                value={this.state.blog_status}
            />  

               

               <button>save</button>
           </form>
        );
    }
}