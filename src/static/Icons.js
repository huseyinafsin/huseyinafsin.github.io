import angular from "../assets/icons/angular-svgrepo-com.svg";
import mongo from "../assets/icons/mongo-svgrepo-com.svg";
import dotnet from "../assets/icons/dotnet.svg";
import spring from "../assets/icons/spring-svgrepo-com.svg";
import microservice from "../assets/icons/cluster-svgrepo-com.svg";
//import css from "../assets/icons/css-svgrepo-com.svg";
import sql from "../assets/icons/database-svgrepo-com.svg";
import docker from "../assets/icons/docker-svgrepo-com.svg";
import git from "../assets/icons/git-svgrepo-com.svg";
import html from "../assets/icons/html5-svgrepo-com.svg";
import js from "../assets/icons/js-svgrepo-com.svg";
import react from "../assets/icons/react-svgrepo-com.svg";
import redis from "../assets/icons/redis-logo-svgrepo-com.svg";

export class Icons {
  static images = [
    {
      name: "angular",
      image: angular,
    },
    {
      name: "mongo",
      image: mongo,
    },
    {
      name: "dotnet",
      image: dotnet,
    },
    {
      name: "spring",
      image: spring,
    },
    {
      name: "microservice",
      image: microservice,
    },
    // {
    //   name: "css",
    //   image: _css,
    // },
    {
      name: "sql",
      image: sql,
    },
    {
      name: "docker",
      image: docker,
    },
    {
      name: "git",
      image: git,
    },
    {
      name: "html",
      image: html,
    },
    {
      name: "js",
      image: js,
    },
    {
      name: "react",
      image: react,
    },
    {
      name: "redis",
      image: redis,
    },
  ];
  static GetImage = (name) => {
    const found = Icons.images.find((e) => e.name === name);
    return found ? found.image : null;
  };
}

export default Icons;
