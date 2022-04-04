import cuid from 'cuid';


export function generateFileLabel(file) {
  return `$app_${cuid.slug()}`;
}

// file validators

const VALID_IMAGE_MIMETYPES = ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'image/webp'];
const VALID_PDF_MIMETYPES = ['application/pdf'];
const MAX_IMAGE_SIZE_BYTES = 2097152; // 2 MB
const MAX_PDF_SIZE_BYTES = 1048576; // 1 MB

export function validateImageFile({ size, type }) {
  const errors = {};
  if (!VALID_IMAGE_MIMETYPES.includes(type)) {
    errors['ftype/img'] =
      'The file must be a valid image file (jpeg/png/bmp)';
  }
  if (size >= MAX_IMAGE_SIZE_BYTES) {
    errors['fsize/max2mb'] = 'The file must be smaller than 2 MB';
  }
  return errors;
}
export function validatePdfFile({ size, type }) {
  const errors = {};
  if (!VALID_PDF_MIMETYPES.includes(type)) {
    errors['ftype/pdf'] =
      'The file must be a valid pdf file';
  }
  if (size >= MAX_PDF_SIZE_BYTES) {
    errors['fsize/max2mb'] = 'The file must be smaller than 2 MB';
  }
  return errors;
}
