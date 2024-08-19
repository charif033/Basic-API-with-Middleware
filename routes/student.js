const express = require('express');
const router = express.Router();
const { getStudentById, getAllStudent, insertStudent, updateStudent, deleteStudent } = require('../controllers/student');

const timeStamp = (req, res, next) => {
    const time = Date.now();
    const readableTime = new Date(time);
    console.log('Request Time :', readableTime.toString());
    console.log('Method :', req.method);
    console.log('Path : /api/student' + req.path);
    next();
}

router.use(timeStamp);

router.get('/:id', getStudentById);
router.get('/', getAllStudent);
router.post('/', insertStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;