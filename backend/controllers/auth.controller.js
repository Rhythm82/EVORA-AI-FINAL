import { registerUser, loginUser } from "../services/auth.service.js";

export const signup = async (req, res) => {

  try {

    const result = await registerUser(req.body);

    res.json(result);

  } catch (err) {

    res.status(400).json({ message: err.message });

  }

};

export const login = async (req, res) => {

  try {

    const { identifier, password } = req.body;

    const result = await loginUser(identifier, password);

    res.json(result);

  } catch (err) {

    res.status(400).json({ message: err.message });

  }

};