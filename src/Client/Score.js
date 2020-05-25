import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './App.css';

import Dropdown from 'react-dropdown';


class Score extends Component {

    constructor(props) {
        super(props);


    }

    onSubmit(){

    }

    onChange(event){
        console.log(event.target.value)
    }




    render() {
        return (

            <li>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{this.props.quesito}</FormLabel>
                    <RadioGroup onChange={this.onChange} row aria-label="position" name="position" defaultValue="1" >
                        <FormControlLabel
                            value="1"
                            control={<Radio color="primary"/>}
                            label="1"
                            labelPlacement="1"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio color="primary"/>}
                            label="2"
                            labelPlacement="1"
                        />
                        <FormControlLabel
                            value="3"
                            control={<Radio color="primary"/>}
                            label="3"
                            labelPlacement="1"
                        />
                        <FormControlLabel
                            value="4"
                            control={<Radio color="primary"/>}
                            label="4"
                            labelPlacement="1"
                        />
                        <FormControlLabel value="5" control={<Radio color="primary"/>} label="5"/>
                        <button className= "submitButton" onClick={this.onSubmit}>Submit</button>
                    </RadioGroup>
                </FormControl>

            </li>
        );
    }

}

export default Score;