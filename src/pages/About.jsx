import React from "react";
import img from "../assets/img/about.jpg";
import { Image } from "react-bootstrap";
function About() {
  return (
    <div>
      <h1>About Me</h1>
      <h4>UX Designer at Apple who loves minimal design, Grids & good coffee.</h4>
      <Image className="about-img" src={img}></Image>
      <p className="text-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae dolorum
        ima soluta hic incidunt facilis. Necessitatibus, ipsa eos magni
        recusandae hic ab. Optio, quidem!id perferendis maxime Lorem ipsum dolor
        sit amet ecusandae hic ab. incidunt facilis. Necessitatibus, ipsa eos
        magni recusandae hic ab. Optio, quidem!id perferendis maxime Lorem ipsum
        dolor sit amet ecusandae hic ab. incidunt facilis. Necessitatibus, ipsa
        eos magni recusandae hic ab. Optio, quidem!id perferendis maxime Lorem
        ipsum dolor sit amet ecusandae hic ab. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Vitae dolorum ima soluta hic incidunt
        facilis. Necessitatibus, ipsa eos magni recusandae hic ab. Optio,
        quidem!id perferendis maxime Lorem ipsum dolor sit amet ecusandae hic
        ab. incidunt facilis. Necessitatibus, ipsa eos magni recusandae hic ab.
        Optio, quidem!id perferendis maxime Lorem ipsum dolor sit amet ecusandae

      </p>
    </div>
  );
}

export default About;
