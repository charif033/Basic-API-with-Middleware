const express = require('express');
const router = express.Router();
const { getStudentById, getAllStudent, insertStudent, updateStudent, deleteStudent } = require('../controllers/student');

router.get('/:id', getStudentById);
router.get('/', getAllStudent);
router.post('/', insertStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;