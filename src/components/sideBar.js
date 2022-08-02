import Collapsable from "../components/collapsable";

const SideBar = ({ props }) => {
  return (
    <>
      <div
        className="filter offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Categories/Departments
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Collapsable title="Mens">
            <Collapsable title="Shoes">asasas</Collapsable>
          </Collapsable>
        </div>
      </div>
    </>
  );
};

export default SideBar;
