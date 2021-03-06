import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DaliBox from '../components/DaliBox';

export default class DaliBoxSortable extends Component{
    render(){
        return(
        <div>
            <div ref="sortableContainer">
                {this.props.box.children.map((id, index)=>{
                    let box = this.props.boxes[id];
                    let isSelected = (id === this.props.boxSelected);
                    return (<div key={index} style={{width: '100%', border: '1px solid black', boxSizing: 'border-box'}}>
                        <DaliBox box={box} id={id}
                                 isSelected={isSelected}
                                 onBoxSelected={this.props.onBoxSelected}
                                 onBoxMoved={this.props.onBoxMoved}
                                 onBoxResized={this.props.onBoxResized} />
                        <i className="fa fa-bars fa-2x drag-handle"></i>
                    </div>);
                })}
            </div>
            <Button style={{display: 'block', margin: 'auto'}} onClick={e => this.props.onVisibilityToggled(this.props.id, true, true)}>
                <i className="fa fa-plus-circle fa-5x"></i>
            </Button>
        </div>
        );
    }

    componentDidMount(){
        let sortable = jQuery(this.refs.sortableContainer);
        sortable.sortable({ handle: '.drag-handle' });
    }
}