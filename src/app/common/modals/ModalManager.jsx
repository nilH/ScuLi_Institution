import React from 'react';
import { useSelector } from 'react-redux';
import EditSettingsModal from '../../../features/institution-settings/edit-settings-modal/EditSettingsModal';
import SendEmailModal from "../../../features/reported-users/SendEmailModal";

export default function ModalManager() {
  const modalLookup = {
    EditSettingsModal,
    SendEmailModal,
  };
  const { modalCategory, modalProps } = useSelector((state) => state.modal);
  let renderedModal = null;
  if (modalCategory) {
    const ModalComponent = modalLookup[modalCategory];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
