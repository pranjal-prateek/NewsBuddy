import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    articles =  [
        {
        "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
        "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
        "publishedAt": "2020-04-27T11:41:47Z",
        "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
        "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
        "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
        "publishedAt": "2020-03-30T15:26:05Z",
        "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
        ];
    constructor(){
        super();
        console.log("hello sexy i am a constructor from news");
        this.state={
            articles:this.articles,
            loading:false

        }
    }
    async componentDidMount(){
    console.log("cdm");
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=42f09ac2a50e43ab8a4dccd0e485e70f&page=1";
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles});

    }
    handleprevious=async()=>{
console.log("previous");
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=42f09ac2a50e43ab8a4dccd0e485e70f&page=${this.state.page -1}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles});
    this.setState({
        page:this.state.page -1,
})
    }
     handlenext=async()=>{
        console.log("next");
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=42f09ac2a50e43ab8a4dccd0e485e70f&page=${this.state.page+1}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles});
        this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
        })
    }
    render() {
      console.log("render");
        return (
            <>
            <div className="container my-3">
                <h2>NewsBuddy -Top headline</h2>
                
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
