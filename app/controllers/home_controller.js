const home = async (req, res) => {
    try {
        userId = req.params.user_id;
        res.status(200).json({
            code: 200,
            status: "success",
            today_emission: 0.0,
            travel_activities: {
                walk: 10,
                bike: 20,
                vehicle: 30,
                public_transport: 40,
            },
            news: [
                {
                    background: "https://picsum.photos/200/300",
                    title: "Lorem ipsum dolor sit amet",
                    excerpt:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nulla facilisi. Sed euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nulla facilisi.",
                },
                {
                    background: "https://picsum.photos/200/300",
                    title: "Lorem ipsum dolor sit amet",
                    excerpt:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
            ],
            products: [
                {
                    background: "https://picsum.photos/200/300",
                    title: "Lorem ipsum dolor sit amet",
                    url: "https://www.google.com",
                },
                {
                    background: "https://picsum.photos/200/300",
                    title: "Lorem ipsum dolor sit amet",
                    url: "https://www.google.com",
                },
            ],
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
    home,
};
