import { buildSuccessResponse, buildErrorResponse } from '../../utils/response.builder.js'
import { v2 as cloudinary } from 'cloudinary';


export function handleStorageUpload(req, res) {
  try {
    return res.status(201).json(buildSuccessResponse('file uploaded'));
  }
  catch (error) {
    return res.status(500).json(buildErrorResponse(error));
  }
}

export async function handleCloudStorage(req, res) {
  try {
    if (req.file) {
      let base64Image = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto'
      });
      return res.status(201).json(buildSuccessResponse(result));
    }
    return res.status(400).json(buildErrorResponse("error while uploading the file"));
  }
  catch (error) {
    return res.status(500).json(buildErrorResponse(error));
  }
}