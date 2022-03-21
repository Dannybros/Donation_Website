export const initialState={
    projects:[],
    news:[],
    language:localStorage.getItem('lang')
};

const reducer = (state, action)=>{
    switch (action.type){
        case 'Set_Lang':
            return{
                ...state,
                language:action.lang
            }
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