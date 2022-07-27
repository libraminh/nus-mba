import React from "react";

const HeadingInformation = ({ title, desc, className }) => {
  return (
    <figure className={`${className}`}>
      <h2
        className="text-26 leading-31 md:text-2.5xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <p
        className="text-sm md:text-base"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </figure>
  );
};

HeadingInformation.propTypes = {};

export default HeadingInformation;
