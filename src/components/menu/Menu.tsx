import styles from "./menu.module.css";

function Menu() {
  return (
    <header className={styles.header}>
      <ul className={styles.group}>
        <li className={styles.key}>
          <span>J</span> Left
        </li>
        <li className={styles.key}>
          <span>L</span> Right
        </li>
        <li className={styles.key}>
          <span>I</span> Up
        </li>
        <li className={styles.key}>
          <span>K</span> Down
        </li>
      </ul>
      <ul className={styles.group}>
        <li className={styles.key}>
          <span>F</span> Draw
        </li>
        <li className={styles.key}>
          <span>E</span> Erase
        </li>
        <li className={styles.key}>
          <span>A S</span> -+ Shade
        </li>
        <li className={styles.key}>
          <span>C</span> Colour
        </li>
      </ul>
    </header>
  );
}

export default Menu;
