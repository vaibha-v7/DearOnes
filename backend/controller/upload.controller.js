const ImageKit = require("imagekit");
const sharp = require("sharp");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file provided" });
        }

        const file = req.file;

        // Compress the image using sharp
        const compressedBuffer = await sharp(file.buffer)
            .resize({ width: 1000, withoutEnlargement: true }) // resize to a max width
            .webp({ quality: 80 }) // compress to webp format
            .toBuffer();

        const fileName = file.originalname ? file.originalname.split('.')[0] + '.webp' : 'image.webp';

        imagekit.upload({
            file: compressedBuffer.toString("base64"),
            fileName: fileName,
            folder: "DearOnes"
        }, function(error, result) {
            if (error) {
                console.error("ImageKit Upload Error:", error);
                return res.status(500).json({ message: "Failed to upload image", error });
            }
            res.status(200).json({ 
                message: "Image uploaded successfully", 
                url: result.url,
                fileId: result.fileId 
            });
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
