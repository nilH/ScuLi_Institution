import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import { uploadCover } from "../settingsAction";

export default function EditCoverModalContent() {
  const { file } = useSelector((state) => state.storage);
  const dispatch = useDispatch();
  return (
    <>
      <Modal.Content image scrolling>
        <PhotoUploadWidget usecase="instcover" />
      </Modal.Content>
      <Modal.Actions>
        <Button.Group>
          <Button
            color="teal"
            content="Update"
            onClick={() => dispatch(uploadCover(file))}
          />
        </Button.Group>
      </Modal.Actions>
    </>
  );
}
