const request = require("supertest");
const app = require("./app");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.user.createMany({
        data: [
            { id: 1, nome: "Paulo Roberto" },
            { id: 2, nome: "Ana Carolina" },
            { id: 3, nome: "Bruno Costa" },
        ],
    });
    await prisma.$executeRaw`SELECT setval('"User_id_seq"', (SELECT MAX(id) FROM "User"))`;
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("GET /status", () => {
    it("deve retornar status 200 e uma mensagem de status ok", async () => {
        const response = await request(app).get("/status");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ status: "ok" });
    });
});

describe("GET /users", () => {
    it("deve retornar status 200 e uma lista de usuários", async () => {
        const response = await request(app).get("/users");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("nome");
    });
});

describe("GET /users/:id", () => {
    it("deve retornar um usuário específico e status 200", async () => {
        const response = await request(app).get("/users/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ id: 1, nome: "Paulo Roberto" });
    });

    it("deve retonar status 404 se o usuário não for encontrado", async () => {
        const response = await request(app).get("/users/99");
        expect(response.statusCode).toBe(404);
    });
});

describe("POST /users", () => {
    it("deve criar um novo usuário e retornar o objeto do usuário", async () => {
        const novoUsuario = { nome: "Carlos Andrade" };
        const response = await request(app).post("/users").send(novoUsuario);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("Carlos Andrade");
    });

    it("deve retornar erro 400 se o nome não for fornecido", async () => {
        const response = await request(app).post("/users").send({});

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ erro: "O nome é obrigatório" });
    });
});

describe("PUT /users/:id", () => {
    it("deve atualizar o nome de um usuário e retorna-lo", async () => {
        const dadosAtualizados = { nome: "Paulo Ricardo" };
        const response = await request(app)
            .put("/users/1")
            .send(dadosAtualizados);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.nome).toBe("Paulo Ricardo");
    });

    it("deve retornar 404 se o usuário não existir", async () => {
        const dadosAtualizados = { nome: "Usuário Fantasma" };
        const response = await request(app)
            .put("/users/99")
            .send(dadosAtualizados);

        expect(response.statusCode).toBe(404);
    });

    it("deve retornar 400 se o nome não for fornecido no corpo", async () => {
        const response = await request(app).put("/users/1").send({});

        expect(response.statusCode).toBe(400);
    });
});

describe("DELETE /users/:id", () => {
    it("deve remover um usuário e retornar status 204", async () => {
        const response = await request(app).delete("/users/1");
        expect(response.statusCode).toBe(204);

        const userCheckResponse = await request(app).get("/users/1");
        expect(userCheckResponse.statusCode).toBe(404);
    });

    it("deve retornar 404 se o usuário a ser deletado não existir", async () => {
        const response = await request(app).delete("/users/99");
        expect(response.statusCode).toBe(404);
    });
});
