const fs = require("fs");
const path = require("path");
const pdf2img = require("pdf-img-convert");
const mammoth = require("mammoth");
const sharp = require("sharp");

class BookCoverExtractor {
  /**
   * Extract cover image from a book file
   * @param {string} filePath - Path to the book file
   * @param {string} outputDir - Directory to save extracted cover
   * @returns {Promise<string|null>} Path to extracted cover image
   */
  static async extractCover(filePath, outputDir) {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
      case ".pdf":
        return this.extractPDFCover(filePath, outputDir);
      case ".docx":
        return this.extractDOCXCover(filePath, outputDir);
      default:
        throw new Error("Unsupported file type for cover extraction");
    }
  }

  /**
   * Extract cover from PDF
   * @param {string} filePath - Path to PDF
   * @param {string} outputDir - Output directory for cover
   * @returns {Promise<string|null>} Cover image path
   */
  static async extractPDFCover(filePath, outputDir) {
    try {
      // Convert first page of PDF to image
      const pageImages = await pdf2img.convert(filePath, {
        pageNumbers: [1],
        base64: false,
      });

      if (!pageImages || pageImages.length === 0) return null;

      // Generate unique filename
      const coverFilename = `cover-${Date.now()}.png`;
      const coverPath = path.join(outputDir, coverFilename);

      // Save the first page image
      await fs.promises.writeFile(coverPath, pageImages[0]);

      // Resize and optimize the image
      await sharp(coverPath)
        .resize(300, 450, { fit: "cover" }) // Standard book cover dimensions
        .toFile(path.join(outputDir, `optimized-${coverFilename}`));

      return coverPath;
    } catch (error) {
      console.error("PDF cover extraction error:", error);
      return null;
    }
  }

  /**
   * Extract cover from DOCX
   * @param {string} filePath - Path to DOCX
   * @param {string} outputDir - Output directory for cover
   * @returns {Promise<string|null>} Cover image path
   */
  static async extractDOCXCover(filePath, outputDir) {
    try {
      // Extract embedded images from first few paragraphs
      const result = await mammoth.extractRawText({ path: filePath });
      const images = await mammoth.images({ path: filePath });

      // Prioritize first image as potential cover
      if (images.length > 0) {
        const firstImage = images[0];
        const coverFilename = `docx-cover-${Date.now()}.png`;
        const coverPath = path.join(outputDir, coverFilename);

        // Save the image
        await fs.promises.writeFile(coverPath, firstImage.buffer);

        // Resize and optimize
        await sharp(coverPath)
          .resize(300, 450, { fit: "cover" })
          .toFile(path.join(outputDir, `optimized-${coverFilename}`));

        return coverPath;
      }

      return null;
    } catch (error) {
      console.error("DOCX cover extraction error:", error);
      return null;
    }
  }

  /**
   * Fallback cover generation if no image found
   * @param {string} bookName - Name of the book
   * @param {string} outputDir - Output directory
   * @returns {Promise<string>} Generated placeholder cover path
   */
  static async generatePlaceholderCover(bookName, outputDir) {
    const coverFilename = `placeholder-${Date.now()}.png`;
    const coverPath = path.join(outputDir, coverFilename);

    await sharp({
      create: {
        width: 300,
        height: 450,
        channels: 4,
        background: { r: 200, g: 200, b: 200, alpha: 1 },
      },
    })
      .composite([
        {
          input: Buffer.from(`
          <svg width="300" height="450">
            <text 
              x="50%" 
              y="50%" 
              text-anchor="middle" 
              font-size="20" 
              fill="black"
            >
              ${bookName}
            </text>
          </svg>
        `),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toFile(coverPath);

    return coverPath;
  }
}

module.exports = BookCoverExtractor;
