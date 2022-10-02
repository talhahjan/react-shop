import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import useCollapse from "react-collapsed";

export default function Collapsable(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className="collapsible card card-google my-1">
      <div className="card-body">
        <div
          className="card-title d-flex justify-content-between"
          {...getToggleProps()}
        >
          <h6 className="title text-capitalize">{props.title}</h6>
          {isExpanded ? (
            <MdKeyboardArrowUp className="text-dark" />
          ) : (
            <MdKeyboardArrowDown className="text-dark" />
          )}
        </div>
        <div {...getCollapseProps()}>{props.children}</div>
      </div>
    </div>
  );
}
