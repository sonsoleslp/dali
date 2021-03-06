import React, {Component} from 'react';
import DaliBox from '../components/DaliBox';
import DaliBoxSortable from '../components/DaliBoxSortable';
import DaliTitle from '../components/DaliTitle';
import {BOX_TYPES} from '../constants';

export default class DaliCanvas extends Component{
    render(){
        let titles = [];
        if(this.props.navItemSelected.id !== 0) {
            titles.push(this.props.navItemSelected.name);
            let parent = this.props.navItemSelected.parent;
            while (parent !== 0) {
                titles.push(this.props.navItems[parent].name);
                parent = this.props.navItems[parent].parent;
            }
            titles.reverse();
        }

        return(
            <div style={{backgroundColor: 'gray', height: '100%', paddingTop: '5%'}}>
                <div style={{height: '100%', backgroundColor: 'white', margin: '0px 100px 0px 100px', visibility: (this.props.showCanvas ? 'visible' : 'hidden')}}>
                    <DaliTitle titles={titles} />
                    {this.props.navItemSelected.boxes.map(id =>{
                        let box = this.props.boxes[id];
                        let isSelected = (id === this.props.boxSelected);
                        if(box.type === BOX_TYPES.NORMAL)
                            return <DaliBox key={id}
                                            id={id}
                                            box={box}
                                            isSelected={isSelected}
                                            onBoxSelected={this.props.onBoxSelected}
                                            onBoxMoved={this.props.onBoxMoved}
                                            onBoxResized={this.props.onBoxResized} />
                        else if(box.type === BOX_TYPES.SORTABLE)
                            return <DaliBoxSortable key={id}
                                                    id={id}
                                                    box={box}
                                                    onVisibilityToggled={this.props.onVisibilityToggled}
                                                    boxes={this.props.boxes}
                                                    boxSelected={this.props.boxSelected}
                                                    onBoxSelected={this.props.onBoxSelected}
                                                    onBoxMoved={this.props.onBoxMoved}
                                                    onBoxResized={this.props.onBoxResized} />
                    })}
                </div>
            </div>
        );
    }
}