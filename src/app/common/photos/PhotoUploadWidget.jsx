import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Grid, Image, Message } from "semantic-ui-react";

import {
  setFile,
} from "../../store/storageReducer";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

export default function PhotoUploadWidget({ usecase}) {
  const dispatch = useDispatch();
  const { file } = useSelector((state) => state.storage);

  if (!usecase) {
    return <Message icon="info" content="Something went wrong" />;
  }

  const useSetFile = (files) => {
    if (!files || files.length === 0) {
      console.log(" ~~ photo widget dropzone got NULL FILES LIST dropped in");
      dispatch(setFile(null));
    } else {
      const file = files[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      console.log("  PHOTO UPLOAD WIDGET: ");
      console.log(file);
      dispatch(setFile({ file, usecase }));
    }
  };


  return (
    <>
      <Grid>
        <Grid.Row>
          <PhotoWidgetDropzone setFile={useSetFile} />
        </Grid.Row>
        <Grid.Row>
          {file && (
            <Image
              size="medium"
              src={file.preview}
              label={{
                as: "a",
                color: "teal",
                content: "Review",
                icon: "photo",
                ribbon: true,
              }}
            />
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}
