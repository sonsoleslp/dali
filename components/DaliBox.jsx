import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import {BOX_TYPES} from '../constants';

export default class DaliBox extends Component{
    render(){
        let borderSize = 2;
        let cornerSize = 15;

        let box = this.props.box;

        let content = (<div style={{width: '100%', height: '100%'}} dangerouslySetInnerHTML={{__html: box.content}}></div>);
        let overlay = (
            <div style={{visibility: ((this.props.isSelected && box.type !== BOX_TYPES.SORTABLE) ? 'visible' : 'hidden')}}>
                <div style={{position: 'absolute', width: '100%', height: '100%', border: (borderSize + "px dashed black"), boxSizing: 'border-box'}}></div>
                <div style={{position: 'absolute', left:  -cornerSize/2, top: -cornerSize/2, width: cornerSize, height: cornerSize, backgroundColor: 'lightgray'}}></div>
                <div style={{position: 'absolute', right: -cornerSize/2, top: -cornerSize/2, width: cornerSize, height: cornerSize, backgroundColor: 'lightgray'}}></div>
                <div style={{position: 'absolute', left:  -cornerSize/2, bottom: -cornerSize/2, width: cornerSize, height: cornerSize, backgroundColor: 'lightgray'}}></div>
                <div style={{position: 'absolute', right: -cornerSize/2, bottom: -cornerSize/2, width: cornerSize, height: cornerSize, backgroundColor: 'lightgray'}}></div>
            </div>);
        let position;
        switch(box.type){
            case BOX_TYPES.NORMAL:
                position = 'absolute';
                break;
            case BOX_TYPES.INNER_SORTABLE:
                position = 'relative';
                break;
        }

        return (<div onClick={e => this.handleBoxSelection(this.props.id)}
                     style={{position: position,
                            left: box.position.x,
                            top: box.position.y,
                            width: box.width,
                            height: box.height,
                            touchAction: 'none',
                            msTouchAction: 'none'}}>
            {overlay}
            {content}
        </div>);
    }

    handleBoxSelection(id){
        this.props.onBoxSelected(id);
    }

    componentDidMount() {
        if(this.props.box.type !== BOX_TYPES.SORTABLE) {
            interact(ReactDOM.findDOMNode(this))
                .draggable({
                    enabled: this.props.box.draggable,
                    restrict: {
                        restriction: "parent",
                        endOnly: true,
                        elementRect: {top: 0, left: 0, bottom: 1, right: 1}
                    },
                    autoScroll: true,
                    onmove: (event) => {
                        var target = event.target;

                        target.style.left = (parseInt(target.style.left) || 0) + event.dx + 'px';
                        target.style.top = (parseInt(target.style.top) || 0) + event.dy + 'px';
                    },
                    onend: (event) => {
                        this.props.onBoxMoved(this.props.id, parseInt(event.target.style.left), parseInt(event.target.style.top));
                    }
                })
                .resizable({
                    enabled: this.props.box.resizable,
                    edges: {left: true, right: true, bottom: true, top: true},
                    onmove: (event) => {
                        var target = event.target;
                        target.style.left = (parseInt(target.style.left) || 0);
                        target.style.top = (parseInt(target.style.top) || 0);

                        // update the element's style
                        target.style.width = event.rect.width + 'px';
                        target.style.height = event.rect.height + 'px';
                    },
                    onend: (event) => {
                        this.props.onBoxResized(this.props.id, parseInt(event.target.style.width), parseInt(event.target.style.height));
                    }
                });
        }
    }

    /*
    componentWillUnmount() {
        if(this.props.box.type !== 'sortable') {
            this.interactable.unset();
            this.interactable = null;
        }
    }
    */
}