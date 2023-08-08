import { createContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import Icons from "../static/Icons";

export const UserDataContext = createContext();

const UserDataProvider = (props) => {
  const [stack, setStack] = useState([
    {
      id: uuidv1(),
      title:"Angular",
      logo:Icons.GetImage("angular"),
      category:"Library"
    },
    {
      id: uuidv1(),
      title:"Mongo",
      logo:Icons.GetImage("mongo"),
      category:"Database"
    },
    {
      id: uuidv1(),
      title:"Dotnet",
      logo:Icons.GetImage("dotnet"),
      category:"Framework"
    },
    {
      id: uuidv1(),
      title:"Spring",
      logo:Icons.GetImage("spring"),
      category:"Framework"
    },
    {
      id: uuidv1(),
      title:"Sql",
      logo:Icons.GetImage("sql"),
      category:"database"
    },
    {
      id: uuidv1(),
      title:"Docker",
      logo:Icons.GetImage("docker"),
      category:"Tool"
    },
    {
      id: uuidv1(),
      title:"Git",
      logo:Icons.GetImage("git"),
      category:"VCS"
    },
    {
      id: uuidv1(),
      title:"Js",
      logo:Icons.GetImage("js"),
      category:"Language"
    },
    {
      id: uuidv1(),
      title:"Redis",
      logo:Icons.GetImage("redis"),
      category:"Database"
    },
  ]);
  return ( <UserDataContext.Provider value={{stack:stack, setStack:setStack}}>{props.children}</UserDataContext.Provider> );

};

export default UserDataProvider;


