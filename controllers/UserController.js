import bcrypt from "bcrypt";

import User from "../models/UserModel.js";


export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'lastName', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUsersById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'lastName', 'email', 'role'],
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, lastName, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Паролі не співпадають" });
    const hashPassword = await bcrypt.hash(password, 3)
    try {
        await User.create({
            name: name,
            lastName: lastName,
            email: email,
            password: hashPassword,
            role: role
        });

        res.status(201).json({ msg: "Користувача зареєстровано" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
export const updateUser = async (req, res) => {

    const user = await User.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    if (!user) return res.status(404).json({ msg: "Користувача не знайдено" });
    const { name, lastName, email, password, confPassword, role } = req.body;
    let hashPassword;

    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await bcrypt.hash(password, 3);
    }
    if (password !== confPassword) return res.status(400).json({ msg: "Паролі не співпадають" });

    try {
        await User.update({
            name: name,
            lastName: lastName,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id,
            }
        });

        res.status(200).json({ msg: "Дані користувача онволено" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    if (!user) return res.status(404).json({ msg: "Користувача не знайдено" });

    try {
        await User.destroy({
            where: {
                id: user.id,
            }
        });

        res.status(200).json({ msg: "Користувача видалено" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}