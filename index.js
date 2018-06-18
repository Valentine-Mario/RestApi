var express= require ('express');
var fs= require('fs')
var body_paser = require('body-parser');
var app= express();
var port = 3000
app.use(body_paser.json() )
class books{
    constructor(name, title, author){
        this.name=name;
        this.title=title;
        this.author=author;
        this.id=Math.random();
    }
}

class library{
    constructor(name){
        this.name=name
        this.books=[]; //fs.readFileSync('./data.json', 'utf-8')
        this.borrow=[];
    }
    addBook(book){
        this.books=this.getLibrary();
        this.books.push(book)
       var book= fs.writeFileSync('./data.json', JSON.stringify(this.books, null, 2));
    }
    getBook(){
        this.books= this.getLibrary();
        return this.books;
    }
    getLibrary(){
        return JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    }
    updateLibrary(books){
        fs.writeFileSync('./data.json', JSON.stringify(this.books, null, 2))

    }
    borrowBook(value){
        var bookItem=this.getBookByParam(value);
        this.borrow.push(bookItem);
        fs.writeFileSync('./borrow.json', JSON.stringify(this.borrow, null, 2));
        var data = this.getBookByParam(value)
        this.deleteBook(data)
    }
     getBookByParam2(value){
this.books = this.getBorrow();
    var books = [];
    for (let i = 0; i < this.books.length; i++){
        if(this.books[i].name == value || this.books[i].title == value ||
            this.books[i].author == value || this.books[i].id == value ){
            books.push(this.books[i]);
        }
    }
    return books;    
}
deleteBook2(id){
       var bookIndex=this.getBookById(id);
       this.borrow.splice(bookIndex, 1)
       this.UpdateBorrow(this.borrow);
     }
    returnBook(data){
       var Item= this.getBookByParam2(data)
       this.addBook(Item)
       this.deleteBook2(Item)
    }
    UpdateBorrow(book){
        fs.writeFileSync('./borrow.json', JSON.stringify(this.borrow, null, 2))
    }
    getBorrow(){
        return JSON.parse(fs.readFileSync('./borrow.json', 'utf-8'));
    }
    getBookById(id){
        this.books = this.getLibrary();
    for (var i = 0; i < this.books.length; i++){
        if(this.books[i].id == id){
            return this.books[i];
            }
    }
}
    getBookByParam(value){
this.books = this.getLibrary();
    var books = [];
    for (let i = 0; i < this.books.length; i++){
        if(this.books[i].name == value || this.books[i].title == value ||
            this.books[i].author == value || this.books[i].id == value ){
            books.push(this.books[i]);
        }
    }
    return books;    
}
    deleteBook(id){
       var bookIndex=this.getBookById(id);
       this.books.splice(bookIndex, 1)
       this.updateLibrary(this.books);
     }
    editBook(id, newVal){
        var bookIndex=this.getBookById(id);
        this.books[bookIndex]= newVal;
        this.updateLibrary(this.books);
    }
    
}
var library1 = new library("Standard Library")
var borrow = new library("borrow")

app.get('/', function(req, res){
    res.send(library1.getBook())
})
app.get('/return', function(req,res){
    res.send(borrow.returnBook())
})
app.get('/borrow', function(req, res){
    res.send(borrow.getBorrow())
})
app.get('/value', function(req,res){
    res.send(library1.getBookByParam("Harry-potter"))
})
app.put('/borrow', function(req,res){
    res.send(borrow.borrowBook("Value1"))
})
app.put('/return', function(req,res){
    res.send(borrow.returnBook("Value1"))
})
app.post('/add', function(req,res){
        var params = req.body;
        var book3 = new books(params.name, params.title, params.author, Math.random())
        library1.addBook(book3);
        res.send(library1.getBook())
})

var book1 = new books("Selena", "Gomez", "Picker")
app.put('/edit', function(req, res){
        var body=req.body;
        library1.editBook(0.7571397632900805, book1)
        res.send(library1.getBook())
})

 app.delete('/delete', function(req, res){
     library1.getBookById(0.2808668973493291)
    res.send(library1.deleteBook(0.2808668973493291))
})


var connect= app.listen(port, function(){
    console.log(`running on localhost: ${port}`)
})
