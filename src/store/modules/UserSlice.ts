import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserType } from '../../types';

const adapter = createEntityAdapter<UserType>({
    selectId: user => user.userName
});

export const { selectAll: selectUser, selectById: selectUserById } = adapter.getSelectors(
    (state: RootState) => state.users
);

const UserSlice = createSlice({
    name: 'user',
    initialState: adapter.getInitialState(),
    reducers: {
        addUser: adapter.addOne,
        deleteUser: adapter.removeOne,
        addManyUser: adapter.addMany
    }
});

export const { addUser, deleteUser, addManyUser } = UserSlice.actions;
export default UserSlice.reducer;
