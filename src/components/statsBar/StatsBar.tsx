import Palette from "../palette/Palette";
import styles from "./statsBar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Tools() {
  const colour = useSelector((state: RootState) => state.colour.currentColour);
  const shade = useSelector((state: RootState) => state.colour.currentShade);
  const shadeNumber = useSelector(
    (state: RootState) => state.colour.shadeIndex
  );

  return (
    <menu className={styles.tools}>
      <ul className={styles.group}>        
        <li className={styles.key}>
          <Palette shade={shade} shadeNumber={shadeNumber} colour={colour} />
        </li>
      </ul>
      <ul className={styles.group}>        
        <li className={styles.key}>
          <span>X</span> Save
        </li>
        <li className={styles.key}>
          <span>M</span> Show/Hide Menu
        </li>
      </ul>
    </menu>
  );
}

export default Tools;
