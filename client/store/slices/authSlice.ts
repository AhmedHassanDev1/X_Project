import api from "@/lib/api/rest";
import { AuthType } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: AuthType = {
     access_token: undefined,
     user: {},
     pending: false,
     error: undefined,
  
}

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async () => {
     const user = await api.get("user/me")
     return user.data
})
const AuthSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          setAccessToken(state, action) {
               state.access_token = action.payload
          },
          clearTokens(state) {
               state.access_token = undefined
          }
     },
     extraReducers: (builder) => {
          builder.addCase(getCurrentUser.pending, (state) => {
               state.pending = true
            
          })

          builder.addCase(getCurrentUser.fulfilled, (state, action) => {
               state.user = action.payload
               state.pending = false
                
          })

          builder.addCase(getCurrentUser.rejected, (state) => {
               state.pending = false
               state.error = "Failed to fetch user data"
          })
     }
})

export const { setAccessToken, clearTokens } = AuthSlice.actions
export default AuthSlice.reducer