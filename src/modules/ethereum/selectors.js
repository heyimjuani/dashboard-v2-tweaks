export const getState = state => state.app.ethereum
export const getAddress = state => getState(state).data.address
export const getNetwork = state => getState(state).data.network
export const isLoading = state => getState(state).loading
export const getError = state => getState(state).error
