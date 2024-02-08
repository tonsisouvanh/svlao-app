import asyncHandler from "express-async-handler";
import Document from "../models/documentModel.js";

// @desc    Insert multiple documents
// @route   POST /api/documents/insertMany
// @access  Private/Admin
const insertManyDocuments = asyncHandler(async (req, res) => {
  const documentsData = req.body; // Assuming req.body is an array of documents

  try {
    // Insert the array of documents
    const insertedDocuments = await Document.insertMany(documentsData);

    res.status(201).json(insertedDocuments);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error inserting documents", error: error.message });
  }
});

// @desc    Update document
// @route   PUT /api/documents/:id
// @access  Private/Admin
const updateDocument = asyncHandler(async (req, res) => {
  const documentId = req.params.id;
  const { title, description, fileUrl } = req.body;

  // Check if the document with the given ID exists
  const existingDocument = await Document.findById(documentId);

  if (!existingDocument) {
    res.status(404);
    throw new Error("Document not found");
  }

  // Update the document
  const updatedDocument = await Document.findByIdAndUpdate(
    documentId,
    { title, description, fileUrl },
    {
      new: true,
    }
  );

  if (updatedDocument) {
    res.json(updatedDocument);
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

// @desc    Create a new document
// @route   POST /api/documents
// @access  Private/Admin
const createDocument = asyncHandler(async (req, res) => {
  const { title, description, fileUrl } = req.body;
  const documentExist = await Document.findOne({ title });

  if (documentExist) {
    res.status(400);
    throw new Error("Document already exists");
  }

  const document = await Document.create({
    title,
    description,
    fileUrl,
  });

  if (document) {
    res.status(201).json({
      _id: document._id,
      title: document.title,
      description: document.description,
      fileUrl: document.fileUrl,
    });
  } else {
    res.status(400);
    throw new Error("Invalid document data");
  }
});

// @desc    Get all documents
// @route   GET /api/documents
// @access  Private/Admin
const getDocuments = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const searchFields = ["title", "content", "category"];
  const keyword = req.query.keyword
    ? req.query.keyword !== "all"
      ? {
          $or: searchFields.map((field) => ({
            [field]: {
              $regex: req.query.keyword,
              $options: "i",
            },
          })),
        }
      : req.query.keyword
    : {};

  const count = await Document.countDocuments({ ...keyword });
  const documents =
    keyword === "all"
      ? await Document.find({})
      : await Document.find({ ...keyword })
          .limit(pageSize)
          .skip(pageSize * (page - 1));

  res.json({ documents, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private/Admin
const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (document) {
    await Document.deleteOne({ _id: req.params.id });
    res.json({ _id: req.params.id });
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

// @desc    Get document by ID
// @route   GET /api/documents/:id
// @access  Private/Admin
const getDocumentById = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (document) {
    res.json(document);
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

export {
  getDocuments,
  deleteDocument,
  getDocumentById,
  updateDocument,
  createDocument,
  insertManyDocuments,
};
