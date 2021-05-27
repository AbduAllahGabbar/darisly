let Vimeo = require("vimeo").Vimeo;

findById = async (req, res, videoId) => {
  const clientId = process.env.VIMEO_CLIENT_ID;
  const clientSecret = process.env.VIMEO_CLIENT_SECRET;
  const accessToken = process.env.VIMEO_ACCESS_TOKEN;

  let client = new Vimeo(clientId, clientSecret, accessToken);

  client.request(
    {
      method: "GET",
      path: `/videos/${videoId}`,
      // query: {
      //   fields: {
      //     duration: "10m",
      //   },
      // },
    },
    function (error, body, status_code, headers) {
      if (error) {
        return res.send(error);
      }
      return res.send(body.files.pop());
    }
  );
};

module.exports = {
  findById,
};
