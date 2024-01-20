export const getSender =(loggedUser,users)=>{
    if(!loggedUser) return;
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
}

export const isSameSender =(message,m,i,userId)=>{
    return(
        i<message.length -1&&
        (message[i+1].sender._id!=m.sender._id|| message[i+1].sender._id===undefined)&&
        message[i].sender._id!=userId
    );
}

export const isLastMessage =(message,i,userId)=>{
return(
    i===message.length-1&&
    message[message.length-1].sender._id!==userId&&
    message[message.length-1].sender._id
)
}

export const isSameSenderMargin = ( m,  userId) => {
   if(m.sender._id===userId) return "flex-end";
   else return "flex-start";
  };
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };