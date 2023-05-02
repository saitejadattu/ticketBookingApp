import React from 'react'
import { useSelector } from 'react-redux';
import { closeModal } from '../Redux/ShowData';
import { useDispatch } from 'react-redux';

export default function Modal(props) {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.ShowDetails.modal);

    // Closing the modal block 

    const close = () => {
        dispatch(closeModal());
    }
    return (

        <div className={modal.class}>
            
            <div className="modal-content">

                <div className='modal-title'>
                    <span className='title-text'>{props.title}</span>
                    <span className="close" onClick={close}>&times;</span>
                </div>

                <div className='modal-body'>
                    <p>{props.body}</p>
                </div>
                <div>
                    <button className='btn' onClick={close}>OK</button>
                </div>

            </div>

        </div>
    )
}

