const VALID_IMAGE_MIMETYPES = ['image/jpeg', 'image/png', 'image/bmp'];
const VALID_PDF_MIMETYPES = ['application/pdf'];
const MAX_IMAGE_SIZE_BYTES = 2097152; // 2 MB
const MAX_PDF_SIZE_BYTES = 1048576; // 1 MB

export function validateImageFile({ size, type }) {
  const errors = {};
  if (!VALID_IMAGE_MIMETYPES.includes(type)) {
    errors['imagefiletype'] =
      'The file must be a valid image file (jpeg/png/bmp)';
  }
  if (size >= MAX_IMAGE_SIZE_BYTES) {
    errors['imagefilesize'] = 'The file must be smaller than 2 MB';
  }
  return errors;
}

export function validatePdfFile({ size, type }) {
  const errors = {};
  if (!VALID_PDF_MIMETYPES.includes(type)) {
    errors['imagefiletype'] =
      'The file must be a valid image file (jpeg/png/bmp)';
  }
  if (size >= MAX_PDF_SIZE_BYTES) {
    errors['imagefilesize'] = 'The file must be smaller than 2 MB';
  }
  return errors;
}
