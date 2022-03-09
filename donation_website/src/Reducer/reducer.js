export const initialState={
    projects:[],
    news:[],
};

const reducer = (state, action)=>{
    switch (action.type){
        case 'Add_Projects':
        return{
            ...state,
            projects: [...action.projects],
        };

        case 'Add_News':
        return{
            ...state,
            news:[...action.news]
        };
        default :
            return state;
    }
}

export default reducer;