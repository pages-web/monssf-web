import React from "react";
import Image from "next/image";

export default function buhBichleg() {
  <div className="outter-wrapper body-wrapper">
    <div className="wrapper ad-pad clearfix">
      {/* Start Main Column  */}
      <div className="col-1-1">
        {/* Start Gallery Section */}
        <div className="clearfix">
          <h3>Видео</h3>
          {/* Start Isotope */}
          <div
            className="thumb-gallery super-list variable-sizes clearfix isotope"
            id="thumb-gallery"
            style={{ position: "relative", overflow: "hidden", height: 212 }}
          >
            <div
              className="col-1-4 element isotope-item"
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              <div className="mosaic-block fade">
                <a
                  style={{ display: "inline", opacity: 0 }}
                  href="/%D0%BC%D0%BE%D0%BD%D0%B3%D0%BE%D0%BB%D1%8B%D0%BD-%D0%BE%D1%8E%D1%83%D1%82%D0%BD%D1%8B-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%8B%D0%BD-v-%D0%BD%D0%B0%D0%B0%D0%B4%D0%B0%D0%BC-%D1%87%D0%B8%D1%80%D0%BB%D0%B8%D0%B4%D0%B8%D0%BD%D0%B3-%D1%85%D3%A9%D0%B3%D0%B6%D3%A9%D3%A9%D0%BD-%D0%B4%D1%8D%D0%BC%D0%B6%D0%B8%D0%B3%D1%87%D0%B8%D0%B9%D0%BD-%D1%81%D0%BF%D0%BE%D1%80%D1%82/"
                  className="mosaic-overlay noajax"
                >
                  <div className="details">
                    <h4 className="Монголын оюутны спортын V наадам - Чирлидинг (Хөгжөөн дэмжигчийн спорт)">
                      Монголын оюутны спортын ...
                    </h4>
                    <p />
                  </div>
                </a>
                <div style={{ display: "block" }} className="mosaic-backdrop">
                  <Image
                    src="http://img.youtube.com/vi/Rzg19HmSP4M/0.jpg"
                    alt="Fill"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-1-4 element isotope-item"
              style={{ position: "absolute", left: 279, top: 0 }}
            >
              <div className="mosaic-block fade">
                <a
                  style={{ display: "inline", opacity: 0 }}
                  href="/%D0%B3%D0%B0%D0%BD%D0%B4%D0%B1%D0%BE%D0%BB-%D0%BC%D0%BE%D0%BD%D0%B3%D0%BE%D0%BB%D1%8B%D0%BD-%D0%BE%D1%8E%D1%83%D1%82%D0%BD%D1%8B-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%8B%D0%BD-v-%D0%BD%D0%B0%D0%B0%D0%B4%D0%B0%D0%BC/"
                  className="mosaic-overlay noajax"
                >
                  <div className="details">
                    <h4 className="Гандбол - Монголын оюутны спортын V наадам">
                      Гандбол - Монголын ...
                    </h4>
                    <p></p>
                  </div>
                </a>
                <div style={{ display: "block" }} className="mosaic-backdrop">
                  <Image
                    src="http://img.youtube.com/vi/fSBtQwgKrFk/0.jpg"
                    alt="Fill"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-1-4 element isotope-item"
              style={{ position: "absolute", left: 558, top: 0 }}
            >
              <div className="mosaic-block fade">
                <a
                  style={{ display: "inline", opacity: 0 }}
                  href="/%D0%BC%D0%BE%D1%81%D0%BD-%D1%81%D0%B0%D0%B3%D1%81%D0%B0%D0%BD-%D0%B1%D3%A9%D0%BC%D0%B1%D3%A9%D0%B3/"
                  className="mosaic-overlay noajax"
                >
                  <div className="details">
                    <h4 className="МОСН - Сагсан бөмбөг">МОСН - Сагсан ...</h4>
                    <p>&amp;amp;amp;amp;amp;l...</p>
                  </div>
                </a>
                <div style={{ display: "block" }} className="mosaic-backdrop">
                  <Image
                    src="http://img.youtube.com/vi/4N_Jn6eMe54/0.jpg"
                    alt="Fill"
                  />
                </div>
              </div>
            </div>
            {/* End Isotope */}
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>;
}
