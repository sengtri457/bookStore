const router = require("express").Router();
const  User = require("../models/user");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");

//add book --admin
router.post("/add-book" , authenticateToken , async(req ,res) =>{
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(401).json({ message: "You are not authorized to perform this action" });
        }
          
        const book = new Book ({
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            price : req.body.price,
            desc : req .body.desc,
            language : req.body.language,
        });
        await book.save();
        res.status(200).json({message : "book addes successfully"});
    }
    catch (error) {
        console.error("Add Book Error:", error); // Logs full error to console
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
      
});

//update book 
router.put("/update-book" , authenticateToken, async (req,res) =>{
    try {
        const {bookid} = req.headers;
    await Book.findByIdAndUpdate( bookid ,{
        url : req.body.url ,
        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
        desc : req.body.desc ,
        language : req.body.language ,
    });
    return res.status(200).json({
        message : "book updated successfully" ,
    });


    }catch (error) {
        console.log(error) ;
        return res.status(500).json({message : "An error occureed"});
    }
    

});

//delete book --admin
router.delete("/delete-book" , authenticateToken , async (req ,res) => {
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message : "book deleted successfully" ,
            });
        
    }
    catch(error) {
        return res.status(500).json({message : "An error occureed"});
    }
})

//get all books

router.get("/get-all-books" , async (req,res) => {
    try{
        const books = await Book.find().sort({createdAt : -1}) ;
        return res.json({
            status: "Success" ,
            data : books,
        });
    }
    catch (error) {
        console.log(error) ;
        return res.status(500).json({message : "An error occureed"});
    }
});

//get recently added bookss limit 4
router.get("/get-recent-books" , async (req ,res) => {
    try {
        const books = await Book.find().sort({createdAt : -1}).limit(4);
        return res.json ({
            status : "Success" ,
            data : books,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured"});
    }
});

//get book by id
router.get("/get-book-by-id/:id" , async (req ,res) => {
    try {
        const {id} = req.params ;
        const book = await Book.findById(id);
        return res.json({
            status : "Success" ,
            data : book,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured"});
    }
});




module.exports = router ;
