const User = require("../model/auth.model");
require("dotenv").config();

const axios = require("axios");

const PAGE_SIZE = 2;

module.exports.index = async (req, res) => {
  const user = await User.findOne({ password: req.cookies.userId });
  const URL = process.env.USER_API;
  let renderPage = [];
  axios
    .get(URL)
    .then((response) => {
      let data = response.data;
      const totalPage = Math.ceil(data.length / PAGE_SIZE);
      for (let i = 1; i <= totalPage; i++) {
        renderPage.push(i);
      }
      res.render("home", {
        data: data.slice(0, PAGE_SIZE),
        totalPage: renderPage,
        username: user.username,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.search = async (req, res) => {
  let q = req.query.q;
  const URL = process.env.USER_API;
  const data = await (await axios.get(URL)).data;

  const dataMatch = data.filter((item) => {
    return item.username.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("home", {
    data: dataMatch,
    value: q,
  });
};

module.exports.loadPage = async (req, res) => {
  const user = await User.findOne({ password: req.cookies.userId });
  const { page } = req.params || 1;
  const renderPage = [];
  const URL = `http://localhost:5000/api?page=${page}`;
  const data = await (await axios.get(URL)).data;
  const totalPage = Math.ceil(
    (await (await axios.get(process.env.USER_API)).data.length) / PAGE_SIZE
  );
  for (let i = 1; i <= totalPage; i++) {
    renderPage.push(i);
  }
  res.render("home", {
    data: data,
    totalPage: renderPage,
    username: user.username,
    active: page,
  });
};
