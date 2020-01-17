import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schemaStudents = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schemaStudents.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExistsStudents = await Students.findOne({
      where: { email: req.body.email },
    });

    if (userExistsStudents) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, age, weight, height } = await Students.create(req.body);

    return res.json({
      id,
      name,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schemaStudents = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number().integer(),
    });

    if (!(await schemaStudents.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExistsStudents = await Students.findOne({
      where: { email: req.body.email },
    });

    if (!userExistsStudents) {
      return res.status(400).json({ error: 'User does not exists.' });
    }

    const { id, name, age, weight, height } = await userExistsStudents.update(req.body);

    return res.json({
      id,
      name,
      age,
      weight,
      height,
    });
  }
}

export default new StudentsController();
