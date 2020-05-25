import React, {Component} from 'react';
import Score from './Score';

import Dropdown from 'react-dropdown';


class Avaliador extends Component {

    constructor(props) {
        super(props);


    }


    render() {
        const {funcionalidade, processo, pitch, inovacao, formacaodotime} = this.props


        return (
            <li>
                <Score quesito={'Funcionalidade'}/>
                <Score quesito={'Processo'}/>
                <Score quesito={'Pitch'}/>
                <Score quesito={'Inovação'}/>
                <Score quesito={'Formação do time'}/>
            </li>
        );
    }

}

export default Avaliador;