import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import { uploadLogo } from "../settingsAction";

export default function EditInstitutionLogoModalContent() {
  const { file } = useSelector((state) => state.storage);
  const dispatch = useDispatch();
  return (
    <>
      <Modal.Content image scrolling>
        <PhotoUploadWidget usecase="instlogo" />
      </Modal.Content>
      <Modal.Actions>
        <Button.Group>
          <Button
            color="teal"
            content="Update"
            onClick={() => dispatch(uploadLogo(file))}
          />
        </Button.Group>
      </Modal.Actions>
    </>
  );
}
