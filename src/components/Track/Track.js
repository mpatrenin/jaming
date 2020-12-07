import React from 'react';
import './Track.css'

export class Track extends React.Component {
    constructor(props){
        super(props);
        this.Addtrack = this.Addtrack.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }
    
    renderAction() {
        if (this.props.isRemoval){
            return <button className="Track-action" onClick={this.onRemove}>-</button>
        } else {
            return <button className="Track-action" onClick={this.Addtrack}>+</button>
        }
    }

    Addtrack(){
        this.props.onAdd(this.props.track)
    }

    onRemove(){
        this.props.onRemove(this.props.track)
    }
    
    render(){
        // console.log('I was triggered during render in track.js')

        return(
            <div className="Track">
            <div className="Track-information">
              <h3>{this.props.track.name}</h3>
              <p>{this.props.track.artist} | {this.props.track.name}</p>
            </div>
            {this.renderAction()}
            </div>
        )
    }
}

