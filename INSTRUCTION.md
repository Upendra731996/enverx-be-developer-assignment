 1. install the required dependencies
run the following command for install the dependencies
npm i
configure make sure you have mongodb install and running on your machine or you have access to remote server

2. we have to crate Author  and author can crate blog ,update blog and delete  of own blog for that i have used jwt token  but blog can read any persone 
method:post
edpint for author (/createAuthor")
this is filed of author
 fullName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
        trim:true

    }


3. after that author login with the help of email and password after  success full loged in generate new  jwt token and that token we can use in heders(x-api-key) to perform the opration  crate blog ,update blog and delete blog without toke you can not crate blog ,update blog and delete blog make sure token must in heders
endpoint of login ai("/login)
method:post

4. for blog create
first we have to give all data with author id to create  blog  make sure token in header
end point ("/posts)
method:post
 blogName:{
        type:String,
        require:true,
        trim:true
    },
    body:{
        type:String,
        require:true,
        trim:true
    }
    ,
    category:{
        type:String,
        require:true,
        trim:true
    },
    authorId: { type: objectId, 
        ref: 'author',
        required:true
       },
    isDeleted:{
         type:Boolean,
        default:false
        
    }

5. any one can get specific blog with the help of blog id toke is not required
endpint("/posts/:id)
method:get

6. get all blog  with the help of filter and without filter and sorted of created date
endpoint("/posts")
method:get

7. for update make sure blogId in path param , token in header and update data in req body for update, blog, only author can update own blog  because i have used auhtentication and autherization with the help of jsonwebtoken
endpoint("/post/:id")
method:put

8. for delete  make sure blogId in path param , token in header  to delete blog
endpoin("/post/:id)
method:delete


note.
status code i used 
201 for success full creation (author or blog)
200 for get , deleted and updated sucees fully
500 for server err
404 for data not found
400 for bad request