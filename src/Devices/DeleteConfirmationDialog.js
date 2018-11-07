import React, { Component } from 'react';

class DeleteConfirmationDialog extends Component {

  render() {
    return (
      <div className='mdc-dialog'
           role='alertdialog'
           aria-modal='true'
           aria-labelledby='my-dialog-title'
           aria-describedby='my-dialog-content'>
        <div className='mdc-dialog__container'>
          <div className='mdc-dialog__surface'>
            <h2 className='mdc-dialog__title' id='my-dialog-title'>Delete device?</h2>
            <div className='mdc-dialog__content' id='my-dialog-content'>
              This device will disappear from your list and will not be available anymore.
            </div>
            <footer className='mdc-dialog__actions'>
              <button type='button' className='mdc-button mdc-dialog__button' data-mdc-dialog-action='close'>Cancel
              </button>
              <button type='button' className='mdc-button mdc-dialog__button mdc-dialog__button--default'
                      data-mdc-dialog-action='accept'>Delete
              </button>
            </footer>
          </div>
        </div>
        <div className='mdc-dialog__scrim'/>
      </div>
    )
  }
}

export default DeleteConfirmationDialog;
