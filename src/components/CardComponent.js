import React from "react";

export default function CardComponent() {
  return (
    <section className="py-4">
      <div className="container">
        <div className="row justify-space-between py-2">
          <div className="col-6 mx-auto">
            <div className="card shadow-lg">
              <div className="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                <a href="javascript:;" className="d-block">
                  <img
                    src="../../assets/images/bg-coworking.jpeg"
                    className="img-fluid border-radius-lg"
                    alt="Card Image"
                  />
                </a>
              </div>

              <div className="card-body pt-3">
                <span className="text-gradient text-warning text-uppercase text-xs font-weight-bold my-2">
                  Hub
                </span>
                <a href="javascript:;" className="text-dark h5 d-block">
                  Shared Coworking
                </a>
                <p className="card-description mb-4">
                  Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.
                </p>
                <div className="author align-items-center">
                  <img
                    src="../../assets/images/bg-coworking.jpeg"
                    alt="..."
                    className="avatar shadow border-radius-lg"
                  />
                  <div className="name ps-3">
                    <span>Mathew Glock</span>
                    <div className="stats">
                      <small>Posted on 28 February</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
