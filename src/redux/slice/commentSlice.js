import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as commentService from '~/services/commentService';

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        listComment: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCommentByIdAction.fulfilled, (state, action) => {
            state.listComment = action.payload.data;
        });
    },
});

export default commentSlice;

export const getCommentByIdAction = createAsyncThunk('comment/getCommentByIdAction', async (uuid) => {
    const result = await commentService.getCommentById(uuid);
    return result;
});

export const commentdAction = createAsyncThunk('comment/commentdAction', async (data, thunkAPI) => {
    await commentService.comment(data.videoId, data.data);
    await thunkAPI.dispatch(getCommentByIdAction(data.videoId));
});

export const deleteCommentdAction = createAsyncThunk('comment/deleteCommentdAction', async (data, thunkAPI) => {
    await commentService.deleteComment(data.id);
    await thunkAPI.dispatch(getCommentByIdAction(data.uuid));
});

export const likeCommentdAction = createAsyncThunk('comment/likeCommentdAction', async (data, thunkAPI) => {
    await commentService.likeComment(data.id);
    await thunkAPI.dispatch(getCommentByIdAction(data.uuid));
});

export const unlikeCommentdAction = createAsyncThunk('comment/unlikeCommentdAction', async (data, thunkAPI) => {
    await commentService.unlikeComment(data.id);
    await thunkAPI.dispatch(getCommentByIdAction(data.uuid));
});
