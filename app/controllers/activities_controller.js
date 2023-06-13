const activities = async (req, res) => {
    try {
        const { user_id } = req.params;
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Berhasil mendapatkan data activities",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Internal Server Error",
            data: null,
        });
    }
};

module.exports = {
    activities,
};
