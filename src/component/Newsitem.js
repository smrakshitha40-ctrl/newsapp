import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="card h-100 shadow-sm" style={{width: "100%"}}>
        <img src={imageUrl} className="card-img-top" alt="News" style={{height: "200px", objectFit: "cover"}}></img>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text flex-grow-1">{description}</p>
          <a href={newsUrl || '/newsdetails'} className="btn btn-primary mt-3" target="_blank" rel="noreferrer">Read More</a>
        </div>
      </div>
    )
  }
}
