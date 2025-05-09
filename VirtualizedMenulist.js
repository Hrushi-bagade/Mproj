// Custom Virtualized Menu List
import { FixedSizeList as List } from "react-window";
export const CustomMenuList = (props) => {
    const { options, children, maxHeight, getValue } = props;
    const height = 35; // Height of each option
    const [value] = getValue();
  
    const initialOffset = options.findIndex((option) => option.value === value);
  
    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset * height} // Start at selected option
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };