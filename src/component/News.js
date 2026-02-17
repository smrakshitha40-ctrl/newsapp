import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: data.data || [],
      loading: false,
      page: 1
    }
  }

  fetchNews = async (page = 1) => {
    const pageSize = 9;
    const url = `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=14071ddfa9bb4502873f3748d6fc42ec`;
    try {
      this.setState({ loading: true });
      const res = await fetch(url);
      const data = await res.json();
      console.log('API Response:', data);
      if (data.status === 'error') {
        console.error('API Error:', data.message);
        this.setState({ loading: false, articles: [] });
      } else {
        console.log('Articles fetched:', data.articles ? data.articles.length : 0);
        this.setState({ articles: data.articles || [], loading: false, page });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      this.setState({ loading: false, articles: [] });
    }
  }

  async componentDidMount(){
    this.fetchNews(1);
  }

  previousPage = async () => {
    const prevPage = Math.max(1, this.state.page - 1);
    await this.fetchNews(prevPage);
  }

  nextPage = async () => {
    const nextPage = this.state.page + 1;
    await this.fetchNews(nextPage);
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center mb-5"> My News Top Headlines</h1>
        {this.state.loading && <p className="text-center">Loading...</p>}
        {!this.state.loading && this.state.articles.length === 0 && <p className="text-center text-danger">No articles found. Check console for errors.</p>}
        <div className="row g-4">
          {this.state.articles && this.state.articles.map(element=> {
            return (
              <div className="col-md-4 d-flex" key={element.url}>
                <Newsitem
                  title={element.title?element.title.slice(0,50):''}
                  description={element.description?element.description.slice(0,100):''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.readMoreUrl}
                />
              </div>
            )
          })}
        </div>

        <div className="d-flex justify-content-center gap-3 mt-5">
          <button disabled={this.state.page <= 1} type="button" onClick={this.previousPage} className="btn btn-dark">&larr; Previous</button>
          <button type="button" onClick={this.nextPage} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}
