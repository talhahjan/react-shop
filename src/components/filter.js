import Collapsable from "../components/collapsable";

const Filter = ({ props }) => {
  return (
    <>
      {/* <!-- filter options offcanvas  --> */}
      <div
        className="filter offcanvas offcanvas-start"
        tabIndex="-1"
        id="filterOptions"
        aria-labelledby="filterOptionsLabel"
      >
        <div className="offcanvas-header bg-light">
          <h5 className="offcanvas-title text-dark" id="filterOptionsLabel">
            Filter & Refine
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="d-flex justify-content-between m-2">
          <button className="btn btn-outline-primary btn-sm ">Reset All</button>
          <button className="btn btn-outline-primary btn-sm ">
            Apply Changes
          </button>
        </div>

        {/* options for sizes  */}

        <Collapsable title="Sub-Categories">
          <div className="filter-content sizes">
            <span className="size">babies</span>
            <span className="size">Infant</span>
            <span className="size">Toddler</span>
            <span className="size active">Walker</span>
            <span className="size">Kids</span>
            <span className="size">Youth</span>
            <span className="size">Men</span>
            <span className="size">Women</span>
          </div>
        </Collapsable>

        <Collapsable title="colors">
          <div className="filter-content colors">
            <div className="color-conatiner">
              <div className="colors">
                <span
                  className="color"
                  style={{ border: "blue", backgroundColor: "blue" }}
                ></span>
                <span
                  className="color"
                  style={{ border: "orange", backgroundColor: "orange" }}
                ></span>
                <span
                  className="color"
                  style={{ border: "black", backgroundColor: "black" }}
                ></span>
                <span
                  className="color selected"
                  style={{ border: "red", backgroundColor: "red" }}
                ></span>
                <span
                  className="color"
                  style={{ border: "pink", backgroundColor: "pink" }}
                ></span>
                <span
                  className="color"
                  style={{ border: "gray", backgroundColor: "gray" }}
                ></span>
              </div>
            </div>
          </div>
        </Collapsable>

        <Collapsable title="brands">
          <div className="filter-content">
            <ul className="list-group">
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                T.J
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                Style
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                aerosoft
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                DWD
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                TRJ
              </li>
            </ul>
          </div>
        </Collapsable>

        <Collapsable title="Materials">
          <div className="filter-content">
            <ul className="list-group">
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                Pu
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                Leather
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                Rexine
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                Fabrics
              </li>
              <li className="list-group-item">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />{" "}
                TPR
              </li>
            </ul>
          </div>
        </Collapsable>

        {/* options for sizes  */}
      </div>
      {/* <!-- filter options offcanvas  --> */}
    </>
  );
};

export default Filter;
