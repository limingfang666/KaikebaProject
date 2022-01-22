import axios from 'axios';

export function selectUser(payload){
    return async dispatch=>{
        let rs = await axios({
            url:'/api/getUser'
        });
        dispatch({
            type:'USER_GET',
            payload:rs.data
        });
    }
}