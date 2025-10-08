const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user) {
        res.status(200).json(user);
    } else {
        res.sendStatus(404);
    }
};

const createUser = async (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ erro: "O nome é obrigatório" });
    }
    try {
        const newUser = await prisma.user.create({ data: { nome: nome } });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Falha ao criar usuários." });
    }
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    if (!nome) {
        return res.sendStatus(400).json({ error: "O nome é obrigatório" });
    }
    try {
        const updateUser = await prisma.user.update({
            where: { id: id },
            data: { nome: nome },
        });
        res.status(200).json(updateUser);
    } catch (error) {
        res.sendStatus(404);
    }
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.user.delete({
            where: { id: id },
        });
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(404);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
