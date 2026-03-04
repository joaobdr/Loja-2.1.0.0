import React from 'react'
import style from './InputData.module.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const InputData = ({validade, setValidade}) => {



    return (
        <div className={style.input_data}>
            <label htmlFor="data-de-validade">Validade do cupom:</label>
            <DatePicker
                    id='data-de-validade'
                    selected={validade}
                    onChange={(date) => setValidade(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Validade do cupom"
                />
        </div>
    )
}

export default InputData