import React, { Component } from "react";
import axios from 'axios';


export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {}
    }
  }

  componentWillMount() {
    this.getPortfolioItem();
  }

  getPortfolioItem() {
    axios.get(`https://chocolateswordfish.devcamp.space/portfolio/portfolio_items/${
      this.props.match.params.slug
    }`,
     {withCredentials: true }
     )
     .then(res => {
       this.setState({
         portfolioItem: res.data.portfolio_item
       })
    } )
     .catch(error => {
       console.log("getportfolioitem error", error);
     });
  }

  render() {
    const {
      banner_image_url,
      category,
      description,
      logo_url,
      name,
      thumb_image_url,
      url
    } = this.state.portfolioItem;

    const bannerStyles = {
      backgroundImage: "url(" + banner_image_url + ")",
      backgroundSize: "cover",
      bakgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    };

    const logostyles = {
      width: "200px"
    }

  return (
   <div className="portfolio-detail-wrapper">
     <div className="banner" style={bannerStyles}>
       <img src={logo_url} style={logostyles} />
     </div>

     <div className="portfolio-detail-description-wrapper">
      <div className="description">{description}</div>
     </div>

     <div ClassName="bottom-content-wrapper">
       <a href={url} className="site-link" target="_blank">
         visit {name}
       </a>
     </div>
   </div>
  );
}}