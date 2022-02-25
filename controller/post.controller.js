const Post = require("../model/post.model");
const User = require("../model/auth.model");

module.exports.index = async (req, res) => {
    try {
        let { page } = req.query || 1;
        const PAGE_SIZE = 2;
        const pageArr = [];
        const skip = (parseInt(page) - 1) * PAGE_SIZE;
        const data = await Post.find({});
        let post = await Post.find({})
            .skip(skip)
            .limit(PAGE_SIZE)
            .populate("author");
        const totalPage = Math.ceil(data.length / PAGE_SIZE);
        for (let i = 1; i <= totalPage; i++) {
            pageArr.push(i);
        }
        post = post.map((post) => post.toObject());
        res.render("./posts/index", {
            post,
            totalPage: pageArr,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.addPost = (req, res) => {
    res.render("./posts/addPost");
};

module.exports.getEditPost = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.render("./posts/edit", {
        title: post.title,
        text: post.text,
    });
};

module.exports.createPost = async (req, res) => {
    const { title, text } = req.body;

    const user = await User.findOne({ password: req.cookies.userId });

    const post = new Post({ title, text });
    post.author = user;
    await post.save();

    user.post.push(post);
    await user.save();

    res.render("./posts/addPost", {
        success: "Thêm bài viết thành công",
    });
};

module.exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.redirect("/home");
};

module.exports.editPost = async (req, res) => {
    const { postId } = req.params;
    const { title, text } = req.body;
    await Post.findOneAndUpdate(
        { _id: postId },
        { title, text },
        { new: true }
    );
    res.render("./posts/edit", {
        success: "Sửa bài viết thành công",
        title,
        text,
    });
};
module.exports.likePost = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    await Post.findOneAndUpdate(
        { _id: postId },
        {
            like: post.like + 1,
        },
        { new: true }
    );
    res.redirect("back");
};
