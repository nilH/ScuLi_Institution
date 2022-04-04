import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import ModalWrapper from "../../../app/common/modals/ModalWrapper";
import EditAcademicIntegrityPolicyModalContent from "./EditAcademicIntegrityPolicyModalContent";
import EditEndUserAgreementPolicyModalContent from "./EditEndUserAgreementPolicyModalContent";
import EditLogoModalContent from "./EditInstitutionLogoModalContent";
import EditCoverModalContent from "./EditCoverModalContent";

export default function EditSettingsModal({ usecase, data }) {
  const dispatch = useDispatch();
  const title =
    usecase === "academicintegrity"
      ? "Academic Integrity Agreement"
      : usecase === "enduseragreement"
      ? "End-User Agreement"
      : usecase === "instlogo"
      ? "Institution Logo"
      : usecase === "instcover"
      ? "Institution Cover Photo"
      : "default placeholder";

  return (
    <ModalWrapper
      centered={false}
      className={"edit-settings-modal"}
      header={title}
      size="large"
    >
      <Modal.Header>Edit {title}</Modal.Header>

      {usecase === "instlogo" && <EditLogoModalContent startWith={data} />}
      {usecase === "instcover" && <EditCoverModalContent startWith={data} />}
      {usecase === "academicintegrity" && (
        <EditAcademicIntegrityPolicyModalContent startWith={data} />
      )}
      {usecase === "enduseragreement" && (
        <EditEndUserAgreementPolicyModalContent startWith={data} />
      )}
      <Modal.Actions>
        <Button
          onClick={(e) =>
            dispatch({
              event: e.type,
              name: "onClick",
              type: "CLOSE_MODAL",
            })
          }
          positive
        >
          Close
        </Button>
      </Modal.Actions>
    </ModalWrapper>
  );
}
