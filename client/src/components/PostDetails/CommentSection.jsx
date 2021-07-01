import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts';


const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleClick = async () => {
        const newComments = await dispatch(commentPost(`${user?.result.name}: ${comment}`, post._id));

        console.log(newComments);

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom varait="h6">Comments</Typography>
                    { comments?.map((comment, index) => (
                            <Typography key={index} gutterBottom variant="subtitle1">
                                <strong>{ comment.split(': ')[0] }</strong>
                                {comment.split(':')[1]}
                            </Typography>
                        ))
                    }
                    <div ref={commentsRef} />
                </div>
                { (user?.result?.name) ? (
                    <div style={{ width: '60%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                            Submit
                        </Button>
                    </div>
                ) : (
                    <h4 style={{ width: '60%', textAlign: 'center', }}>
                        Register to add a comment
                    </h4>
                )
                }
            </div>
        </div>
    )
}

export default CommentSection
