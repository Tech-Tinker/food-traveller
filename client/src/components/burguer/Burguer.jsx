import React, { useState } from 'react';
import './Burguer.css';
import Menu from '../../assets/Menu.svg';

const Burguer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <img
        src={Menu}
        alt='Menu'
        className='menu-icon'
        onClick={openModal}
      />

      {isOpen && (
        <div className='modal' tabIndex='-1'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='modalVerticallyCenteredLabel'>
                  Modal title
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={closeModal}
                ></button>
              </div>
              <div className='modal-body'>
                {/* Contenido del modal */}
                <p>Contenido del modal</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <button type='button' className='btn btn-primary'>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Burguer;
