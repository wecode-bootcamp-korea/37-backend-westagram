const postService = require('../services/postService')

const postUp = async (req, res) => {
     try{
        const { title, content, user_id} = req.body;

        if (!title || !content || !user_id) {
            return res.status(400).json({message : 'KEY_ERROR'});
        }
v
        await postService.postUp( title, content, user_id);
        return res.status(201).json({
            message : 'POSTUP_SUCCESS'
        });
       }catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({message : err.message});
        }
    };

    const postLookup = async (req, res) => {
        try{
           const result = await postService.postLookup();
           return res.status(201).json({
            data : result
           });
          } catch (err) {
               console.log(err);
               return res.status(err.statusCode || 500).json({message : err.message});
           }
       };

    const userPosts = async (req, res) => {
        try{
            const user_id = req.params.userId;
            if(!user_id) {
                return res.status(400).json({message : 'KEY_ERROR'});
            }
            const result = await postService.userPosts(user_id);
            return res.status(201).json({
                data : result
            });
        }
        catch (err) { 
            console.log(err);
            return res.status(err.statusCode || 500).json({message : err.message});
        }
    };


    const modifyPost = async (req, res) => {
        try{
            const post_id = req.params.postId;
            const {content} = req.body;

            if(!post_id || !content){
                return res.status(400).json({message : 'KEY_ERROR'});
            }
            const result = await postService.modifyPost(post_id, content); 
            return res.status(201).json({data : result});
        }
        catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({message : err.message});
        }
    };

    const removePost = async(req, res) => {
        
        try {
            const post_id = req.params.postId;
            
            if(!post_id){
                return res.status(400).json({message : 'KEY_ERROR'});
            }

            await postService.removePost(post_id);
            return res.status(201).json({message : "postingDeleted"});
        }

        catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({message : err.message});
        }
    }

    module.exports = {
        postUp, 
        postLookup,
        userPosts,
        modifyPost,
        removePost
    }