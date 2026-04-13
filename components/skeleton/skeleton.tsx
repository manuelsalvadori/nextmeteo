import clsx from "clsx";
import styles from "./skeleton.module.css";

export default function Skeleton({ className }: { className?: string }) {
    return <div className={clsx(styles.skeleton, className)}></div>;
}
