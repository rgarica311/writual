import React, { Component } from 'react'
import './StoryCard.css'
import WritualContext from '../../WritualContext'

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frameworks: [
        {
          name: `Hero's Journey IMG`,
          desc: 'Lorem ipsum dolor amet cornhole bespoke fingerstache, cliche squid put a bird on it kitsch thundercats occupy pinterest locavore fam ugh.'
        },

        {
          name: 'Truby 12 Steps IMG',
          desc: 'Pop-up normcore shoreditch literally, edison bulb food truck chartreuse.'
        },

        {
          name: 'McKee Story IMG',
          desc: 'Neutra tbh shoreditch woke prism pinterest, meggings iPhone cray pok pok try-hard bushwick hexagon schlitz.'
        }
      ],

      steps: [],
      history: props.history
    }
  }


  async componentDidMount() {
    try {
      let response = await fetch('https://blooming-garden-38714.herokuapp.com/frameworks')
      if(!response.ok){
        throw new Error(response.status)
      } else {
        this.setState({
          frameworks: await response.json()

        })
      }
    } catch(error) {
      console.error('error', error)
    }


  }

  render(){
    return (
      <WritualContext.Consumer>
      {(context) => (
      <>
      <h1 className='storyH1'>Pick Story Framework</h1>
      <div className='frameWorksContainer'>
        <div className='frameWorkCard'>
          <div className='cardTop'>
            {this.state.frameworks[0].name}
          </div>
          <div style={{backgroundImage: `url(${this.state.frameworks[0].photo})`}} className='cardImg'></div>
          <div className='cardBottom'>
            {this.state.frameworks[0].overview}
          </div>
          <button id='hero' onClick={e => context.getSteps(e, this.state.history)} className='download'>download outline</button>
        </div>

        <div className='frameWorkCard'>
          <div className='cardTop'>
            {this.state.frameworks[1].name}
          </div>
          <div style={{backgroundImage: `url(${this.state.frameworks[1].photo})`}} className='cardImg'></div>
          <div className='cardBottom'>
            {this.state.frameworks[1].overview}
          </div>
          <button id='anatomy' onClick={e => context.getSteps(e, this.state.history)} className='download'>download outline</button>

        </div>

        <div className='frameWorkCard'>
          <div className='cardTop'>
            {this.state.frameworks[2].name}
          </div>
          <div style={{backgroundImage: `url(${this.state.frameworks[2].photo})`}} className='cardImg'></div>
          <div className='cardBottom'>
            {this.state.frameworks[2].overview}
          </div>
          <button id='cat' onClick={e => context.getSteps(e, this.state.history)} className='download'>download outline</button>
        </div>
      </div>
      </>
      )}
    </WritualContext.Consumer>
    );
  }
}
