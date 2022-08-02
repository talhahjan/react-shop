import { Link } from "react-router-dom";

const CatsBySection = ({ section }) => {
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {section.map((curElem) => {
            return (
              <button
                key={"sec-" + curElem.id}
                className={"nav-link" + (curElem.id === 1 ? " active" : "")}
                id={"nav-" + curElem.title + "-tab"}
                data-bs-toggle="tab"
                data-bs-target={"#nav-" + curElem.title}
                type="button"
                role="tab"
                aria-controls={"nav-" + curElem.title}
                aria-selected="true"
              >
                {curElem.title}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        {section.map((curItem) => {
          return (
            <div
              key={"cat-" + curItem.id}
              className={
                "tab-pane fade show" + (curItem.id === 1 ? " active" : "")
              }
              id={"nav-" + curItem.title}
              role={"tabpan-" + curItem.id}
              aria-labelledby={"nav-" + curItem.title + "-tab"}
            >
              <div className="department-wrapper flex m-2">
                <ul>
                  {curItem.categories.map((curCat) => {
                    return (
                      <li key={curCat.id} className="bg-dark">
                        <Link
                          to={"/collection/" + curItem.slug + "/" + curCat.slug}
                        >
                          {curCat.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CatsBySection;
