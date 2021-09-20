import sharp from 'sharp';
import fs from 'fs';

export default async function handleUploadToFileSystem(req: any, res: any) {
  const file = req.file;
  console.log('file', file);

  try {
    console.log('req', req);

    const path = file.path;
    const width = req.query?.width ? Number(req.query?.width) : undefined;
    const height = req.query?.height ? Number(req.query?.height) : undefined;

    if (width && height) {
      const tempPath = path + '-temp';
      fs.renameSync(path, tempPath);

      await sharp(tempPath)
        .resize(width, height, {withoutEnlargement: true})
        .toFile(path);

      fs.unlinkSync(tempPath);
    }

    res.json({
      file,
      link: path,
    });
  } catch (e) {
    try {
      fs.unlinkSync(file.path);
    } catch (e) {}
    console.log(e);
    res.status(400).json({error: e.message});
  }
}
