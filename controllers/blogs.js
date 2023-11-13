


const get_all_blogs = (req,res) => {
    res.status(200).json({
        message: "All Blogs",
        user: res.user,
    })
}


module.exports = {
    get_all_blogs,
}