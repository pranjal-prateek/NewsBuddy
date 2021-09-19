import React, { Component } from 'react'
import Spinner from './Spinner';
import Newsitem from './Newsitem'

export class News extends Component {
    
    constructor(){
        super();
        // console.log("hello sexy i am a constructor from news");
        this.state={
            articles:[],
            loading:false,
            page:1,


        }
    }
    async componentDidMount(){
    // console.log("cdm");
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=42f09ac2a50e43ab8a4dccd0e485e70f&page=1&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles,totalArticles:parsedData.totalResults});

    }
    handleprevious=async()=>{
console.log("previous");
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=42f09ac2a50e43ab8a4dccd0e485e70f&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({loading:false})
   
    this.setState({articles:parsedData.articles});
    this.setState({
        page:this.state.page -1,
        articles:parsedData.articles,
        loading:false
})
    }
     handlenext=async()=>{
        console.log("next");
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=42f09ac2a50e43ab8a4dccd0e485e70f&page=${this.state.page+1}pageSize=${this.props.pageSize}`;
        this.setState({loading:true})

        let data=await fetch(url);
        let parsedData=await data.json();
    this.setState({loading:false})
        
        this.setState({articles:parsedData.articles});
        this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
            loading:false
        })
    }
    render() {
      console.log("render");
        return (
            <>
            <div className="container my-3">
            <h1 className="text-center">NewsBuddy -Top headline</h1>
            {this.state.loading&&<Spinner/>}
                
            <div className="row">
            {this.state.articles.map((element)=>{
                
                return <div className="col-md-4" key={element.url}>
                <Newsitem  title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
            })}
            </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
                </div>
           </div>
            </>
        )
    }
}

export default News
