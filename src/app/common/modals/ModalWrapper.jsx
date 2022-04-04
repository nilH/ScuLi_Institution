import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { closeModal } from './modalReducer';

export default function ModalWrapper({
  children,
  header,
  initValue,
  handleClose,
  handleSubmit,
  props
}) {
  const dispatch = useDispatch();

  function defaultContent() {
    return (
      <>
        <Modal.Header>
          {'Confirm'}
        </Modal.Header>
        <Modal.Content>
          <p>Press OK to continue</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            inverted
            content='OK'
            // onClick={dispatch(handleSubmit)}
            onClick={dispatch(closeModal())}
          />
        </Modal.Actions>
      </>
    );
  }
  return (
    <Modal open={true}
      className={props?.className ?? 'edit-settings-modal'}
      size={props?.size ?? 'large'}
      onClose={(res) => dispatch(closeModal({ res }))}
      {...props}>
      {children || defaultContent()}
    </Modal>
  );
}
