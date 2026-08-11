import Image from "next/image";
import React from "react";

export default function PreHeader() {
  return (
    <div className="outter-wrapper header-area header-style-3">
      <div className="wrapper clearfix">

        <div className="logo-container centered">
          <div className="geo-midd-menu">

            <div className="org-name left">
              <p>Монголын Оюутны</p>
              <p>Спортын Холбоо</p>
            </div>

            <a href="/" className="geo-logo noajax">
              <Image
                src="/images/logo.png"
                alt="МОНССФ – Mongolian Student Sports Federation"
                width={84}
                height={84}
                priority
              />
            </a>



            <div className="org-name right">
              <p>Mongolian Student</p>
              <p>Sports Federation</p>
            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}
