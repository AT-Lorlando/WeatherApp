// save our state (isPanel open or not) 
export const state = () => ({
    isNavOpen: false
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
    toggleNav(state) {
        state.isNavOpen = !state.isNavOpen
    }
};
