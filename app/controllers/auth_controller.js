const prisma = require("../helpers/prisma.ts");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
var jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
            confirm_password,
            transport_preferences,
            vehicles,
        } = req.body;

        if (password != confirm_password) {
            res.status(404).json({
                message: "Password tidak sama!",
                success: false,
                data: null,
            });
            return;
        }


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const transportIds = [];
        for (let i = 0; i < vehicles.length; i++) {
            uuid = uuidv4();
            await prisma.Transports.create({
                data: {
                    id: uuid,
                    brand_name: vehicles[i]["brand_name"],
                    model: vehicles[i]["model"],
                    class: vehicles[i]["class"],
                },
            });
            transportIds.push(uuid);
        }


        //buat user
        const newUser = await prisma.users.create({
            data: {
                id: uuidv4(),
                fullname: fullname,
                email: email,
                password: passwordHash,
                transport_preferences: transport_preferences,
            },
        });

        for (let i = 0; i < transportIds.length; i++) {
            await prisma.UserTransportsPreference.create({
                data: {
                    id: uuidv4(),
                    user_id: newUser.id,
                    transport_id: transportIds[i],
                },
            });
        }

        token = jwt.sign(
            {
                id: newUser.id,
            },
            "secretkey"
        );

        user = await prisma.users.findUnique({
            where: {
                id: newUser.id,
            },
            include: {
                user_transports_preferences: {
                    include: {
                        transport: true,
                    },
                },
            },
        });

        res.status(201).json({
            code: 201,
            status: "success",
            message: "Signup berhasil",
            data: user,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Internal Server Error," + error,
            data: null,
        });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        //user tidak ditemukan
        if (!user) {
            res.status(404).json({
                message: "Tidak menemukan user!",
                success: false,
                data: null,
            });
            return;
        }

        const verified = bcrypt.compareSync(password, user.password);
        if (!verified) {
            res.status(404).json({
                message: "Password salah!",
                success: false,
                data: null,
            });
            return;
        }
        token = jwt.sign(
            {
                id: user.id,
            },
            "secretkey"
        );

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Signin berhasil",
            user_id: user.id,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Internal Server Error",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout Berhasil",
            success: true,
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            data: null,
        });
    }
};

module.exports = {
    signup,
    signin,
    logout,
};
