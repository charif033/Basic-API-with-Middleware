const db = require('../DB');
const express = require('express');

const app = express();

/**
 * @swagger
 * /api/student/{id}:
 *   get:
 *     summary: Retrieve a single student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The student ID
 *     responses:
 *       200:
 *         description: A single student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: The student ID
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   description: The student's first name
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   description: The student's last name
 *                   example: Doe
 *                 gender:
 *                   type: string
 *                   description: The student's gender
 *                   example: Male
 *                 class:
 *                   type: number
 *                   description: The student's class
 *                   example: 2
 *                 advisorname:
 *                   type: string
 *                   description: The student's advisor
 *                   example: Mr.Check
 */

exports.getStudentById = async (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM student WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while retrieving student.', error: err });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Student not found.' });
            } else {
                res.status(200).json({ message: 'Student retrieved successfully.', data: result });
            }
        }
    });
};

/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Retrieve all student
 *     tags: [Students]
 *     description: All student
 *     responses:
 *       200:
 *         description: All student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: The student ID
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   description: The student's first name
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   description: The student's last name
 *                   example: Doe
 *                 gender:
 *                   type: string
 *                   description: The student's gender
 *                   example: Male
 *                 class:
 *                   type: number
 *                   description: The student's class
 *                   example: 2
 *                 advisorname:
 *                   type: string
 *                   description: The student's advisor
 *                   example: Mr.Check
 */

exports.getAllStudent = async (req, res) => {
    const sql = 'SELECT * FROM student';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while retrieving student.', error: err });
        } else {
            res.status(200).json(result);
        }
    });
};

/**
 * @swagger
 * /api/student:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The student's first name
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: The student's last name
 *                 example: Doe
 *               gender:
 *                 type: string
 *                 description: The student's gender
 *                 example: Male
 *               class:
 *                 type: number
 *                 description: The student's class
 *                 example: 2
 *               advisorname:
 *                 type: string
 *                 description: The student's advisor
 *                 example: Mr.Check
 *     responses:
 *       201:
 *         description: Student created successfully
 */

exports.insertStudent = async (req, res) => {
    const std = req.body;
    const sql = 'INSERT INTO student (firstname, lastname, gender, class, advisorname) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [std.firstname, std.lastname, std.gender, std.class, std.advisorname], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while inserting student.', error: err });
        } else {
            res.status(201).json({ message: 'Student inserted successfully.' });
        }
    });
};

/**
 * @swagger
 * /api/student/{id}:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The student's first name
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: The student's last name
 *                 example: Doe
 *               gender:
 *                 type: string
 *                 description: The student's gender
 *                 example: Male
 *               class:
 *                 type: number
 *                 description: The student's class
 *                 example: 2
 *               advisorname:
 *                 type: string
 *                 description: The student's advisor
 *                 example: Mr.Check
 *     responses:
 *       200:
 *         description: Student updated successfully
 */

exports.updateStudent = async (req, res) => {
    const id = Number(req.params.id);
    const std = req.body;
    const sql = 'UPDATE student SET firstname = ?, lastname = ?, gender = ?, class = ?, advisorname = ? WHERE id = ?';
    db.query(sql, [std.firstname, std.lastname, std.gender, std.class, std.advisorname, id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while updating student.', error: err });
        } else {
            res.status(200).json({ message: 'Student updated successfully.' });
        }
    });
};

/**
 * @swagger
 * /api/student/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */

exports.deleteStudent = async (req, res) => {
    const id = Number(req.params.id);
    const sql = 'DELETE FROM student WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while deleting student.', error: err });
        } else {
            res.status(200).json({ message: 'Student deleted successfully.' });
        }
    });
};
