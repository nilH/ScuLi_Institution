import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

export default function PhotoWidgetDropzone({ setFile }) {
  const dropzoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    paddingLeft: '6px',
    paddingRight: '6px',
    textAlign: 'center',
    minWidth: '65%'
  };

  const dropzoneActive = {
    border: 'dashed 3px green',
  };

  const onDrop = useCallback(setFile, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles}
    // label={{
    //   as: 'a',
    //   color: 'teal',
    //   content: 'Pick a photo',
    //   icon: 'photo',
    //   ribbon: true
    // }}
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='large' />
      <Header style={{ marginBottom: '1rem' }}
        content='Click or drop a file here' />
    </div>
  );
}
