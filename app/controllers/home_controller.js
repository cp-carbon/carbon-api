const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b6c82bb9bc37415f9c46564673df59bf');

const home = async (req, res) => {
    try {
        userId = req.params.user_id;

        const newsResponse = await newsapi.v2.everything({
            q: 'sustainable living, earth',
            language: 'en',
            pageSize: 12
          });
      
          const articles = newsResponse.articles.map(article => ({
            author: article.author,
            publishedAt: article.publishedAt,
            title: article.title,
            description: article.description,
            url: article.url,
            background_image: article.urlToImage
          }));

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
            news: articles,
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
