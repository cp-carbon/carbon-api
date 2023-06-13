const activity = (req, res) => {
    try {
        userId = req.params.user_id;
        res.status(200).json({
            code: 200,
            status: "success",
            average_emission: 0.0,
            travel_stats: {
                walk: 10,
                bike: 20,
                vehicle: 30,
                public_transport: 40,
            },
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Internal Server Error",
            data: null,
        });
    }
};

module.exports = {
    activity,
};
