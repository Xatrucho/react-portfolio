import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: "",
            featured_image: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

        this.featuredImageRef = React.createRef();
        
    }

    componentConfig() {
        return {
            iconFileTypes: [".jpg", ".png"],
            showFileTypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeaturedImageDrop() {
        return { 
            addedfile: file => this.setState({ featured_image: file })
         };
    }

    handleRichTextEditorChange(content) {
        this.setState({ content });
    }

    buildForm() {
        let formData = new FormData();
        
        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);

        if (this.state.featured_image) {
          formData.append(
            "portfolio_blog[feature_imgage]",
            this.state.featured_image
          );
        }

        return formData;
    }

    handleSubmit(event) {
        axios.post(
            "https://chocolateswordfish.devcamp.space/portfolio/portfolio_blogs", 
            this.buildForm(), 
        { withCredentials: true }
        )
        .then(res => {
            if (this.state.featured_image) {
                this.featuredImageRef.current.dropzone.removeAllFiles()
                    };
            
            this.setState({
                title: "",
                blog_status: "",
                content: "",
                featured_image: ""
            });

            this.props.handleSuccessfulFormSubmission(
                res.data.portfolio_blog
            );
        })
        .catch(error => {
            console.log("handleSubmit for blog error", error);
        });

        event.preventDefault();
    }

    handleChange(event) {
       this.setState({
           [event.target.name]: event.target.value
       });
    }
    render() {
        return (
           <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
           <div className="two-Column">
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
            </div>

            <div className="one-column">
                <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange}    
                />
            </div>

            <div className="image-uploaders">
              <DropzoneComponent 
              ref={this.featuredImageRef}
                config={this.componentConfig()} 
                djsConfig={this.djsConfig()}
                eventHandler={this.handleFeaturedImageDrop()}
            >
                <div className="dz-message">Featured image</div>
              </DropzoneComponent>
            </div>


               <button className="btn">save</button>
           </form>
        );
    }
}