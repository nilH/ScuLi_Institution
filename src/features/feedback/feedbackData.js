 export const feedback=[
     {id:'011',title:'app crash',description:"it crashes at sending texts",time:"April 15, 11:09 AM",status:0},
     {id:'012',title:'account need help',description:"how to reset password",time:"May 15, 11:09 AM",status:0},
     {id:'021',title:'please help',description:"it crashes at sending texts",time:"April 16, 11:09 AM",status:0},
 ]

 export function changeStatus(feedbackID){
     const index=feedback.findIndex((fb)=>fb.id===feedbackID);
     feedback[index].status=1;
 }